import { ImageSquare } from "@phosphor-icons/react/dist/ssr";

type AssetRequestProps = {
  title: string;
  children: React.ReactNode;
  compact?: boolean;
};

export function AssetRequest({ title, children, compact = false }: AssetRequestProps) {
  return (
    <aside className={`asset-request${compact ? " asset-request-compact" : ""}`} data-asset-request>
      <ImageSquare aria-hidden="true" size={20} weight="regular" />
      <div>
        <strong>素材待補：{title}</strong>
        <p>{children}</p>
      </div>
    </aside>
  );
}
