import Link from "next/link";
import Barcode from "./components/Barcode";
import { getAllProblems, getProblemsGroupedByTopic } from "@/lib/problems";

export default function HomePage() {
  const total = getAllProblems().length;
  const groups = getProblemsGroupedByTopic();

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6 py-24 sm:px-10">
      <p className="font-mono-lab text-xs uppercase tracking-[0.2em] text-band">
        rosalind.info &middot; archivio personale
      </p>
      <h1 className="mt-4 text-5xl font-semibold leading-[1.05] text-ink sm:text-6xl">
        {total} problemi.
        <br />
        {groups.length} argomenti.
        <br />
        Una sequenza alla volta.
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-dim">
        Ogni problema Rosalind risolto qui dentro ha il proprio enunciato,
        la propria fonte, e un piccolo codice a barre molecolare che lo
        identifica in modo univoco.
      </p>

      <Barcode seed="rosalind-catalog" length={40} className="mt-10 h-3" />

      <Link
        href="/problemi"
        className="mt-10 inline-flex w-fit items-center gap-2 rounded-full border border-band-dim px-6 py-3 font-mono-lab text-sm uppercase tracking-wider text-band transition-colors hover:bg-panel-raised"
      >
        Sfoglia il catalogo &rarr;
      </Link>

      <footer className="projects-footer">
        <a href="https://links-page-bennibeni.vercel.app/">&larr; All projects</a>
      </footer>
    </main>
  );
}
