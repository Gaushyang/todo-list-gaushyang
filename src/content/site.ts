export const site = {
  name: "高祥電信股份有限公司",
  shortName: "高祥電信",
  englishName: "Gaushyang Telecom Co., Ltd.",
  description:
    "高祥電信專注 4G/5G 基地台建設、C-RAN 集中式機房、室內涵蓋、網路優化與低軌衛星通訊整合。",
  url: "https://gaushyang.netlify.app",
  phoneDisplay: "+886 2 2268 1177",
  phoneHref: "tel:+886222681177",
  email: "service@gaushyang.com",
  address: "236 新北市土城區自強街 28 號",
  careersUrl: "https://www.104.com.tw/company/1a2x6bivgb",
};

export const navigation = [
  { label: "專案實績", href: "/#projects" },
  { label: "核心服務", href: "/#solutions" },
  { label: "工程流程", href: "/#process" },
  { label: "工安與資質", href: "/#strength" },
  { label: "人才招募", href: "/#careers" },
  { label: "關於與永續", href: "/#about" },
];

export const projects = [
  {
    title: "4G/5G 基地台設備建置",
    image: "/projects/ran-field.png",
    alt: "屋頂基地台設備與線路完工現場",
    width: 1155,
    height: 752,
    location: "都會與交通沿線場域",
    scope: "設備置換、天饋線配置、射頻測試與竣工文件",
    result: "依場域窗口完成施工、自主檢查與驗收資料交付",
  },
  {
    title: "C-RAN 機房與光纖整合",
    image: "/projects/cran-field.png",
    alt: "通訊機櫃內設備與光纖線路配置",
    width: 836,
    height: 653,
    location: "都會高密度網路區域",
    scope: "集中設備、電力、光纖主幹與遠端單元介接",
    result: "完成端到端測試、線路標示與機房文件整理",
  },
  {
    title: "低軌衛星地面終端建置",
    image: "/projects/oneweb-field.png",
    alt: "高樓屋頂低軌衛星地面終端完工現場",
    width: 1477,
    height: 949,
    location: "城市屋頂、偏遠與備援場域",
    scope: "基座、終端、供電、戶外纜線與網路介接",
    result: "完成對空條件確認、終端安裝與連線驗證",
  },
];

export const processSteps = [
  { title: "需求確認", body: "釐清場域、服務目標、施工限制與預計時程。", output: "需求摘要" },
  { title: "現場勘查", body: "盤點結構、供電、線路、訊號與進場條件。", output: "勘查紀錄" },
  { title: "工法與工安規劃", body: "提出施工方法、風險控制、資源與排程。", output: "工安及施工計畫" },
  { title: "施工與自主檢查", body: "依核定方案施工，留下點位、線路與品質紀錄。", output: "施工紀錄" },
  { title: "測試與文件交付", body: "完成量測、缺失改善、驗收及竣工文件。", output: "測試與竣工文件" },
];
