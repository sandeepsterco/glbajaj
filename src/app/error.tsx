"use client";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div style={{ padding: 24, fontFamily: "system-ui, sans-serif" }}>
      <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
        Something went wrong
      </h2>
      <p style={{ marginBottom: 16, color: "#444" }}>
        Please try again. If this keeps happening, share the details below.
      </p>

      <pre
        style={{
          padding: 12,
          background: "#111",
          color: "#eee",
          borderRadius: 8,
          overflow: "auto",
          fontSize: 12,
          lineHeight: 1.4,
        }}
      >
        {error.message}
        {error.digest ? `\n\ndigest: ${error.digest}` : ""}
      </pre>

      <button
        type="button"
        onClick={() => reset()}
        style={{
          marginTop: 16,
          padding: "8px 12px",
          borderRadius: 8,
          border: "1px solid #ccc",
          background: "white",
          cursor: "pointer",
        }}
      >
        Retry
      </button>
    </div>
  );
}

