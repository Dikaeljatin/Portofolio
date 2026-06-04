"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ background: "#080808", color: "#fff", fontFamily: "monospace", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", margin: 0 }}>
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>Something went wrong</h2>
          <p style={{ color: "#666", marginBottom: "2rem", fontSize: "0.875rem" }}>{error.message}</p>
          <button
            onClick={reset}
            style={{ border: "1px solid rgba(255,255,255,0.2)", background: "transparent", color: "#fff", padding: "0.75rem 2rem", cursor: "pointer", fontFamily: "monospace", fontSize: "0.75rem", letterSpacing: "0.1em" }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
