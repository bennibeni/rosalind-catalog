import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Barcode from "../../components/Barcode";
import RunInBrowser from "../../components/RunInBrowser";
import RunJsInBrowser from "../../components/RunJsInBrowser";
import { getAllProblems, getProblemBySlug } from "@/lib/problems";
import { getMyOutputForSlug, getRunLog } from "@/lib/runLog";
import { getMyInputForSlug, myDatasetsDirExists } from "@/lib/myInput";
import { getMyScriptForSlug, myScriptsDirExists } from "@/lib/myScript";
import { getJsSolutionForSlug } from "@/lib/jsSolution";

export function generateStaticParams() {
  return getAllProblems().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const problem = getProblemBySlug(slug);
  if (!problem) return {};
  return {
    title: `${problem.title} - Catalogo Rosalind`,
  };
}

export default async function ProblemDetailPage({ params }) {
  const { slug } = await params;
  const problem = getProblemBySlug(slug);
  if (!problem) notFound();

  const {
    title,
    rosalindId,
    sourceUrl,
    isPythonVillage,
    isExternalContest,
    topics,
    unclassifiedNote,
    body,
  } = problem;

  const myOutput = getMyOutputForSlug(slug);
  const logExists = getRunLog() != null;
  const myInput = getMyInputForSlug(slug);
  const datasetsDirExists = myDatasetsDirExists();
  const myScript = getMyScriptForSlug(slug);
  const scriptsDirExists = myScriptsDirExists();
  const jsSolution = getJsSolutionForSlug(slug);
  const hasAnyExecutionData = myOutput != null || myInput != null || myScript != null;
  const hasNeitherSource = !logExists && !datasetsDirExists && !scriptsDirExists;

  return (
    <main className="mx-auto max-w-3xl px-6 py-16 sm:px-10">
      <Link
        href="/problemi"
        className="font-mono-lab text-xs uppercase tracking-[0.16em] text-ink-dim transition-colors hover:text-band"
      >
        &larr; Catalogo
      </Link>

      <header className="mt-8">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          {rosalindId ? (
            <span className="font-mono-lab text-xs uppercase tracking-wider text-band">
              {rosalindId}
            </span>
          ) : null}
          {isPythonVillage ? (
            <span className="font-mono-lab text-[10px] uppercase tracking-wider text-ink-dim">
              Python Village
            </span>
          ) : null}
          {isExternalContest ? (
            <span className="font-mono-lab text-[10px] uppercase tracking-wider text-amber">
              Fuori dal set ufficiale Rosalind
            </span>
          ) : null}
        </div>

        <h1 className="mt-3 text-3xl font-semibold leading-tight text-ink sm:text-4xl">
          {title}
        </h1>

        {topics.length > 0 ? (
          <div className="mt-4 flex flex-wrap gap-2">
            {topics.map((t) => (
              <span
                key={t}
                className="rounded-full border border-line px-3 py-1 font-mono-lab text-[11px] uppercase tracking-wider text-ink-dim"
              >
                {t}
              </span>
            ))}
          </div>
        ) : unclassifiedNote ? (
          <p className="mt-4 text-sm italic text-ink-dim">{unclassifiedNote}</p>
        ) : null}

        {sourceUrl ? (
          <p className="mt-4 text-sm">
            <a
              href={sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="text-band-dim underline decoration-line underline-offset-4 transition-colors hover:text-band"
            >
              Pagina originale su rosalind.info
            </a>
          </p>
        ) : null}

        <Barcode seed={problem.slug} length={28} className="mt-8 h-2.5" />
      </header>

      <article className="enunciato-body mt-10">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{body}</ReactMarkdown>
      </article>

      {hasAnyExecutionData ? (
        <section className="mt-12 rounded-2xl border border-amber/40 bg-panel p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-mono-lab text-xs uppercase tracking-[0.14em] text-amber">
              La mia esecuzione
            </h2>
            {myOutput?.runAt ? (
              <span className="font-mono-lab text-[10px] text-ink-dim">
                {myOutput.runAt}
              </span>
            ) : null}
          </div>

          {/* Input: dataset.txt reale, quello che ha prodotto l'output
              sotto - senza questo, l'output da solo non è verificabile
              (input diversi producono risultati diversi). */}
          {myInput ? (
            <div className="mt-5">
              <p className="font-mono-lab text-[10px] uppercase tracking-wider text-ink-dim">
                Input &middot; dataset.txt
              </p>
              <pre className="mt-2 max-h-64 overflow-auto rounded-xl border border-line bg-void p-4 font-mono-lab text-sm leading-relaxed text-ink">
                {myInput.content}
                {myInput.truncated ? (
                  <span className="text-ink-dim">
                    {"\n\n… troncato ("}
                    {myInput.totalChars.toLocaleString("it-IT")}
                    {" caratteri totali)"}
                  </span>
                ) : null}
              </pre>
            </div>
          ) : datasetsDirExists ? (
            <p className="mt-5 text-sm italic text-ink-dim">
              Nessun dataset.txt personale trovato per questo problema.
            </p>
          ) : (
            <p className="mt-5 text-sm leading-relaxed text-ink-dim">
              Input non disponibile — esegui{" "}
              <code className="rounded bg-panel-raised px-1.5 py-0.5">
                npm run sync-datasets
              </code>{" "}
              per copiarlo da <code className="rounded bg-panel-raised px-1.5 py-0.5">rosalind.info</code>.
            </p>
          )}

          {/* Output: quello che il mio script ha effettivamente prodotto
              a partire dall'input qui sopra (da run_log.txt). */}
          {myOutput ? (
            <div className="mt-6 border-t border-line pt-5">
              <div className="flex items-center justify-between">
                <p className="font-mono-lab text-[10px] uppercase tracking-wider text-ink-dim">
                  Output &middot; run_log.txt
                </p>
                <span
                  className={`font-mono-lab text-[10px] uppercase tracking-wider ${
                    myOutput.status === "OK" ? "text-band" : "text-amber"
                  }`}
                >
                  {myOutput.status}
                </span>
              </div>
              <pre className="mt-2 max-h-64 overflow-auto rounded-xl border border-line bg-void p-4 font-mono-lab text-sm leading-relaxed text-ink">
                {myOutput.output || "(nessun output prodotto)"}
              </pre>
            </div>
          ) : logExists ? (
            <p className="mt-6 border-t border-line pt-5 text-sm italic text-ink-dim">
              Nessun output registrato per questo problema in run_log.txt.
            </p>
          ) : (
            <p className="mt-6 border-t border-line pt-5 text-sm leading-relaxed text-ink-dim">
              Output non disponibile — esegui{" "}
              <code className="rounded bg-panel-raised px-1.5 py-0.5">
                .\run_all_rosalind.ps1
              </code>{" "}
              e poi{" "}
              <code className="rounded bg-panel-raised px-1.5 py-0.5">
                npm run sync-log
              </code>
              .
            </p>
          )}

          {/* Esegui nel browser: rilancia lo stesso problem.py, invariato,
              dentro un vero interprete CPython compilato in WebAssembly
              (Pyodide) - non una trascrizione JS, quindi nessun rischio
              che le due implementazioni divergano nel tempo. */}
          {myScript ? (
            <RunInBrowser
              slug={slug}
              source={myScript.source}
              inputFilename={myScript.inputFilename}
              inputContent={myScript.inputContent}
              notRunnableReason={myScript.notRunnableReason}
              expectedOutput={myOutput?.output ?? null}
            />
          ) : scriptsDirExists ? (
            <p className="mt-6 border-t border-line pt-5 text-sm italic text-ink-dim">
              Nessuno script trovato per questo problema.
            </p>
          ) : (
            <p className="mt-6 border-t border-line pt-5 text-sm leading-relaxed text-ink-dim">
              Esecuzione dal vivo non disponibile — esegui{" "}
              <code className="rounded bg-panel-raised px-1.5 py-0.5">
                npm run sync-scripts
              </code>{" "}
              per abilitarla.
            </p>
          )}
        </section>
      ) : hasNeitherSource ? (
        <section className="mt-12 rounded-2xl border border-dashed border-line p-6">
          <p className="font-mono-lab text-xs uppercase tracking-[0.14em] text-ink-dim">
            La mia esecuzione
          </p>
          <p className="mt-2 text-sm leading-relaxed text-ink-dim">
            Nessun dato personale collegato ancora. Esegui{" "}
            <code className="rounded bg-panel-raised px-1.5 py-0.5">
              .\run_all_rosalind.ps1
            </code>{" "}
            nel progetto <code className="rounded bg-panel-raised px-1.5 py-0.5">rosalind.info</code>,
            poi qui lancia{" "}
            <code className="rounded bg-panel-raised px-1.5 py-0.5">npm run sync</code>{" "}
            per collegare dataset, output registrato ed esecuzione dal
            vivo nel browser a questa pagina.
          </p>
        </section>
      ) : null}

      {/* Soluzione JS indipendente (non una trascrizione del Python) -
          esiste solo per un sottoinsieme di problemi, scelti apposta.
          Vive fuori dal pannello ambra "La mia esecuzione" perché è
          codice del progetto (come content/*.md), non dato personale
          sincronizzato da rosalind.info - resta visibile anche se
          data/ non è mai stato collegato. */}
      {jsSolution ? (
        <section className="mt-8 rounded-2xl border border-band-dim/40 bg-panel p-6">
          <h2 className="font-mono-lab text-xs uppercase tracking-[0.14em] text-band">
            Soluzione JavaScript
          </h2>
          <RunJsInBrowser
            modulePath={jsSolution.modulePath}
            source={jsSolution.source}
            inputContent={myScript?.inputContent ?? null}
            expectedOutput={myOutput?.output ?? null}
          />
        </section>
      ) : null}
    </main>
  );
}
