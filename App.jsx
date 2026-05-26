import React, { useEffect, useMemo, useState } from "react";

const initialData = [
  { id: "W18935/1", baseCode: "18935", name: "Alat 18935", category: "Alat", location: "F1", status: "Uneto", notes: "" },
  { id: "W19146/1", baseCode: "19146", name: "Alat 19146", category: "Alat", location: "E1", status: "Uneto", notes: "" },
  { id: "W19180/1", baseCode: "19180", name: "Alat 19180", category: "Alat", location: "D1", status: "Uneto", notes: "" },
  { id: "W17977/6", baseCode: "17977", name: "Alat 17977", category: "Alat", location: "C1", status: "Uneto", notes: "" },
  { id: "W18743/3", baseCode: "18743", name: "Alat 18743", category: "Alat", location: "B1", status: "Uneto", notes: "" },
  { id: "W18974/1", baseCode: "18974", name: "Alat 18974", category: "Alat", location: "A1", status: "Uneto", notes: "" },

  { id: "W18873/7", baseCode: "18873", name: "Alat 18873", category: "Alat", location: "F2", status: "Uneto", notes: "" },
  { id: "W17948/2", baseCode: "17948", name: "Alat 17948", category: "Alat", location: "E2", status: "Uneto", notes: "" },
  { id: "W17077/1", baseCode: "17077", name: "Alat 17077", category: "Alat", location: "D2", status: "Uneto", notes: "" },
  { id: "W19029/1", baseCode: "19029", name: "Alat 19029", category: "Alat", location: "C2", status: "Uneto", notes: "" },
  { id: "W19164/1", baseCode: "19164", name: "Alat 19164", category: "Alat", location: "B2", status: "Uneto", notes: "" },
  { id: "W18175/2", baseCode: "18175", name: "Alat 18175", category: "Alat", location: "A2", status: "Uneto", notes: "" },

  { id: "W16616/3", baseCode: "16616", name: "Alat 16616", category: "Alat", location: "F3", status: "Uneto", notes: "" },
  { id: "W18170/1", baseCode: "18170", name: "Alat 18170", category: "Alat", location: "E3", status: "Uneto", notes: "" },
  { id: "W19009/7", baseCode: "19009", name: "Alat 19009", category: "Alat", location: "D3", status: "Uneto", notes: "" },
  { id: "W17610/7", baseCode: "17610", name: "Alat 17610", category: "Alat", location: "C3", status: "Uneto", notes: "" },
  { id: "W18293/8", baseCode: "18293", name: "Alat 18293", category: "Alat", location: "B3", status: "Uneto", notes: "" },
  { id: "W16630/6", baseCode: "16630", name: "Alat 16630", category: "Alat", location: "A3", status: "Uneto", notes: "" },

  { id: "W19159/4", baseCode: "19159", name: "Alat 19159", category: "Alat", location: "F4", status: "Uneto", notes: "" },
  { id: "W18737/3", baseCode: "18737", name: "Alat 18737", category: "Alat", location: "E4", status: "Uneto", notes: "" },
  { id: "W19158/1", baseCode: "19158", name: "Alat 19158", category: "Alat", location: "D4", status: "Uneto", notes: "" },
  { id: "W18174/2", baseCode: "18174", name: "Alat 18174", category: "Alat", location: "C4", status: "Uneto", notes: "" },
  { id: "W19072/1", baseCode: "19072", name: "Alat 19072", category: "Alat", location: "B4", status: "Uneto", notes: "" },
  { id: "W18794/14", baseCode: "18794", name: "Alat 18794", category: "Alat", location: "A4", status: "Uneto", notes: "" },

  { id: "W17971/2", baseCode: "17971", name: "Alat 17971", category: "Alat", location: "F5", status: "Uneto", notes: "" },
  { id: "W19054/1", baseCode: "19054", name: "Alat 19054", category: "Alat", location: "E5", status: "Uneto", notes: "" },
  { id: "W18970/2", baseCode: "18970", name: "Alat 18970", category: "Alat", location: "D5", status: "Uneto", notes: "" },
  { id: "W19278/6", baseCode: "19278", name: "Alat 19278", category: "Alat", location: "C5", status: "Uneto", notes: "" },
  { id: "W18151/2", baseCode: "18151", name: "Alat 18151", category: "Alat", location: "B5", status: "Uneto", notes: "" },
  { id: "W17662/3", baseCode: "17662", name: "Alat 17662", category: "Alat", location: "A5", status: "Uneto", notes: "" },

  { id: "W18521/3", baseCode: "18521", name: "Alat 18521", category: "Alat", location: "F6", status: "Uneto", notes: "" },
  { id: "W16297/1", baseCode: "16297", name: "Alat 16297", category: "Alat", location: "E6", status: "Uneto", notes: "" },
  { id: "W17727/2", baseCode: "17727", name: "Alat 17727", category: "Alat", location: "D6", status: "Uneto", notes: "" },
  { id: "W18860/3", baseCode: "18860", name: "Alat 18860", category: "Alat", location: "C6", status: "Uneto", notes: "" },
  { id: "W18315/2", baseCode: "18315", name: "Alat 18315", category: "Alat", location: "B6", status: "Uneto", notes: "" },
  { id: "W18932/1", baseCode: "18932", name: "Alat 18932", category: "Alat", location: "A6", status: "Uneto", notes: "" },

  { id: "W18792/9", baseCode: "18792", name: "Alat 18792", category: "Alat", location: "E7", status: "Uneto", notes: "" },
  { id: "W18852/3", baseCode: "18852", name: "Alat 18852", category: "Alat", location: "D7", status: "Uneto", notes: "" },
  { id: "W17047/2", baseCode: "17047", name: "Alat 17047", category: "Alat", location: "C7", status: "Uneto", notes: "" },
  { id: "W18894/7", baseCode: "18894", name: "Alat 18894", category: "Alat", location: "B7", status: "Uneto", notes: "" },
  { id: "W19027/1", baseCode: "19027", name: "Alat 19027", category: "Alat", location: "A7", status: "Uneto", notes: "" },

  { id: "W17507/2", baseCode: "17507", name: "Alat 17507", category: "Alat", location: "E8", status: "Uneto", notes: "" },
  { id: "W19069/1", baseCode: "19069", name: "Alat 19069", category: "Alat", location: "D8", status: "Uneto", notes: "" },
  { id: "W18644/3", baseCode: "18644", name: "Alat 18644", category: "Alat", location: "C8", status: "Uneto", notes: "" },
  { id: "W18643/3", baseCode: "18643", name: "Alat 18643", category: "Alat", location: "B8", status: "Uneto", notes: "" },
  { id: "W17917/1", baseCode: "17917", name: "Alat 17917", category: "Alat", location: "A8", status: "Uneto", notes: "" },

  { id: "W17835/2", baseCode: "17835", name: "Alat 17835", category: "Alat", location: "E9", status: "Uneto", notes: "" },
  { id: "W18673/4", baseCode: "18673", name: "Alat 18673", category: "Alat", location: "D9", status: "Uneto", notes: "" },
  { id: "W18795/8", baseCode: "18795", name: "Alat 18795", category: "Alat", location: "C9", status: "Uneto", notes: "" },
  { id: "W18751/3", baseCode: "18751", name: "Alat 18751", category: "Alat", location: "B9", status: "Uneto", notes: "" },
  { id: "W18561/1", baseCode: "18561", name: "Alat 18561", category: "Alat", location: "A9", status: "Uneto", notes: "" },

  { id: "W8029/3", baseCode: "8029", name: "Alat 8029", category: "Alat", location: "E10", status: "Uneto", notes: "" },
  { id: "W18794/13", baseCode: "18794", name: "Alat 18794", category: "Alat", location: "D10", status: "Uneto", notes: "" },
  { id: "W17660/3", baseCode: "17660", name: "Alat 17660", category: "Alat", location: "C10", status: "Uneto", notes: "" },
  { id: "W18814/2", baseCode: "18814", name: "Alat 18814", category: "Alat", location: "B10", status: "Uneto", notes: "" },
  { id: "W16837/1", baseCode: "16837", name: "Alat 16837", category: "Alat", location: "A10", status: "Uneto", notes: "" },

  { id: "W18362/3", baseCode: "18362", name: "Alat 18362", category: "Alat", location: "E11", status: "Uneto", notes: "" },
  { id: "W18856/8", baseCode: "18856", name: "Alat 18856", category: "Alat", location: "D11", status: "Uneto", notes: "" },
  { id: "W18966/2", baseCode: "18966", name: "Alat 18966", category: "Alat", location: "C11", status: "Uneto", notes: "" },
  { id: "W19010/8", baseCode: "19010", name: "Alat 19010", category: "Alat", location: "B11", status: "Uneto", notes: "" },
  { id: "W17872/2", baseCode: "17872", name: "Alat 17872", category: "Alat", location: "A11", status: "Uneto", notes: "" },

  { id: "W8030/1", baseCode: "8030", name: "Alat 8030", category: "Alat", location: "E12", status: "Uneto", notes: "" },
  { id: "W17909/2", baseCode: "17909", name: "Alat 17909", category: "Alat", location: "D12", status: "Uneto", notes: "" },
  { id: "W18255/4", baseCode: "18255", name: "Alat 18255", category: "Alat", location: "C12", status: "Uneto", notes: "" },
  { id: "W18738/3", baseCode: "18738", name: "Alat 18738", category: "Alat", location: "B12", status: "Uneto", notes: "" },
  { id: "W18269/7", baseCode: "18269", name: "Alat 18269", category: "Alat", location: "A12", status: "Uneto", notes: "" },

  { id: "W10089/4/6", baseCode: "10089", name: "Alat 10089", category: "Alat", location: "E13", status: "Uneto", notes: "" },
  { id: "W16783/2", baseCode: "16783", name: "Alat 16783", category: "Alat", location: "D13", status: "Uneto", notes: "" },
  { id: "W18979/6", baseCode: "18979", name: "Alat 18979", category: "Alat", location: "C13", status: "Uneto", notes: "" },
  { id: "W18792/8", baseCode: "18792", name: "Alat 18792", category: "Alat", location: "B13", status: "Uneto", notes: "" },
  { id: "W18667/8", baseCode: "18667", name: "Alat 18667", category: "Alat", location: "A13", status: "Uneto", notes: "" },

  { id: "W17970/4", baseCode: "17970", name: "Alat 17970", category: "Alat", location: "E14", status: "Uneto", notes: "" },
  { id: "W18859/3", baseCode: "18859", name: "Alat 18859", category: "Alat", location: "D14", status: "Uneto", notes: "" },
  { id: "W19276/4", baseCode: "19276", name: "Alat 19276", category: "Alat", location: "C14", status: "Uneto", notes: "" },
  { id: "W18747/4", baseCode: "18747", name: "Alat 18747", category: "Alat", location: "B14", status: "Uneto", notes: "" },
  { id: "W17441/2", baseCode: "17441", name: "Alat 17441", category: "Alat", location: "A14", status: "Uneto", notes: "" },

  { id: "W17730/3", baseCode: "17730", name: "Alat 17730", category: "Alat", location: "E15", status: "Uneto", notes: "" },
  { id: "W10591/4", baseCode: "10591", name: "Alat 10591", category: "Alat", location: "D15", status: "Uneto", notes: "" },
  { id: "W17075/1", baseCode: "17075", name: "Alat 17075", category: "Alat", location: "C15", status: "Uneto", notes: "" },
  { id: "W18871/3", baseCode: "18871", name: "Alat 18871", category: "Alat", location: "B15", status: "Uneto", notes: "" },
  { id: "W19277/13", baseCode: "19277", name: "Alat 19277", category: "Alat", location: "A15", status: "Uneto", notes: "" },

  { id: "W10089/3", baseCode: "10089", name: "Alat 10089", category: "Alat", location: "E16", status: "Uneto", notes: "" },
  { id: "W18324/1", baseCode: "18324", name: "Alat 18324", category: "Alat", location: "D16", status: "Uneto", notes: "" },
  { id: "W18866/3", baseCode: "18866", name: "Alat 18866", category: "Alat", location: "C16", status: "Uneto", notes: "" },
  { id: "W18672/7", baseCode: "18672", name: "Alat 18672", category: "Alat", location: "B16", status: "Uneto", notes: "" },
  { id: "W18528/4", baseCode: "18528", name: "Alat 18528", category: "Alat", location: "A16", status: "Uneto", notes: "" },

  { id: "W18035/4", baseCode: "18035", name: "Alat 18035", category: "Alat", location: "E17", status: "Uneto", notes: "" },
  { id: "W18252/4", baseCode: "18252", name: "Alat 18252", category: "Alat", location: "D17", status: "Uneto", notes: "" },
  { id: "W19278/3", baseCode: "19278", name: "Alat 19278", category: "Alat", location: "C17", status: "Uneto", notes: "" },
  { id: "W18530/10", baseCode: "18530", name: "Alat 18530", category: "Alat", location: "B17", status: "Uneto", notes: "" },
  { id: "W17051/2", baseCode: "17051", name: "Alat 17051", category: "Alat", location: "A17", status: "Uneto", notes: "" },

  { id: "W16801/2", baseCode: "16801", name: "Alat 16801", category: "Alat", location: "E18", status: "Uneto", notes: "" },
  { id: "W18524/3", baseCode: "18524", name: "Alat 18524", category: "Alat", location: "D18", status: "Uneto", notes: "" },
  { id: "W18984/4", baseCode: "18984", name: "Alat 18984", category: "Alat", location: "C18", status: "Uneto", notes: "" },
  { id: "W19042/3", baseCode: "19042", name: "Alat 19042", category: "Alat", location: "B18", status: "Uneto", notes: "" },
  { id: "W17562/2", baseCode: "17562", name: "Alat 17562", category: "Alat", location: "A18", status: "Uneto", notes: "" },

  { id: "W16630/2", baseCode: "16630", name: "Alat 16630", category: "Alat", location: "E19", status: "Uneto", notes: "" },
  { id: "W18036/3", baseCode: "18036", name: "Alat 18036", category: "Alat", location: "D19", status: "Uneto", notes: "" },
  { id: "W18530/5", baseCode: "18530", name: "Alat 18530", category: "Alat", location: "C19", status: "Uneto", notes: "" },
  { id: "W17885/2", baseCode: "17885", name: "Alat 17885", category: "Alat", location: "B19", status: "Uneto", notes: "" },
  { id: "W18666/6", baseCode: "18666", name: "Alat 18666", category: "Alat", location: "A19", status: "Uneto", notes: "" },

  { id: "W10406/1", baseCode: "10406", name: "Alat 10406", category: "Alat", location: "E20", status: "Uneto", notes: "" },
  { id: "W17509/2", baseCode: "17509", name: "Alat 17509", category: "Alat", location: "D20", status: "Uneto", notes: "" },
  { id: "W18312/7", baseCode: "18312", name: "Alat 18312", category: "Alat", location: "C20", status: "Uneto", notes: "" },
  { id: "W17728/3", baseCode: "17728", name: "Alat 17728", category: "Alat", location: "B20", status: "Uneto", notes: "" },
  { id: "W18248/6", baseCode: "18248", name: "Alat 18248", category: "Alat", location: "A20", status: "Uneto", notes: "" },

  { id: "W17102/1", baseCode: "17102", name: "Alat 17102", category: "Alat", location: "E21", status: "Uneto", notes: "" },
  { id: "W16629/3", baseCode: "16629", name: "Alat 16629", category: "Alat", location: "D21", status: "Uneto", notes: "" },
  { id: "W18520/4", baseCode: "18520", name: "Alat 18520", category: "Alat", location: "C21", status: "Uneto", notes: "" },
  { id: "W17076/1", baseCode: "17076", name: "Alat 17076", category: "Alat", location: "B21", status: "Uneto", notes: "" },
  { id: "W19359/1", baseCode: "19359", name: "Alat 19359", category: "Alat", location: "A21", status: "Uneto", notes: "" },

  { id: "W17398/1", baseCode: "17398", name: "Alat 17398", category: "Alat", location: "E22", status: "Uneto", notes: "" },
  { id: "W10556/2", baseCode: "10556", name: "Alat 10556", category: "Alat", location: "D22", status: "Uneto", notes: "" },
  { id: "W18563/1", baseCode: "18563", name: "Alat 18563", category: "Alat", location: "C22", status: "Uneto", notes: "" },
  { id: "W17437/2", baseCode: "17437", name: "Alat 17437", category: "Alat", location: "B22", status: "Uneto", notes: "" },
  { id: "W17671/2", baseCode: "17671", name: "Alat 17671", category: "Alat", location: "A22", status: "Uneto", notes: "" },

  { id: "W17339/8", baseCode: "17339", name: "Alat 17339", category: "Alat", location: "E23", status: "Uneto", notes: "" },
  { id: "W16838/1", baseCode: "16838", name: "Alat 16838", category: "Alat", location: "D23", status: "Uneto", notes: "" },
  { id: "W17671/6", baseCode: "17671", name: "Alat 17671", category: "Alat", location: "C23", status: "Uneto", notes: "" },
  { id: "W18739/3", baseCode: "18739", name: "Alat 18739", category: "Alat", location: "B23", status: "Uneto", notes: "" },
  { id: "W17220/1", baseCode: "17220", name: "Alat 17220", category: "Alat", location: "A23", status: "Uneto", notes: "" },

  { id: "W18849/1", baseCode: "18849", name: "Alat 18849", category: "Alat", location: "E24", status: "Uneto", notes: "" },
  { id: "W17972/5", baseCode: "17972", name: "Alat 17972", category: "Alat", location: "D24", status: "Uneto", notes: "" },
  { id: "W17857/7", baseCode: "17857", name: "Alat 17857", category: "Alat", location: "C24", status: "Uneto", notes: "" },
  { id: "W18746/3", baseCode: "18746", name: "Alat 18746", category: "Alat", location: "B24", status: "Uneto", notes: "" },
  { id: "W17610/2", baseCode: "17610", name: "Alat 17610", category: "Alat", location: "A24", status: "Uneto", notes: "" },

  { id: "W10692/2", baseCode: "10692", name: "Alat 10692", category: "Alat", location: "E25", status: "Uneto", notes: "" },
  { id: "W18717/5", baseCode: "18717", name: "Alat 18717", category: "Alat", location: "D25", status: "Uneto", notes: "" },
  { id: "W18936/2", baseCode: "18936", name: "Alat 18936", category: "Alat", location: "C25", status: "Uneto", notes: "" },
  { id: "W10131/9", baseCode: "10131", name: "Alat 10131", category: "Alat", location: "B25", status: "Uneto", notes: "" },
  { id: "W16996/8", baseCode: "16996", name: "Alat 16996", category: "Alat", location: "A25", status: "Uneto", notes: "" },

  { id: "W17019/1", baseCode: "17019", name: "Alat 17019", category: "Alat", location: "E26", status: "Uneto", notes: "" },
  { id: "W16803/3", baseCode: "16803", name: "Alat 16803", category: "Alat", location: "D26", status: "Uneto", notes: "" },
  { id: "W10218/1", baseCode: "10218", name: "Alat 10218", category: "Alat", location: "C26", status: "Uneto", notes: "" },
  { id: "W18526/6", baseCode: "18526", name: "Alat 18526", category: "Alat", location: "B26", status: "Uneto", notes: "" },
  { id: "W18397/3", baseCode: "18397", name: "Alat 18397", category: "Alat", location: "A26", status: "Uneto", notes: "" },

  { id: "W17370/4", baseCode: "17370", name: "Alat 17370", category: "Alat", location: "E27", status: "Uneto", notes: "" },
  { id: "W18793/8", baseCode: "18793", name: "Alat 18793", category: "Alat", location: "D27", status: "Uneto", notes: "" },
  { id: "W17060/1", baseCode: "17060", name: "Alat 17060", category: "Alat", location: "C27", status: "Uneto", notes: "" },
  { id: "W18327/2", baseCode: "18327", name: "Alat 18327", category: "Alat", location: "B27", status: "Uneto", notes: "" },
  { id: "W17698/2", baseCode: "17698", name: "Alat 17698", category: "Alat", location: "A27", status: "Uneto", notes: "" },

  { id: "W10529/2", baseCode: "10529", name: "Alat 10529", category: "Alat", location: "E28", status: "Uneto", notes: "" },
  { id: "W17338/8", baseCode: "17338", name: "Alat 17338", category: "Alat", location: "D28", status: "Uneto", notes: "" },
  { id: "W17436/1", baseCode: "17436", name: "Alat 17436", category: "Alat", location: "C28", status: "Uneto", notes: "" },
  { id: "W10230/1", baseCode: "10230", name: "Alat 10230", category: "Alat", location: "B28", status: "Uneto", notes: "" },
  { id: "W18020/1", baseCode: "18020", name: "Alat 18020", category: "Alat", location: "A28", status: "Uneto", notes: "" },

  { id: "W17508/2", baseCode: "17508", name: "Alat 17508", category: "Alat", location: "E29", status: "Uneto", notes: "" },
  { id: "W18784/6", baseCode: "18784", name: "Alat 18784", category: "Alat", location: "D29", status: "Uneto", notes: "" },
  { id: "W17201/2", baseCode: "17201", name: "Alat 17201", category: "Alat", location: "C29", status: "Uneto", notes: "" },
  { id: "W18670/6", baseCode: "18670", name: "Alat 18670", category: "Alat", location: "B29", status: "Uneto", notes: "" },
  { id: "W17476/2", baseCode: "17476", name: "Alat 17476", category: "Alat", location: "A29", status: "Uneto", notes: "" },

  { id: "W17995/5", baseCode: "17995", name: "Alat 17995", category: "Alat", location: "E30", status: "Uneto", notes: "" },
  { id: "W18779/2", baseCode: "18779", name: "Alat 18779", category: "Alat", location: "D30", status: "Uneto", notes: "" },
  { id: "W17479/2", baseCode: "17479", name: "Alat 17479", category: "Alat", location: "C30", status: "Uneto", notes: "" },
  { id: "W18928/9", baseCode: "18928", name: "Alat 18928", category: "Alat", location: "B30", status: "Uneto", notes: "" },
  { id: "W17995/6", baseCode: "17995", name: "Alat 17995", category: "Alat", location: "A30", status: "Uneto", notes: "" },

  { id: "W10454/2", baseCode: "10454", name: "Alat 10454", category: "Alat", location: "E31", status: "Uneto", notes: "" },
  { id: "W18595/5", baseCode: "18595", name: "Alat 18595", category: "Alat", location: "D31", status: "Uneto", notes: "" },
  { id: "W18861/3", baseCode: "18861", name: "Alat 18861", category: "Alat", location: "C31", status: "Uneto", notes: "" },
  { id: "W17003/6", baseCode: "17003", name: "Alat 17003", category: "Alat", location: "B31", status: "Uneto", notes: "" },
  { id: "W17974/4", baseCode: "17974", name: "Alat 17974", category: "Alat", location: "A31", status: "Uneto", notes: "" },

  { id: "W17973/4", baseCode: "17973", name: "Alat 17973", category: "Alat", location: "E32", status: "Uneto", notes: "" },
  { id: "W18068/9", baseCode: "18068", name: "Alat 18068", category: "Alat", location: "D32", status: "Uneto", notes: "" },
  { id: "W35734", baseCode: "35734", name: "Alat 35734", category: "Alat", location: "C32", status: "Uneto", notes: "" },
  { id: "W18067/11", baseCode: "18067", name: "Alat 18067", category: "Alat", location: "B32", status: "Uneto", notes: "" },
  { id: "W18111/7", baseCode: "18111", name: "Alat 18111", category: "Alat", location: "A32", status: "Uneto", notes: "" },

  { id: "W10454/1", baseCode: "10454", name: "Alat 10454", category: "Alat", location: "E33", status: "Uneto", notes: "" },
  { id: "W16271/1", baseCode: "16271", name: "Alat 16271", category: "Alat", location: "D33", status: "Uneto", notes: "" },
  { id: "W17100/2", baseCode: "17100", name: "Alat 17100", category: "Alat", location: "C33", status: "Uneto", notes: "" },
  { id: "W18736/3", baseCode: "18736", name: "Alat 18736", category: "Alat", location: "B33", status: "Uneto", notes: "" },
  { id: "W17233/2", baseCode: "17233", name: "Alat 17233", category: "Alat", location: "A33", status: "Uneto", notes: "" },

  { id: "W17101/2", baseCode: "17101", name: "Alat 17101", category: "Alat", location: "E34", status: "Uneto", notes: "" },
  { id: "W17388/1", baseCode: "17388", name: "Alat 17388", category: "Alat", location: "D34", status: "Uneto", notes: "" },
  { id: "W18893/6", baseCode: "18893", name: "Alat 18893", category: "Alat", location: "C34", status: "Uneto", notes: "" },
  { id: "W17381/5", baseCode: "17381", name: "Alat 17381", category: "Alat", location: "B34", status: "Uneto", notes: "" },
  { id: "W18312/8", baseCode: "18312", name: "Alat 18312", category: "Alat", location: "A34", status: "Uneto", notes: "" },

  { id: "W17978/3", baseCode: "17978", name: "Alat 17978", category: "Alat", location: "D35", status: "Uneto", notes: "" },
  { id: "W16769/2", baseCode: "16769", name: "Alat 16769", category: "Alat", location: "C35", status: "Uneto", notes: "" },
  { id: "W18851/3", baseCode: "18851", name: "Alat 18851", category: "Alat", location: "B35", status: "Uneto", notes: "" },
  { id: "W16441/3", baseCode: "16441", name: "Alat 16441", category: "Alat", location: "A35", status: "Uneto", notes: "" },

  { id: "W10092/1", baseCode: "10092", name: "Alat 10092", category: "Alat", location: "E36", status: "Uneto", notes: "" },
  { id: "W17879/2", baseCode: "17879", name: "Alat 17879", category: "Alat", location: "D36", status: "Uneto", notes: "" },
  { id: "W16780/1", baseCode: "16780", name: "Alat 16780", category: "Alat", location: "C36", status: "Uneto", notes: "" },
  { id: "W17701/2", baseCode: "17701", name: "Alat 17701", category: "Alat", location: "B36", status: "Uneto", notes: "" },
  { id: "W17665/3", baseCode: "17665", name: "Alat 17665", category: "Alat", location: "A36", status: "Uneto", notes: "" },

  { id: "W18748/3", baseCode: "18748", name: "Alat 18748", category: "Alat", location: "E37", status: "Uneto", notes: "" },
  { id: "W17006/1", baseCode: "17006", name: "Alat 17006", category: "Alat", location: "D37", status: "Uneto", notes: "" },
  { id: "W18741/3", baseCode: "18741", name: "Alat 18741", category: "Alat", location: "C37", status: "Uneto", notes: "" },
  { id: "W18669/4", baseCode: "18669", name: "Alat 18669", category: "Alat", location: "B37", status: "Uneto", notes: "" },
  { id: "W17431/1", baseCode: "17431", name: "Alat 17431", category: "Alat", location: "A37", status: "Uneto", notes: "" },

  { id: "W46145", baseCode: "46145", name: "Alat 46145", category: "Alat", location: "E38", status: "Uneto", notes: "" },
  { id: "W18559/1", baseCode: "18559", name: "Alat 18559", category: "Alat", location: "D38", status: "Uneto", notes: "" },
  { id: "W15591/11", baseCode: "15591", name: "Alat 15591", category: "Alat", location: "C38", status: "Uneto", notes: "" },
  { id: "W18177/1", baseCode: "18177", name: "Alat 18177", category: "Alat", location: "B38", status: "Uneto", notes: "" },
  { id: "W18050/5", baseCode: "18050", name: "Alat 18050", category: "Alat", location: "A38", status: "Uneto", notes: "" },

  { id: "W17085/1", baseCode: "17085", name: "Alat 17085", category: "Alat", location: "E39", status: "Uneto", notes: "" },
  { id: "W18785/4", baseCode: "18785", name: "Alat 18785", category: "Alat", location: "D39", status: "Uneto", notes: "" },
  { id: "W10681/7", baseCode: "10681", name: "Alat 10681", category: "Alat", location: "C39", status: "Uneto", notes: "" },
  { id: "W18398/5", baseCode: "18398", name: "Alat 18398", category: "Alat", location: "B39", status: "Uneto", notes: "" },
  { id: "W18398/2", baseCode: "18398", name: "Alat 18398", category: "Alat", location: "A39", status: "Uneto", notes: "" },

  { id: "W16769/8", baseCode: "16769", name: "Alat 16769", category: "Alat", location: "E40", status: "Uneto", notes: "" },
  { id: "W18171/1", baseCode: "18171", name: "Alat 18171", category: "Alat", location: "D40", status: "Uneto", notes: "" },
  { id: "W18867/3", baseCode: "18867", name: "Alat 18867", category: "Alat", location: "C40", status: "Uneto", notes: "" },
  { id: "W17046/2", baseCode: "17046", name: "Alat 17046", category: "Alat", location: "B40", status: "Uneto", notes: "" },
  { id: "W18981/1", baseCode: "18981", name: "Alat 18981", category: "Alat", location: "A40", status: "Uneto", notes: "" },

  { id: "W16935/1", baseCode: "16935", name: "Alat 16935", category: "Alat", location: "E41", status: "Uneto", notes: "" },
  { id: "W18332/2", baseCode: "18332", name: "Alat 18332", category: "Alat", location: "D41", status: "Uneto", notes: "" },
  { id: "W18766/7", baseCode: "18766", name: "Alat 18766", category: "Alat", location: "C41", status: "Uneto", notes: "" },
  { id: "W17858/1", baseCode: "17858", name: "Alat 17858", category: "Alat", location: "B41", status: "Uneto", notes: "" },
  { id: "W18923/7", baseCode: "18923", name: "Alat 18923", category: "Alat", location: "A41", status: "Uneto", notes: "" },

  { id: "W10661/1", baseCode: "10661", name: "Alat 10661", category: "Alat", location: "A42", status: "Uneto", notes: "" },
  { id: "W17389/1", baseCode: "17389", name: "Alat 17389", category: "Alat", location: "B42", status: "Uneto", notes: "" },
  { id: "W18744/3", baseCode: "18744", name: "Alat 18744", category: "Alat", location: "C42", status: "Uneto", notes: "" },

  { id: "W19067/1", baseCode: "19067", name: "Alat 19067", category: "Alat", location: "A45", status: "Uneto", notes: "" },
];

