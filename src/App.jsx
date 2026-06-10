import { useEffect, useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import "./App.css";

const supabase = createClient(
  "https://ntrlpqyhhlphpqmhdttl.supabase.co",
  "sb_publishable_hS2HaMMvmj__epASCoUbqg_ScNu3Im-"
);

function normalize(value) {
  return (value || "")
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[^a-z0-9/.-]/g, "");
}

function extractNumericCore(value) {
  return (value || "").toString().replace(/[^0-9]/g, "");
}

function matchesQuery(item, query) {
  if (!query) return true;

  const q = normalize(query);
  const qDigits = extractNumericCore(query);

  const fields = [
    item.id,
    item.base_code,
    item.name,
    item.category,
    item.location,
    item.status,
    item.notes,
  ].map(normalize);

  const numericFields = [item.id, item.base_code].map(extractNumericCore);
  const isPurelyNumeric = /^\d+$/.test(query.trim());

  const directMatch = fields.some((field) => field.includes(q));
  const numericMatch =
    isPurelyNumeric && qDigits && numericFields.some((field) => field.includes(qDigits));
  const baseMatch =
    isPurelyNumeric && qDigits && extractNumericCore(item.base_code) === qDigits;
  const missingPrefixMatch =
    isPurelyNumeric &&
    qDigits &&
    item.id.toLowerCase().startsWith("w") &&
    extractNumericCore(item.id) === qDigits;

  const materials = item.materials || [];
  const materialMatch = materials.some((mat) => normalize(mat).includes(q));

  return directMatch || numericMatch || baseMatch || missingPrefixMatch || materialMatch;
}

const emptyForm = {
  id: "",
  base_code: "",
  name: "",
  category: "Alat",
  location: "",
  status: "Uneto",
  notes: "",
  materialsText: "",
};

