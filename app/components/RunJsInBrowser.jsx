"use client";

import { useRef, useState } from "react";

// ---------------------------------------------------------------------------
// Counterpart to RunInBrowser.jsx (Pyodide/Python), for problems that also
// have an independent JavaScript solution. No WASM runtime to fetch: the
// module is a plain static asset (public/js-solutions/<slug>.mjs) loaded
// via a native dynamic import() at click time - effectively instant after
// the first load, and the browser caches the file like any other static
// asset afterward.
//
// This is NOT a transcription of the Python script kept in lockstep - see
// the comment at the top of each public/js-solutions/*.mjs file for the
// specific correctness notes for that problem (e.g. BigInt vs Number for
// fibd). Same "match against run_log.txt" comparison as RunInBrowser, so
// the same badge means the same thing regardless of which language solved
// the problem.
// ---------------------------------------------------------------------------
export default function RunJsInBrowser({ modulePath, source, inputContent, expectedOutput, note }) {
  const [status, setStatus] = useState("idle"); // idle | running | done | error
  const [output, setOutput] = useState("");
  const [elapsedMs, setElapsedMs] = useState(null);
  const cacheBuster = useRef(0);

  if (!modulePath) return null;

  async function handleRun() {
    setOutput("");
    setElapsedMs(null);
    setStatus("running");
    const start = performance.now();

    try {
      if (inputContent == null) {
        throw new Error("Nessun dataset personale disponibile per questo problema (npm run sync-datasets).");
      }
      // Cache-busting query param so re-clicking after editing the file
      // locally (npm run dev) picks up the new version instead of a
      // stale cached module.
      cacheBuster.current += 1;
      const mod = await import(/* webpackIgnore: true */ `${modulePath}?v=${cacheBuster.current}`);
      const result = await mod.default(inputContent);
      setOutput(String(result));
      setStatus("done");
    } catch (err) {
      setOutput(err?.message ?? String(err));
      setStatus("error");
    } finally {
      setElapsedMs(Math.round(performance.now() - start));
    }
  }

  const comparison =
    status === "done" || status === "error"
      ? expectedOutput == null
        ? "no-reference"
        : output.trim() === expectedOutput.trim()
          ? "match"
          : "mismatch"
      : null;

  return (
    <div className="mt-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-mono-lab text-[10px] uppercase tracking-wider text-ink-dim">
          Esegui ora, live
        </p>
        <button
          type="button"
          onClick={handleRun}
          disabled={status === "running"}
          className="rounded-full border border-band-dim px-4 py-1.5 font-mono-lab text-[11px] uppercase tracking-wider text-band transition-colors hover:bg-panel-raised disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "running" ? "Eseguo…" : "Esegui ora"}
        </button>
      </div>

      {note ? (
        <p className="mt-2 text-xs leading-relaxed text-amber">{note}</p>
      ) : null}

      {source ? (
        <details className="mt-3">
          <summary className="cursor-pointer select-none font-mono-lab text-[10px] uppercase tracking-wider text-ink-dim transition-colors hover:text-band">
            Mostra il codice sorgente
          </summary>
          <pre className="mt-2 max-h-80 overflow-auto rounded-xl border border-line bg-void p-4 font-mono-lab text-sm leading-relaxed text-ink">
            {source}
          </pre>
        </details>
      ) : null}

      {output || status === "error" || status === "done" ? (
        <div className="mt-3">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="font-mono-lab text-[10px] uppercase tracking-wider text-ink-dim">
              Output dal vivo
            </span>
            <div className="flex items-center gap-2">
              {comparison === "match" ? (
                <span className="rounded-full bg-band/15 px-2.5 py-0.5 font-mono-lab text-[10px] uppercase tracking-wider text-band">
                  ✓ Corrisponde all&rsquo;output registrato
                </span>
              ) : comparison === "mismatch" ? (
                <span className="rounded-full bg-amber/15 px-2.5 py-0.5 font-mono-lab text-[10px] uppercase tracking-wider text-amber">
                  ✗ Diverso dall&rsquo;output registrato
                </span>
              ) : comparison === "no-reference" ? (
                <span className="font-mono-lab text-[10px] text-ink-dim">
                  nessun output registrato con cui confrontare
                </span>
              ) : null}
              <span
                className={`font-mono-lab text-[10px] uppercase tracking-wider ${
                  status === "error" ? "text-amber" : status === "done" ? "text-band" : "text-ink-dim"
                }`}
              >
                {status === "error" ? "ERRORE" : status === "done" ? "OK" : status.toUpperCase()}
                {elapsedMs != null ? ` · ${elapsedMs}ms` : ""}
              </span>
            </div>
          </div>
          <pre className="mt-2 max-h-64 overflow-auto rounded-xl border border-line bg-void p-4 font-mono-lab text-sm leading-relaxed text-ink">
            {output || "(nessun output)"}
          </pre>
        </div>
      ) : null}
    </div>
  );
}
