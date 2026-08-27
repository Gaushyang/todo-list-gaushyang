import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, EnvelopeSimple, Phone } from "@phosphor-icons/react/dist/ssr";
import { AssetRequest } from "@/components/asset-request";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { processSteps, projects, site } from "@/content/site";
import { services } from "@/content/services";

const capabilities = [
  ["基地台與天饋線工程", "新站建置、設備汰換、鋼構、天線與射頻路徑施工。"],
  ["網路量測與問題定位", "Drive Test、定點量測、干擾排查與改善驗證。"],
  ["室內涵蓋與專網", "依建物、頻段與營運限制規劃 DAS 點位及線路。"],
  ["光纖與集中式機房", "C-RAN 機房、主幹光纜、設備與電力介接。"],
  ["衛星終端與備援通訊", "低軌衛星終端、基座、供電及地面網路整合。"],
  ["跨區工程調度", "支援本島、偏遠地區及離島場域的工程安排。"],
];

const partners = [
  ["/partners/chunghwa.png", "中華電信"],
  ["/partners/fet.png", "遠傳電信"],
  ["/partners/ericsson.png", "Ericsson"],
  ["/partners/nokia.png", "Nokia"],
  ["/partners/oneweb.png", "OneWeb"],
];

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Corporation",
  name: site.name,
  alternateName: site.englishName,
  url: site.url,
  logo: `${site.url}/brand/gaushyang-logo.jpg`,
  foundingDate: "1987",
  telephone: "+886-2-2268-1177",
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "自強街 28 號",
    addressLocality: "土城區",
    addressRegion: "新北市",
    postalCode: "236",
    addressCountry: "TW",
  },
};

