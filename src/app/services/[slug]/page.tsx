import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { AssetRequest } from "@/components/asset-request";
import { serviceBySlug, services } from "@/content/services";
import { site } from "@/content/site";

type ServicePageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = serviceBySlug[slug];
  if (!service) return {};
  return {
    title: service.title,
    description: service.seoDescription,
    alternates: { canonical: `/services/${service.slug}/` },
    openGraph: {
      title: `${service.title}｜高祥電信`,
      description: service.seoDescription,
      images: [{ url: service.image.src, width: service.image.width, height: service.image.height, alt: service.image.alt }],
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = serviceBySlug[slug];
  if (!service) notFound();

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.seoDescription,
    provider: { "@type": "Corporation", name: site.name, url: site.url },
    areaServed: "Taiwan",
    url: `${site.url}/services/${service.slug}/`,
  };

  return (
    <main id="main-content" className="detail-main">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <div className="page-shell">
        <Link className="back-link" href="/#solutions"><ArrowLeft aria-hidden="true" size={17} /> 返回核心服務</Link>
        <section className="detail-hero">
          <div>
            <span className="topic-label">{service.englishTitle}</span>
            <h1>{service.title}</h1>
            <p className="detail-lead">{service.summary}</p>
          </div>
          <figure>
            <Image src={service.image.src} alt={service.image.alt} width={service.image.width} height={service.image.height} priority sizes="(max-width: 820px) 100vw, 58vw" />
            {service.assetRequest ? <AssetRequest title="正式服務照片" compact>{service.assetRequest}</AssetRequest> : null}
          </figure>
        </section>

        <section className="detail-columns" aria-label="服務資訊">
          <div className="detail-column"><h2>適用場景</h2><ul>{service.scenarios.map((item) => <li key={item}>{item}</li>)}</ul></div>
          <div className="detail-column"><h2>服務範圍</h2><ul>{service.capabilities.map((item) => <li key={item}>{item}</li>)}</ul></div>
          <div className="detail-column"><h2>交付內容</h2><ul>{service.deliverables.map((item) => <li key={item}>{item}</li>)}</ul></div>
        </section>

        <section className="detail-process">
          <h2>從條件確認到文件交付</h2>
          <ol>{service.process.map((item) => <li key={item}>{item}</li>)}</ol>
        </section>

        <section className="detail-cta">
          <div><h2>需要評估工程條件？</h2><p>提供場域、預計時程與需求，我們將安排初步聯絡。</p></div>
          <Link className="button button-primary" href="/#contact">預約現場會勘 <ArrowRight aria-hidden="true" size={18} /></Link>
        </section>
      </div>
    </main>
  );
}
