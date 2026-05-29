import "./page-loader.css";

type PageLoaderVariant = "overlay" | "home" | "inner";

type PageLoaderProps = {
  variant?: PageLoaderVariant;
  label?: string;
};

export default function PageLoader({
  variant = "inner",
  label = "Loading",
}: PageLoaderProps) {
  if (variant === "overlay") {
    return (
      <div
        className="page-loader-overlay"
        role="status"
        aria-live="polite"
        aria-busy="true"
        aria-label={label}
      >
        <img
          src="/images/logo/colored-logo.png"
          alt="GL Bajaj"
          className="page-loader-logo"
          width={180}
          height={50}
        />
        <div className="page-loader-spinner" />
        <span className="page-loader-label">{label}…</span>
      </div>
    );
  }

  return (
    <div
      className="page-loader-content"
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label={label}
    >
      {variant === "home" && <div className="page-loader-banner" />}
      <div className="page-loader-inner">
        <div className="page-loader-title" />
        <div className="page-loader-grid">
          <div className="page-loader-card" />
          <div className="page-loader-card" />
          <div className="page-loader-card" />
        </div>
      </div>
    </div>
  );
}