export default function Home() {
  return (
    <main id="main-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />

      <section className="hero" aria-labelledby="hero-title">
        <div className="page-shell hero-grid">
          <Reveal className="hero-copy">
            <span className="topic-label">台灣通訊基礎建設工程團隊</span>
            <h1 id="hero-title">讓關鍵通訊，持續連線。</h1>
            <p>整合基地台、室內涵蓋、網路優化與衛星通訊工程，從現勘到驗收完整交付。</p>
            <div className="hero-actions">
              <Link className="button button-primary" href="#contact">
                預約現場會勘 <ArrowRight aria-hidden="true" size={18} />
              </Link>
              <Link className="text-link" href="#projects">
                查看工程實績 <ArrowRight aria-hidden="true" size={17} />
              </Link>
            </div>
          </Reveal>
          <Reveal className="hero-media">
            <figure>
              <Image
                src="/projects/ran-field.png"
                alt="屋頂基地台設備與線路完工現場"
                width={1155}
                height={752}
                priority
                sizes="(max-width: 820px) 100vw, 58vw"
              />
              <figcaption>基地台設備建置與射頻系統整合</figcaption>
            </figure>
            <AssetRequest title="正式品牌與主視覺" compact>
              請提供透明背景 SVG Logo，以及一張 2400 x 1600 以上、可公開使用的代表工程照片。現階段沿用舊站低解析度 Logo 與既有實拍。
            </AssetRequest>
          </Reveal>
          <div className="hero-facts" aria-label="公司重點經驗">
            <div className="hero-fact"><strong>1987</strong><span>投入台灣通訊工程</span></div>
            <div className="hero-fact"><strong>2G-5G</strong><span>跨世代基地台建置經驗</span></div>
            <div className="hero-fact"><strong>全台</strong><span>本島、偏遠地區與離島調度</span></div>
          </div>
        </div>
      </section>

      <section className="section section-soft">
        <div className="page-shell intro-grid">
          <div className="intro-rule" aria-hidden="true" />
          <Reveal className="intro-copy">
            <h2>把複雜的通訊標準，落實成可驗收的工程成果。</h2>
            <p>高祥電信整合規劃、施工、量測與維運能力，協助營運商與場域業主完成穩定可靠的通訊基礎設施。</p>
            <div className="intro-points">
              <div className="intro-point"><h3>單一工程窗口</h3><p>串接現勘、工法、設備、量測與文件交付。</p></div>
              <div className="intro-point"><h3>工安納入排程</h3><p>施工前確認風險、進場條件與作業責任。</p></div>
              <div className="intro-point"><h3>跨系統整合</h3><p>涵蓋基地台、光纖、室內涵蓋及衛星終端。</p></div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="projects" className="section">
        <div className="page-shell">
          <div className="section-heading">
            <span className="topic-label">專案實績</span>
            <h2>工程現場，是能力最直接的證明。</h2>
            <p>先以既有實拍建立案例骨架。正式上線前，仍需補齊專案名稱、年份、客戶授權與驗收成果。</p>
          </div>
          <div className="project-grid">
            {projects.map((project) => (
              <Reveal className="project-card" key={project.title}>
                <figure>
                  <Image src={project.image} alt={project.alt} width={project.width} height={project.height} sizes="(max-width: 820px) 100vw, 58vw" />
                </figure>
                <div className="project-card-body">
                  <h3>{project.title}</h3>
                  <dl className="project-details">
                    <div><dt>場域</dt><dd>{project.location}</dd></div>
                    <div><dt>工程內容</dt><dd>{project.scope}</dd></div>
                    <div><dt>交付</dt><dd>{project.result}</dd></div>
                  </dl>
                </div>
              </Reveal>
            ))}
          </div>
          <AssetRequest title="案例資料與照片授權">
            請為三個代表案例提供正式名稱、執行年份、場域範圍、可公開成果及照片授權。若客戶名稱不能公開，可改用場域類型描述。
          </AssetRequest>
        </div>
      </section>

      <section id="solutions" className="section section-soft">
        <div className="page-shell">
          <div className="section-heading">
            <span className="topic-label">核心服務</span>
            <h2>從地面網路到衛星終端，建立完整工程鏈。</h2>
            <p>五項服務使用同一套資料結構，後續可集中維護內容與 SEO 資訊。</p>
          </div>
          <div className="service-grid">
            {services.map((service) => (
              <Reveal className="service-card" key={service.slug}>
                <Image src={service.image.src} alt={service.image.alt} width={service.image.width} height={service.image.height} sizes="(max-width: 820px) 100vw, 60vw" />
                <Link className="service-card-content" href={`/services/${service.slug}/`}>
                  <small>{service.englishTitle}</small>
                  <h3>{service.title}</h3>
                  <p>{service.summary}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="section">
        <div className="page-shell">
          <div className="section-heading">
            <h2>每個節點，都留下可追蹤的交付資料。</h2>
          </div>
          <div className="process-grid">
            {processSteps.map((step) => (
              <div className="process-item" key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
                <span className="process-output">交付：{step.output}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="strength" className="section section-soft">
        <div className="page-shell">
          <div className="section-heading">
            <h2>技術、文件與現場紀律同等重要。</h2>
            <p>網站只呈現能由公司文件支持的資格與制度，不自行推定證照或合作關係。</p>
          </div>
          <div className="strength-grid">
            <div className="capability-list">
              {capabilities.map(([title, body]) => (
                <div className="capability" key={title}><h3>{title}</h3><p>{body}</p></div>
              ))}
            </div>
            <div className="credential-panel">
              <h3>上線前待確認的資格資料</h3>
              <div className="credential-list">
                <div><strong>公司登記與承攬資格</strong><span>請提供可公開名稱與證號</span></div>
                <div><strong>高空與電氣作業訓練</strong><span>請提供有效資格類型</span></div>
                <div><strong>工安管理制度</strong><span>請提供標準表單或訓練紀錄</span></div>
                <div><strong>設備商及營運商經驗</strong><span>請確認 Logo 與名稱使用授權</span></div>
              </div>
              <AssetRequest title="工安與團隊實拍" compact>
                請提供安全帽、防墜、班前會議、機房及現場量測照片。人物需同意公開，裝備穿戴必須符合公司規範。
              </AssetRequest>
            </div>
          </div>
          <div className="partner-logos" aria-label="合作規範與設備建置經驗">
            {partners.map(([src, alt]) => <Image key={src} src={src} alt={alt} width={140} height={44} />)}
          </div>
        </div>
      </section>

      <section id="careers" className="section">
        <div className="page-shell career-grid">
          <div>
            <div className="section-heading">
              <h2>工程品質，來自願意把細節做完的人。</h2>
              <p>我們尋找重視安全、協作與現場判斷的工程夥伴。</p>
            </div>
            <div className="career-list">
              <div className="career-item"><h3>完整工程歷程</h3><p>從現勘、施工到驗收，理解專案完整脈絡。</p></div>
              <div className="career-item"><h3>現場安全文化</h3><p>依場域條件準備工具、裝備、工法與風險控制。</p></div>
              <div className="career-item"><h3>跨領域合作</h3><p>與專案、機電、射頻及客戶窗口共同解決問題。</p></div>
            </div>
            <div className="career-actions">
              <a className="button button-primary" href={site.careersUrl} target="_blank" rel="noreferrer">查看 104 公司職缺 <ArrowUpRight aria-hidden="true" size={18} /></a>
            </div>
          </div>
          <div className="placeholder-panel">
            <AssetRequest title="團隊與工作環境照片">
              請提供工程團隊合照、辦公協作、教育訓練或安全會議照片。建議橫式 2400 x 1600 以上，並確認所有人物同意公開。
            </AssetRequest>
          </div>
        </div>
      </section>

      <section id="about" className="section section-soft">
        <div className="page-shell">
          <div className="section-heading">
            <h2>從通訊世代演進，累積可延續的工程能力。</h2>
          </div>
          <div className="about-grid">
            <div>
              <div className="timeline">
                <article><b>1987</b><h3>投入通訊工程</h3><p>公司創立年份，正式沿革內容待確認。</p></article>
                <article><b>2G-3G</b><h3>行動網路建置</h3><p>參與多世代基地台工程與站點維運。</p></article>
                <article><b>4G-5G</b><h3>設備與網路升級</h3><p>持續擴充射頻、光纖與集中式機房能力。</p></article>
                <article><b>LEO</b><h3>衛星通訊整合</h3><p>投入低軌衛星地面終端與備援通訊工程。</p></article>
              </div>
              <AssetRequest title="公司沿革與總部照片">
                請提供核准版公司沿革、重要年份、辦公室或營運總部外觀照片。不要使用含地圖或圖庫浮水印的圖片。
              </AssetRequest>
            </div>
            <div className="sustainability-panel">
              <h3>以正式文件說明承諾與進度。</h3>
              <p>現階段保留既有氣候目標文件入口。網站不自行生成減碳數據，待公司確認基準年、範圍及揭露方式。</p>
              <a className="button button-secondary" href="/documents/climate-ambition.pdf" target="_blank" rel="noreferrer">查看氣候目標文件 <ArrowUpRight aria-hidden="true" size={18} /></a>
              <AssetRequest title="永續行動照片" compact>
                請提供節能設備、環境管理、材料回收或低碳施工的實際紀錄，並附上可公開的簡短說明。
              </AssetRequest>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="section contact">
        <div className="page-shell contact-grid">
          <div className="contact-copy">
            <h2>先確認現場，再提出合適的工程方案。</h2>
            <p>請提供場域、問題與預計時程，我們會依需求安排初步聯絡。</p>
            <div className="contact-methods">
              <a href={site.phoneHref}><Phone aria-hidden="true" size={20} /><small>服務專線</small>{site.phoneDisplay}</a>
              <a href={`mailto:${site.email}`}><EnvelopeSimple aria-hidden="true" size={20} /><small>電子信箱</small>{site.email}</a>
            </div>
          </div>
          <div>
            <ContactForm />
            <AssetRequest title="表單收件設定" compact>
              請確認正式收件信箱、部署平台，以及是否需串接 CRM。完成前表單只進行前端預覽，不會傳送個資。
            </AssetRequest>
          </div>
        </div>
      </section>
    </main>
  );
}
