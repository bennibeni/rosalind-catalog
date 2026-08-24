"use client";

import { useRef, useState } from "react";

// Pinned to a specific stable release rather than "latest" - a moving
// target would risk a silent behavior change (or a broken CDN path) with
// no warning, for a feature whose whole point is trustworthy parity with
// the real Python run.
const PYODIDE_VERSION = "314.0.5";
const PYODIDE_CDN = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

// Module-level singleton: the Pyodide runtime (a real CPython build
// compiled to WebAssembly, several MB) is fetched and initialized once
// per browser session and reused across every "Esegui ora" click on any
// problem page - not re-downloaded per click, and not per page either,
// as long as the browser tab stays open.
let pyodidePromise = null;

function loadPyodideOnce() {
  if (pyodidePromise) return pyodidePromise;
  pyodidePromise = new Promise((resolve, reject) => {
    if (window.loadPyodide) {
      resolve(window.loadPyodide({ indexURL: PYODIDE_CDN }));
      return;
    }
    const script = document.createElement("script");
    script.src = `${PYODIDE_CDN}pyodide.js`;
    script.onload = () => {
      window.loadPyodide({ indexURL: PYODIDE_CDN }).then(resolve, reject);
    };
    script.onerror = () =>
      reject(new Error("Impossibile caricare Pyodide dalla CDN (serve una connessione a internet)."));
    document.head.appendChild(script);
  });
  return pyodidePromise;
}

// ---------------------------------------------------------------------------
// This runs the EXACT, unmodified problem.py source - not a JavaScript
// transcription of it. Pyodide is a real CPython interpreter compiled to
// WebAssembly, so there is no parallel implementation to keep in sync and
// no risk of the two diverging: it's the same script, same interpreter
// family, just running client-side instead of via PowerShell.
//
// File writes the script makes (e.g. Reversal Distance's sets10.txt cache,
// Working with Files' fileOut.txt) land in Pyodide's own in-memory virtual
// filesystem - never the user's real disk.
// ---------------------------------------------------------------------------
export default function RunInBrowser({
  slug,
  source,
  inputFilename,
  inputContent,
  notRunnableReason,
  expectedOutput,
}) {
  const [status, setStatus] = useState("idle"); // idle | loading | running | done | error
  const [output, setOutput] = useState("");
  const [elapsedMs, setElapsedMs] = useState(null);
  const outputRef = useRef("");

  if (!source) return null;

  // Empirically verified (native Node + the pyodide npm package, same
  // WASM core as the browser build): this script's internal cache
  // regeneration - fine at ~4 minutes natively - did not even finish
  // within a 10-minute ceiling under WASM. Rather than leave a button
  // that can silently hang the tab for that long with only "Eseguo…" as
  // feedback, it's disabled here with an honest explanation instead.
  const effectiveNotRunnableReason =
    notRunnableReason ??
    (slug === "rear"
      ? "Il primo avvio rigenera una cache interna che, testata, non è nemmeno riuscita a completarsi in 10 minuti sotto WebAssembly (contro ~4 minuti nativi) - usa .\\run_all_rosalind.ps1 per questo problema."
      : null);

  if (effectiveNotRunnableReason) {
    return (
      <div className="mt-6 border-t border-line pt-5">
        <p className="font-mono-lab text-[10px] uppercase tracking-wider text-ink-dim">
          Esegui nel browser
        </p>
        <p className="mt-2 text-sm leading-relaxed text-ink-dim">
          Non disponibile per questo problema: {effectiveNotRunnableReason}
        </p>
        <details className="mt-3">
          <summary className="cursor-pointer select-none font-mono-lab text-[10px] uppercase tracking-wider text-ink-dim transition-colors hover:text-band">
            Mostra il codice sorgente (problem.py)
          </summary>
          <pre className="mt-2 max-h-80 overflow-auto rounded-xl border border-line bg-void p-4 font-mono-lab text-sm leading-relaxed text-ink">
            {source}
          </pre>
        </details>
      </div>
    );
  }

  async function handleRun() {
    outputRef.current = "";
    setOutput("");
    setElapsedMs(null);
    setStatus("loading");
    const start = performance.now();

    const appendOutput = (msg) => {
      outputRef.current += `${msg}\n`;
      setOutput(outputRef.current);
    };

    try {
      const pyodide = await loadPyodideOnce();
      setStatus("running");

      pyodide.setStdout({ batched: appendOutput });
      pyodide.setStderr({ batched: appendOutput });

      if (inputFilename && inputContent != null) {
        pyodide.FS.writeFile(inputFilename, inputContent);
      }

      await pyodide.runPythonAsync(source);
      setStatus("done");
    } catch (err) {
      appendOutput(err?.message ?? String(err));
      setStatus("error");
    } finally {
      setElapsedMs(Math.round(performance.now() - start));
    }
  }

  const isBusy = status === "loading" || status === "running";

  // Compared only once the run has actually finished (successfully or
  // not) - trimmed on both sides the same way the Node-side verification
  // harness did, so a trailing-newline difference alone doesn't produce
  // a false mismatch. `expectedOutput == null` means no run_log.txt entry
  // exists for this problem yet - genuinely "nothing to compare against",
  // not a mismatch.
  const comparison =
    status === "done" || status === "error"
      ? expectedOutput == null
        ? "no-reference"
        : output.trim() === expectedOutput.trim()
          ? "match"
          : "mismatch"
      : null;

  return (
    <div className="mt-6 border-t border-line pt-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-mono-lab text-[10px] uppercase tracking-wider text-ink-dim">
          Esegui nel browser &middot; Pyodide
        </p>
        <button
          type="button"
          onClick={handleRun}
          disabled={isBusy}
          className="rounded-full border border-band-dim px-4 py-1.5 font-mono-lab text-[11px] uppercase tracking-wider text-band transition-colors hover:bg-panel-raised disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "loading" ? "Carico Python…" : status === "running" ? "Eseguo…" : "Esegui ora"}
        </button>
      </div>

      <details className="mt-3 group">
        <summary className="cursor-pointer select-none font-mono-lab text-[10px] uppercase tracking-wider text-ink-dim transition-colors hover:text-band">
          Mostra il codice sorgente (problem.py)
        </summary>
        <pre className="mt-2 max-h-80 overflow-auto rounded-xl border border-line bg-void p-4 font-mono-lab text-sm leading-relaxed text-ink">
          {source}
        </pre>
      </details>

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
                {elapsedMs != null ? ` · ${(elapsedMs / 1000).toFixed(1)}s` : ""}
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