const materialsData = {
  "W18935/1": ["E 35.7-08560.27/2"],
  "W19146/1": ["E 1121063707018A/5"],
  "W19180/1": ["E 1123049700000/4/3/2"],
  "W17977/6": ["E 35.7-07523.45/2"],
  "W18743/3": ["E 35.7-08556.46/3/2/1"],
  "W18974/1": ["E 35.7-08578.39/2"],
  "W18873/7": ["E 35.5-08493.09/2"],
  "W17948/2": ["E 35.6-07759.53/6"],
  "W17077/1": ["E 35.4-07498.10/3", "E 35.4-06768.12/3"],
  "W19029/1": ["E 35.7-08169.15/3/2"],
  "W19164/1": ["E 1120025706000A/4", "E 1120025706001A/4"],
  "W18175/2": ["E 35.4-08258.09/3"],
  "W16616/3": ["E 35.5-06725.13/5"],
  "W18170/1": ["E 35.4-08258.06/3/2"],
  "W19009/7": ["E 35.7-08555.06/4/3/2/1"],
  "W17610/7": ["E 35.7-07100.40/A/4"],
  "W18293/8": ["35.6-07408.52/2"],
  "W16630/6": ["E 35.7-07099.18/G/3"],
  "W19159/4": ["E 1130003707013B/4"],
  "W18737/3": ["E 35.7-08555.30/BN5"],
  "W19158/2": ["E 1130003707012C/3"],
  "W18174/2": ["E 35.4-08258.08/3/2"],
  "W19072/1": ["E 35.7-08797.20/2"],
  "W18794/14": ["E 1135013793004/5"],
  "W17971/2": ["E 35.7-07523.58/4/3/2"],
  "W19054/1": ["E 35.7-08169.25/1", "E 35.7-08169.23/1"],
  "W18970/2": ["E 35.7-08578.04/4"],
  "W19278/6": ["E 1121975705003F/1/2"],
  "W18151/2": ["E 35.6-07934.11/4"],
  "W17662/3": ["E 35.6-07607.32/2"],
  "W18521/3": ["E 35.6-08347.09/2"],
  "W16297/1": ["E 35.7-06492.18/1"],
  "W17727/2": ["E 35.7-07716.48/1"],
  "W18860/3": ["E 35.7-08599.14/4/3/2/1"],
  "W18315/2": ["E 35.7-07023.47/2"],
  "W18932/1": ["35.7-08562.04/3"],
  "W18792/9": ["E 1135013708026/3/2", "E 1135013708024/3/2"],
  "W18852/3": ["E 35.7-08488.03/4"],
  "W17047/2": ["E 35.7-07197.39/E/1"],
  "W18894/7": ["E 35.6-08663.02/BNOS"],
  "W19027/1": ["E 35.6-08169.05/2", "E 35.6-08169.04/2"],
  "W17507/2": ["E 35.4-07498.09/2"],
  "W19069/1": ["E 35.7-08797.40/3/2/1", "E 35.7-08797.12/4/3/2"],
  "W18644/3": ["E 1121975707158C/3/2"],
  "W18643/3": ["E 1121975707150C/2"],
  "W17917/1": ["E 35.6-07376.07/4"],
  "W17835/2": ["E 35.6-07755.40/1"],
  "W18673/4": ["E 35.7-08559.30/4/3/2/1"],
  "W18795/8": ["E 1135013708028/7/6/5"],
  "W18751/3": ["E 35.7-08558.03/3"],
  "W18561/1": ["E 1121975707118F/4/3"],
  "W8029/3": ["E 82115043/5", "E 82115049/5"],
  "W18794/13": ["E 1135013708027/7/6/5"],
  "W17660/3": ["E 35.6-07929.32/2"],
  "W18814/2": ["E 35.7-08671.35/1"],
  "W16837/1": ["E 35.5-07214.10/2"],
  "W18362/3": ["E 35.7-08277.29/1"],
  "W18856/8": ["E 35.7-08667.03/4/3/2/1"],
  "W18966/2": ["E 35.7-08578.02/3"],
  "W19010/8": ["E 35.7-08555.07/8/7/6"],
  "W17872/2": ["35.6-07023.51/2"],
  "W8030/1": ["E 255675/5"],
  "W17909/2": ["E 35.7-07606.50/D/1"],
  "W18255/4": ["E 35.7-08037.33/3"],
  "W18738/3": ["E 35.7-08555.27/BN5"],
  "W18269/7": ["E 35.7-06749.09/6"],
  "W10089/4/6": ["E 298689/21/3"],
  "W10089/4": ["E 298689/21/3"],
  "W16783/2": ["E 82328347/1", "E 82257793/1"],
  "W18979/6": ["E 35.7-08408.32/1"],
  "W18792/8": ["E 1135013708024/7/6/5"],
  "W18667/8": ["E 35.5-08593.23/4/3/2/1"],
  "W17970/4": ["E 35.7-07523.57/3"],
  "W18859/3": ["E 35.7-08599.06/OST"],
  "W19276/4": ["E 1121975707157A/1"],
  "W18747/4": ["E 35.7-08556.27/4/3/2/1"],
  "W17441/2": ["E 35.7-07747.18/2"],
  "W17730/3": ["E 35.7-07716.56/B/3/2/1", "E 35.7-07716.38/D/54/3/2"],
  "W10591/4": ["E 1121910023060A/2"],
  "W17075/1": ["E 35.4-06768.08/3"],
  "W18871/3": ["E 35.6-08578.02/3"],
  "W19277/13": ["E 1121976700019C/5/4/3/2"],
  "W10089/3": ["E 298689/11/1"],
  "W18324/1": ["E 5E3 253 683 AA/3"],
  "W18866/3": ["E 35.6-08601.01/3"],
  "W18672/7": ["E 35.7-08559.29/3/2/1"],
  "W18528/4": ["E 35.6-08345.05/3"],
  "W18035/4": ["E 82631921/2"],
  "W18252/4": ["E 35.7-08037.30/4"],
  "W19278/3": ["E 1121975705003F/4"],
  "W18530/10": ["E 35.5-08345.23/3"],
  "W17051/2": ["F 35.7-07197.36/3"],
  "W16801/2": ["E 50092403/3"],
  "W18524/3": ["E 35.5-08347.01/1"],
  "W18984/4": ["E 1189019707000/4/3"],
  "W19042/3": ["E 1121975707205/3/2/1"],
  "W17562/2": ["E 35.5-08341.37/2", "E 35.5-07519.40/1"],
  "W16630/2": ["E 35.7-07951.06/EM2OS", "E 35.7-07099.17/F/3"],
  "W18036/3": ["E 82631746/2"],
  "W18530/5": ["E 35.5-08345.23/3"],
  "W17885/2": ["E 35.5-07875.22/2"],
  "W18666/6": ["E 35.6-08243.01/2"],
  "W10406/1": ["E 300679/1"],
  "W17509/2": ["E 35.4-07498.17/3"],
  "W18312/7": ["E 35.6-08277.08/5/4"],
  "W17728/3": ["E 35.6-07716.12/2"],
  "W18248/6": ["E 35.5-08185.23/3", "E 35.5-08185.05/3"],
  "W17102/1": ["1121716601700I 7°/4"],
  "W16629/3": ["E 35.7-07951.07/3", "E 35.7-07951.05/3", "E 35.7-07099.19/2", "E 35.7-07099.16/2"],
  "W18520/4": ["E 35.6-08347.08/3", "E 35.6-08347.27/3"],
  "W17076/1": ["E 35.4-06768.11/4/3"],
  "W19359/1": ["E 35.5-08743.04/2"],
  "W10556/2": ["E 657680/2"],
  "W18563/1": ["E 1121975707092F/4/3"],
  "W17437/2": ["E 35.6-07747.53/3", "E 35.6-07747.54/3"],
  "W17671/2": ["E 35.5-07214.17/4"],
  "W17339/8": ["F 35.7-07206.43 KMS", "35.7-07206.42"],
  "W16838/1": ["E 35.7-06750.07/3"],
  "W17671/6": ["E 35.5-07214.17/5"],
  "W18739/3": ["E 35.7-08555.28/BN5"],
  "W17220/1": ["E 82547499/4", "E 82308225/5", "E 82648184/3"],
  "W18849/1": ["E 35.7-08487.41/2"],
  "W17972/5": ["E 35.7-07523.59/3"],
  "W17857/7": ["E 35.7-08717.05/3/2/1"],
  "W18746/3": ["E 35.7-08556.26/3/2/1"],
  "W17610/2": ["E 35.7-07100.40/A/3"],
  "W10692/2": ["E 35.7-06009.10/1"],
  "W18717/5": ["E 1121975718030D/3-2"],
  "W18936/2": ["E 35.7-08562.35/BN5", "E 35.7-08562.34/BN5"],
  "W10131/9": ["E 289008/3"],
  "W16996/8": ["35.6-07349.53/2", "35.6-07199.53/E/2", "F 35.6-08223.72/4"],
  "W17019/1": ["E 35.7-06878.20/1"],
  "W16803/3": ["E 50092602/A"],
  "W10218/1": ["E 304770/2"],
  "W18526/6": ["E 35.6-08347.16/3/2/1/0"],
  "W18397/3": ["M- 35.5-08346.01/2"],
  "W17370/4": ["35.7-07901.19/1", "82316810/1"],
  "W18793/8": ["E 1135013708026/7/6/5"],
  "W17060/1": ["E 35.7-07270.37/1"],
  "W18327/2": ["E 35.7-07914.15/1"],
  "W17698/2": ["E 35.7-07907.34/4/3/2/1"],
  "W10529/2": ["35.7-05969.32/3"],
  "W17436/1": ["E 35.6-07747.05/1"],
  "W10230/1": ["1127506040710A"],
  "W18020/1": ["E 82463700/2"],
  "W17508/2": ["E 35.4-07498.16/2"],
  "W18784/6": ["E 35.7-07950.33/2"],
  "W17201/2": ["E 35.7-07200.05/1"],
  "W18670/6": ["E 35.7-08559.27/3"],
  "W17476/2": ["35.7-07744.04/2"],
  "W17995/5": ["E 35.4-08173.11/4"],
  "W18779/2": ["E 35.7-08076.22"],
  "W17479/2": ["35.7-07744.32/2"],
  "W18928/9": ["E 35.7-07948.51/3"],
  "W17995/6": ["E 35.4-08173.13/3", "E 35.4-08173.11/3"],
  "W10454/2": ["E 7P6253681R/1.2/01"],
  "W18595/5": ["E 35.7-07948.03/3"],
  "W18861/3": ["E 35.7-08599.20/4/3/2/1"],
  "W17003/6": ["35.6-07747.73/2", "35.6-07199.54/C/2", "F 35.6-08223.73/3"],
  "W17974/4": ["E 35.7-07523.56/3", "E 35.7-07523.42/2"],
  "W17973/4": ["E 35.7-07523.60/4"],
  "W18068/9": ["35.7-07099.03/F/4/3/2"],
  "W35734": ["E 314330/2"],
  "W18067/11": ["35.7-06899.01/E/2"],
  "W18111/7": ["E 35.4-08266.01/3", "E 35.4-08266.06/2"],
  "W10454/1": ["E 7P6253681R/1.2"],
  "W16271/1": ["E 35.6-06504.03/1"],
  "W17100/2": ["1121815681700I 19°L/2"],
  "W18736/3": ["E 35.7-08555.24/4"],
  "W17233/2": ["35.4-06768.13/1"],
  "W17101/2": ["1121713601700G 15°/2"],
  "W17388/1": ["E 35.7-06748.22/1", "E 35.7-06748.04"],
  "W18893/6": ["E 35.6-08662.01/BNOS"],
  "W17381/5": ["E 35.4-07592.01/2"],
  "W18312/8": ["E 35.6-08277.08/3"],
  "W17978/3": ["E 35.7-07523.46/2"],
  "W16769/2": ["E 82214827/B"],
  "W18851/3": ["E 35.7-08488.02/4"],
  "W16441/3": ["E 1126310500700A/3"],
  "W10092/1": ["E 191830/4"],
  "W17879/2": ["35.7-07901.19/2"],
  "W16780/1": ["E 82157880/2"],
  "W17701/2": ["E 35.7-07207.12/6", "E 35.7-07207.35/5"],
  "W17665/3": ["E 35.6-07203.38/4", "E 35.6-07203.32/2"],
  "W18748/3": ["E 35.7-08558.01/3"],
  "W17006/1": ["E 35.7-07198.36/D/1"],
  "W18741/3": ["E 35.7-08556.45/3/2/1"],
  "W18669/4": ["E 35.7-08559.10/2"],
  "W17431/1": ["E 35.6-07558.05/BN6"],
  "W18559/1": ["E 1121976707003G/2"],
  "W15591/11": ["E 1123410040700A/1"],
  "W18177/1": ["E 35.4-08258.12"],
  "W18050/5": ["E 35.6-08248.02/3", "35.6-08157.04"],
  "W17085/1": ["F 35.7-06421.70"],
  "W18785/4": ["E 35.7-07950.34/2"],
  "W10681/7": ["E 306536/2", "E 306491/2"],
  "W18398/5": ["E 35.5-08345.21/2"],
  "W18398/2": ["E 35.5-08345.21/1"],
  "W16769/8": ["E 82214827/A"],
  "W18171/1": ["E 35.4-08258.07/3"],
  "W18867/3": ["E 35.6-08601.02/3"],
  "W17046/2": ["E 35.7-07197.35/1"],
  "W18981/1": ["E 35.7-08408.34/3"],
  "W16935/1": ["F 35.7-06878.15/2"],
  "W18332/2": ["E 35.7-07915.16/1"],
  "W18766/7": ["E 35.7-07914.16/3"],
  "W17858/1": ["E 960 490 48 59/2D"],
  "W18923/7": ["E 35.6-08580.02/3"],
  "W18744/3": ["E 35.7-08556.04/3"],
  "W17389/1": ["E 35.7-06748.05/1"],
  "W10661/1": ["E 260642/1", "E 662066/D/1"],
  "W19067/1": ["E 35.7-08797.13/4/3/2", "E 35.7-08797.41/3/2/1"],
  "W17074/1": ["E 35.4-06768.07/4/3"],
  "W17098/1": ["1121716601700I 7°/2"],
  "W18793/9": ["E 1135013708026/3/2"],
};

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
    item.baseCode,
    item.name,
    item.category,
    item.location,
    item.status,
    item.notes,
  ].map(normalize);

  const numericFields = [item.id, item.baseCode].map(extractNumericCore);
  const isPurelyNumeric = /^\d+$/.test(query.trim());

  const directMatch = fields.some((field) => field.includes(q));
  const numericMatch = isPurelyNumeric && qDigits && numericFields.some((field) => field.includes(qDigits));
  const baseMatch = isPurelyNumeric && qDigits && extractNumericCore(item.baseCode) === qDigits;
  const missingPrefixMatch =
    isPurelyNumeric &&
    qDigits &&
    item.id.toLowerCase().startsWith("w") &&
    extractNumericCore(item.id) === qDigits;

  const materials = materialsData[item.id] || [];
  const materialMatch = materials.some((mat) => normalize(mat).includes(q));

  return directMatch || numericMatch || baseMatch || missingPrefixMatch || materialMatch;
}

  export default function App() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Sve");
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("alati-lokacije-data");
    return saved ? JSON.parse(saved) : initialData;
  });

  useEffect(() => {
    localStorage.setItem("alati-lokacije-data", JSON.stringify(items));
  }, [items]);

  const categories = useMemo(() => {
    return ["Sve", ...Array.from(new Set(items.map((item) => item.category)))];
  }, [items]);

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const categoryOk = selectedCategory === "Sve" || item.category === selectedCategory;
      const queryOk = matchesQuery(item, query);
      return categoryOk && queryOk;
    });
  }, [items, query, selectedCategory]);

  const styles = {
    page: {
      minHeight: "100vh",
      background: "#f8fafc",
      padding: "24px",
      fontFamily: "Arial, sans-serif",
      color: "#0f172a",
    },
    container: {
      maxWidth: "1200px",
      margin: "0 auto",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "16px",
      flexWrap: "wrap",
      marginBottom: "24px",
    },
    title: {
      fontSize: "32px",
      fontWeight: 700,
      margin: 0,
    },
    subtitle: {
      margin: "8px 0 0 0",
      color: "#475569",
      fontSize: "14px",
    },
    badge: {
      border: "1px solid #cbd5e1",
      borderRadius: "999px",
      padding: "8px 14px",
      fontSize: "14px",
      background: "white",
    },
    card: {
      background: "white",
      borderRadius: "18px",
      padding: "18px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
      marginBottom: "20px",
    },
    searchRow: {
      display: "grid",
      gridTemplateColumns: "1fr auto auto",
      gap: "12px",
      marginBottom: "14px",
    },
    input: {
      width: "100%",
      padding: "12px 14px",
      borderRadius: "12px",
      border: "1px solid #cbd5e1",
      fontSize: "15px",
      boxSizing: "border-box",
    },
    button: {
      padding: "12px 14px",
      borderRadius: "12px",
      border: "1px solid #cbd5e1",
      background: "white",
      cursor: "pointer",
      fontSize: "14px",
    },
    activeButton: {
      padding: "10px 14px",
      borderRadius: "999px",
      border: "1px solid #0f172a",
      background: "#0f172a",
      color: "white",
      cursor: "pointer",
      fontSize: "14px",
    },
    filterWrap: {
      display: "flex",
      flexWrap: "wrap",
      gap: "8px",
      marginBottom: "14px",
    },
    hint: {
      background: "#f1f5f9",
      borderRadius: "12px",
      padding: "12px",
      fontSize: "14px",
      color: "#334155",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
      gap: "16px",
    },
    itemTitle: {
      fontSize: "18px",
      fontWeight: 700,
      margin: 0,
    },
    itemCode: {
      margin: "6px 0 10px 0",
      color: "#64748b",
      fontSize: "14px",
    },
    row: {
      marginBottom: "8px",
      fontSize: "14px",
      color: "#334155",
    },
    status: {
      display: "inline-block",
      padding: "6px 10px",
      borderRadius: "999px",
      background: "#e2e8f0",
      fontSize: "12px",
      marginBottom: "10px",
    },
    empty: {
      textAlign: "center",
      color: "#64748b",
      padding: "36px",
      background: "white",
      borderRadius: "18px",
      boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>Alati i lokacije</h1>
            <p style={styles.subtitle}>
              Pretraga po šifri, osnovnoj šifri i lokaciji.
            </p>
          </div>
          <div style={styles.badge}>MVP verzija</div>
        </div>

        <div style={styles.card}>
          <h2 style={{ marginTop: 0, fontSize: "20px" }}>Pretraga</h2>

          <div style={{ marginBottom: "14px" }}>
            <input
              style={styles.input}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Unesi šifru, npr. 16630, W16630/2 ili lokaciju A3"
            />
          </div>

          <div style={styles.filterWrap}>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                style={selectedCategory === category ? styles.activeButton : styles.button}
              >
                {category}
              </button>
            ))}
          </div>

          <div style={styles.hint}>
            Primer: unos <strong>16630</strong> prikazuje sve varijante te šifre. Unos{" "}
            <strong>A3</strong> prikazuje alat na toj lokaciji.
          </div>
        </div>

        {filtered.length > 0 ? (
          <div style={styles.grid}>
            {filtered.map((item) => (
              <div key={item.id} style={styles.card}>
                <div style={styles.status}>{item.status}</div>
                <h3 style={styles.itemTitle}>{item.name}</h3>
                <p style={styles.itemCode}>Šifra: {item.id}</p>
                <div style={styles.row}>
                  <strong>Osnovna šifra:</strong> {item.baseCode}
                </div>
                <div style={styles.row}>
                  <strong>Kategorija:</strong> {item.category}
                </div>
                <div style={styles.row}>
                  <strong>Lokacija:</strong> {item.location}
                </div>
                <div style={styles.row}>
                  <strong>Napomena:</strong> {item.notes || "-"}
                </div>
                {materialsData[item.id] && (
                  <div style={styles.row}>
                    <strong>Materijal:</strong>{" "}
                    {materialsData[item.id].join(", ")}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.empty}>Nema rezultata za trenutnu pretragu.</div>
        )}
      </div>
    </div>
  );
}