export default function App() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const [query, setQuery] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Sve");

  // poslednje pretrage (po uređaju, localStorage)
  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("alati-recent-searches") || "[]");
      return Array.isArray(stored) ? stored.slice(0, 3) : [];
    } catch {
      return [];
    }
  });
  const [searchFocused, setSearchFocused] = useState(false);

  function saveRecentSearch(value) {
    const v = value.trim();
    if (!v) return;
    setRecentSearches((prev) => {
      const vl = v.toLowerCase();
      // ako je v samo skraćeni početak već zapamćene pretrage, ne pamti ga
      if (prev.some((q) => q.toLowerCase() !== vl && q.toLowerCase().startsWith(vl))) {
        return prev;
      }
      // izbaci duplikat i starije, kraće verzije iste pretrage (npr. "166" kad stigne "16630")
      const next = [
        v,
        ...prev.filter((q) => {
          const ql = q.toLowerCase();
          return ql !== vl && !vl.startsWith(ql);
        }),
      ].slice(0, 3);
      try {
        localStorage.setItem("alati-recent-searches", JSON.stringify(next));
      } catch {
        // localStorage nedostupan — ignoriši
      }
      return next;
    });
  }

  // zapamti pretragu čim korisnik prestane da kuca (radi i kad se samo spusti tastatura)
  useEffect(() => {
    if (!query.trim()) return;
    const t = setTimeout(() => saveRecentSearch(query), 1200);
    return () => clearTimeout(t);
  }, [query]);

  // auth / admin
  const [session, setSession] = useState(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // admin form
  const [formOpen, setFormOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  async function loadItems() {
    setLoading(true);
    setErrorMsg("");
    const { data, error } = await supabase
      .from("alati")
      .select("*")
      .order("id", { ascending: true });
    if (error) {
      setErrorMsg("Greška pri učitavanju podataka: " + error.message);
    } else {
      setItems(data || []);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadItems();
  }, []);

  const categories = useMemo(() => {
    const set = new Set(items.map((i) => i.category).filter(Boolean));
    return ["Sve", ...Array.from(set).sort()];
  }, [items]);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const categoryOk = selectedCategory === "Sve" || item.category === selectedCategory;
      return categoryOk && matchesQuery(item, query);
    });
  }, [items, query, selectedCategory]);

  async function handleLogin(e) {
    if (e) e.preventDefault();
    setLoginError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setLoginError("Pogrešan email ili lozinka.");
    } else {
      setLoginOpen(false);
      setEmail("");
      setPassword("");
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setFormOpen(false);
  }

  function openAddForm() {
    setForm(emptyForm);
    setEditingId(null);
    setFormOpen(true);
  }

  function openEditForm(item) {
    setForm({
      id: item.id,
      base_code: item.base_code || "",
      name: item.name || "",
      category: item.category || "Alat",
      location: item.location || "",
      status: item.status || "Uneto",
      notes: item.notes || "",
      materialsText: (item.materials || []).join("\n"),
    });
    setEditingId(item.id);
    setFormOpen(true);
  }

  async function handleSave() {
    if (!form.id.trim() || !form.location.trim()) {
      alert("Šifra i lokacija su obavezni!");
      return;
    }
    setSaving(true);

    const baseCode =
      form.base_code.trim() || extractNumericCore(form.id.split("/")[0]);
    const name = form.name.trim() || `Alat ${baseCode}`;
    const materials = form.materialsText
      .split("\n")
      .map((m) => m.trim())
      .filter(Boolean);

    const record = {
      id: form.id.trim(),
      base_code: baseCode,
      name,
      category: form.category.trim() || "Alat",
      location: form.location.trim().toUpperCase(),
      status: form.status.trim() || "Uneto",
      notes: form.notes.trim(),
      materials,
    };

    let error;
    if (editingId) {
      const res = await supabase.from("alati").update(record).eq("id", editingId);
      error = res.error;
    } else {
      const res = await supabase.from("alati").insert(record);
      error = res.error;
    }

    setSaving(false);
    if (error) {
      alert("Greška pri čuvanju: " + error.message);
    } else {
      setFormOpen(false);
      loadItems();
    }
  }

  async function handleDelete(item) {
    if (!window.confirm(`Obrisati alat ${item.id}?`)) return;
    const { error } = await supabase.from("alati").delete().eq("id", item.id);
    if (error) {
      alert("Greška pri brisanju: " + error.message);
    } else {
      loadItems();
    }
  }

  const isAdmin = !!session;

  return (
    <div className="al-page">
      <div className="al-container">
        <header className="al-header">
          <div>
            <h1 className="al-title">
              <span className="al-title-mark">⚙</span>
              Alati i lokacije
            </h1>
            <p className="al-subtitle">
              Pretraga po šifri, osnovnoj šifri, lokaciji i materijalu
            </p>
          </div>
          <div className="al-header-actions">
            {isAdmin ? (
              <>
                <button className="al-btn al-btn--primary" onClick={openAddForm}>
                  + Dodaj alat
                </button>
                <button className="al-btn" onClick={handleLogout}>
                  Odjava
                </button>
              </>
            ) : (
              <button
                className="al-btn al-btn--ghost-accent"
                onClick={() => setLoginOpen(true)}
              >
                Admin
              </button>
            )}
          </div>
        </header>

        <section className="al-search-card">
          <div className="al-search-box">
            <span className="al-search-icon" aria-hidden="true">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.5" y2="16.5" />
              </svg>
            </span>
            <input
              className="al-input"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") e.target.blur();
              }}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => {
                setSearchFocused(false);
                saveRecentSearch(query);
              }}
              placeholder="Šifra, npr. 16630, W16630/2 ili lokacija A3"
              inputMode="search"
            />
            {searchFocused && recentSearches.length > 0 && (
              <div className="al-recent-menu">
                <div className="al-recent-title">Poslednje pretrage</div>
                {recentSearches.map((q) => (
                  <button
                    key={q}
                    className="al-recent-option"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      setQuery(q);
                    }}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                      <circle cx="12" cy="12" r="9" />
                      <polyline points="12 7 12 12 15.5 14" />
                    </svg>
                    <span>{q}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="al-search-row">
            <div className="al-filter-wrap">
              <button
                className={
                  "al-btn al-filter-btn" +
                  (selectedCategory !== "Sve" ? " al-filter-btn--active" : "")
                }
                onClick={() => setFilterOpen(!filterOpen)}
              >
                Filter{selectedCategory !== "Sve" ? `: ${selectedCategory}` : ""}
                <span
                  className={
                    "al-filter-caret" + (filterOpen ? " al-filter-caret--open" : "")
                  }
                >
                  ▼
                </span>
              </button>
              {filterOpen && (
                <div className="al-filter-menu">
                  {categories.map((category) => (
                    <button
                      key={category}
                      className={
                        "al-filter-option" +
                        (selectedCategory === category
                          ? " al-filter-option--selected"
                          : "")
                      }
                      onClick={() => {
                        setSelectedCategory(category);
                        setFilterOpen(false);
                      }}
                    >
                      {category === "Sve" ? "Sve kategorije" : category}
                    </button>
                  ))}
                </div>
              )}
            </div>
            {!loading && (
              <span className="al-count">
                {filtered.length} {filtered.length === 1 ? "rezultat" : "rezultata"}
              </span>
            )}
          </div>

          <p className="al-hint" style={{ marginTop: "12px" }}>
            Primer: unos <strong>16630</strong> prikazuje sve varijante te šifre, a{" "}
            <strong>A3</strong> alate na toj lokaciji.
          </p>
        </section>

        {errorMsg && <div className="al-notice al-notice--error">{errorMsg}</div>}

        {loading ? (
          <div className="al-notice">Učitavanje...</div>
        ) : filtered.length === 0 ? (
          <div className="al-notice">Nema rezultata za trenutnu pretragu.</div>
        ) : (
          <div className="al-grid">
            {filtered.map((item) => (
              <article key={item.id} className="al-item">
                <div className="al-item-top">
                  <div className="al-location">
                    <span className="al-location-label">Lokacija</span>
                    <span className="al-location-value">{item.location}</span>
                  </div>
                  <div className="al-item-head">
                    <h3 className="al-item-name">{item.name}</h3>
                    <span className="al-item-code">{item.id}</span>
                  </div>
                </div>

                <div className="al-item-meta">
                  <span>
                    <b>Osn. šifra:</b> {item.base_code}
                  </span>
                  <span>
                    <b>Kategorija:</b> {item.category}
                  </span>
                  <span className="al-status">{item.status}</span>
                </div>

                {item.notes && <p className="al-notes">{item.notes}</p>}

                {item.materials && item.materials.length > 0 && (
                  <div className="al-chips">
                    {item.materials.map((mat) => (
                      <span key={mat} className="al-chip">
                        {mat}
                      </span>
                    ))}
                  </div>
                )}

                {isAdmin && (
                  <div className="al-item-actions">
                    <button
                      className="al-btn al-btn--sm"
                      onClick={() => openEditForm(item)}
                    >
                      Izmeni
                    </button>
                    <button
                      className="al-btn al-btn--sm al-btn--danger"
                      onClick={() => handleDelete(item)}
                    >
                      Obriši
                    </button>
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </div>

      {loginOpen && (
        <div className="al-overlay" onClick={() => setLoginOpen(false)}>
          <div className="al-modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="al-modal-title">Admin prijava</h2>
            <label className="al-label">Email</label>
            <input
              className="al-field"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@email.com"
            />
            <label className="al-label">Lozinka</label>
            <input
              className="al-field"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleLogin();
              }}
              placeholder="••••••••"
            />
            {loginError && <div className="al-form-error">{loginError}</div>}
            <div className="al-modal-actions">
              <button className="al-btn al-btn--primary" onClick={handleLogin}>
                Prijavi se
              </button>
              <button className="al-btn" onClick={() => setLoginOpen(false)}>
                Otkaži
              </button>
            </div>
          </div>
        </div>
      )}

      {formOpen && (
        <div className="al-overlay" onClick={() => setFormOpen(false)}>
          <div className="al-modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="al-modal-title">
              {editingId ? `Izmena alata ${editingId}` : "Dodavanje novog alata"}
            </h2>

            <label className="al-label">Šifra (npr. W18935/1) *</label>
            <input
              className="al-field"
              value={form.id}
              onChange={(e) => setForm({ ...form, id: e.target.value })}
              disabled={!!editingId}
            />

            <label className="al-label">Lokacija (npr. A3) *</label>
            <input
              className="al-field"
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
            />

            <label className="al-label">Kategorija</label>
            <input
              className="al-field"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />

            <label className="al-label">Napomena</label>
            <input
              className="al-field"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />

            <label className="al-label">Materijali (jedan po redu)</label>
            <textarea
              className="al-field al-field--area"
              value={form.materialsText}
              onChange={(e) => setForm({ ...form, materialsText: e.target.value })}
              placeholder={"E 35.7-08560.27/2\nE 35.4-06768.12/3"}
            />

            <div className="al-modal-actions">
              <button
                className="al-btn al-btn--primary"
                onClick={handleSave}
                disabled={saving}
              >
                {saving ? "Čuvanje..." : "Sačuvaj"}
              </button>
              <button className="al-btn" onClick={() => setFormOpen(false)}>
                Otkaži
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
