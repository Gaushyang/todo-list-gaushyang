export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  englishTitle: string;
  summary: string;
  seoDescription: string;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  scenarios: string[];
  capabilities: string[];
  deliverables: string[];
  process: string[];
  assetRequest?: string;
};

export const services: Service[] = [
  {
    slug: "ran-construction",
    title: "行動網路與基地台建設",
    shortTitle: "基地台建設",
    englishTitle: "Radio Access Network",
    summary: "整合現勘、結構施工、設備安裝、射頻測試與文件交付，支援新站建置及既有站台汰換。",
    seoDescription: "高祥電信提供 4G/5G 基地台現勘、鋼構、天饋線、設備安裝、測試與驗收工程服務。",
    image: {
      src: "/services/ran.jpg",
      alt: "基地台設備與天線工程示意",
      width: 3108,
      height: 3338,
    },
    scenarios: ["4G/5G 新站建置", "既有站台設備汰換", "鋼構與天饋線改善"],
    capabilities: ["現場勘查與施工規劃", "設備上架及線路配置", "射頻測試與障礙排查"],
    deliverables: ["勘查與風險紀錄", "施工前中後照片", "量測與竣工文件"],
    process: ["需求與場域初勘", "工法、工安及排程規劃", "設備安裝與自主檢查", "量測、缺失改善與文件交付"],
    assetRequest: "請提供 3 至 5 張已完工基地台案例照片，包含全景、設備近照與線路整理。建議長邊至少 2400px。",
  },
  {
    slug: "network-optimization",
    title: "5G 網路優化與量測",
    shortTitle: "網路優化",
    englishTitle: "Network Optimization",
    summary: "以現場量測、問題定位與調整驗證，處理覆蓋、干擾、容量及切換問題。",
    seoDescription: "高祥電信提供 Drive Test、頻譜干擾排查、天線調校、KPI 分析與行動網路品質改善。",
    image: {
      src: "/services/network.jpg",
      alt: "行動網路量測與優化作業示意",
      width: 1280,
      height: 720,
    },
    scenarios: ["訊號死角與弱覆蓋", "干擾或連線不穩", "建置後效能驗證"],
    capabilities: ["Drive Test 與定點量測", "頻譜及 KPI 問題分析", "天線參數與方位調整"],
    deliverables: ["測試路徑與原始紀錄", "問題點位與原因分析", "改善前後比較報告"],
    process: ["確認目標與驗收口徑", "蒐集現場與網路資料", "提出調整建議並執行", "複測及彙整改善結果"],
    assetRequest: "請提供工程師執行 Drive Test、頻譜量測或天線調校的實際工作照，避免畫面出現未授權客戶資料。",
  },
  {
    slug: "indoor-coverage",
    title: "室內涵蓋與專網方案",
    shortTitle: "室內涵蓋",
    englishTitle: "Indoor Connectivity",
    summary: "依建築結構、人流、頻段與施工限制規劃分散式天線系統，改善場域內的通訊品質。",
    seoDescription: "高祥電信提供大型場館、商辦、地下設施與園區 DAS 室內行動通訊涵蓋規劃及施工。",
    image: {
      src: "/services/indoor.jpg",
      alt: "室內通訊涵蓋系統場域示意",
      width: 5015,
      height: 2901,
    },
    scenarios: ["商辦與大型場館", "工廠及科技園區", "地下停車與交通設施"],
    capabilities: ["現況訊號與建物勘查", "DAS 線路及節點施工", "多樓層量測與調校"],
    deliverables: ["點位及路由紀錄", "設備與線纜標示", "樓層測試結果"],
    process: ["確認覆蓋目標與限制", "規劃點位、路由及工法", "分區施工與品質檢查", "全區量測及文件交付"],
    assetRequest: "目前圖片為暫用示意。請提供南港展覽館或其他大型場館的合法授權實景，以及 DAS 天線、線路與機房照片。",
  },
  {
    slug: "satellite-communication",
    title: "低軌衛星通訊整合",
    shortTitle: "衛星通訊",
    englishTitle: "Satellite Communication",
    summary: "針對偏遠、離島或需備援連線的場域，整合終端、結構、電力與地面網路介接。",
    seoDescription: "高祥電信提供低軌衛星地面終端、基座、對星、供電與應急備援通訊整合工程。",
    image: {
      src: "/services/satellite.jpg",
      alt: "低軌衛星地面終端設備示意",
      width: 1920,
      height: 1280,
    },
    scenarios: ["偏遠或離島站點", "災害應變備援", "地面網路不足場域"],
    capabilities: ["對空視角與環境勘查", "基座、終端及線路施工", "供電與網路介接測試"],
    deliverables: ["設備及點位紀錄", "連線測試結果", "操作與維護交接"],
    process: ["確認用途與環境限制", "評估結構、供電及路由", "安裝、校準與系統介接", "連線測試及操作交接"],
    assetRequest: "請確認 OneWeb 設備與商標露出權限，並提供可公開使用的終端全景、基座細節及完工照片。",
  },
  {
    slug: "c-ran-integration",
    title: "C-RAN 集中式機房施工整合",
    shortTitle: "C-RAN 整合",
    englishTitle: "Centralized Radio Access Network",
    summary: "整合集中式機房設備、主幹光纜、電力路由與遠端射頻單元，完成全鏈路測試。",
    seoDescription: "高祥電信提供 C-RAN 集中式機房、BBU、光纖主幹、電力與遠端射頻單元施工整合。",
    image: {
      src: "/services/c-ran.jpg",
      alt: "C-RAN 集中式機房與光纖系統示意",
      width: 4507,
      height: 3004,
    },
    scenarios: ["都會高密度站點", "集中式 BBU 機房", "光纖主幹與設備整併"],
    capabilities: ["機房設備與電力配置", "主幹光纜融接與測試", "遠端射頻單元介接"],
    deliverables: ["設備及埠位紀錄", "光纖測試資料", "全鏈路驗收文件"],
    process: ["確認機房與站點條件", "規劃光纖、電力及設備路由", "施工、融接與標示", "端到端測試及文件交付"],
    assetRequest: "請提供可公開的 C-RAN 機房全景、光纖熔接、標示與機櫃完工照片，畫面需移除機密標籤。",
  },
];

export const serviceBySlug = Object.fromEntries(
  services.map((service) => [service.slug, service]),
) as Record<string, Service>;
