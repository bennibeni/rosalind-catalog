import Link from "next/link";
import Barcode from "../components/Barcode";
import { getProblemsGroupedByTopic, getAllProblems } from "@/lib/problems";

export const metadata = {
  title: "Catalogo Rosalind",
};

export default function ProblemiIndexPage() {
  const groups = getProblemsGroupedByTopic();
  const total = getAllProblems().length;

  return (
    <main className="mx-auto max-w-5xl px-6 py-16 sm:px-10">
      <header className="mb-16">
        <p className="font-mono-lab text-xs uppercase tracking-[0.2em] text-band">
          Archivio personale &middot; {total} problemi
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-ink sm:text-5xl">
          Catalogo Rosalind
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-dim">
          Ogni voce riporta l&rsquo;enunciato originale del problema,
          tradotto e classificato secondo la tassonomia ufficiale di
          Rosalind. Le sezioni sono ordinate per argomento; un problema
          multi-argomento compare in ciascuna delle sue categorie.
        </p>
      </header>

      <div className="space-y-14">
        {groups.map(({ topic, problems }) => (
          <section key={topic}>
            <div className="mb-5 flex items-baseline justify-between border-b border-line pb-3">
              <h2 className="font-mono-lab text-sm uppercase tracking-[0.16em] text-ink">
                {topic}
              </h2>
              <span className="font-mono-lab text-xs text-ink-dim">
                {problems.length}
              </span>
            </div>

            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {problems.map((p) => (
                <li key={`${topic}-${p.slug}`}>
                  <Link
                    href={`/problemi/${p.slug}`}
                    className="group flex h-full flex-col justify-between rounded-2xl border border-line bg-panel p-5 transition-colors hover:border-band-dim"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-mono-lab text-xs uppercase tracking-wider text-band">
                          {p.rosalindId ?? p.slug}
                        </span>
                        {p.isExternalContest ? (
                          <span className="font-mono-lab text-[10px] uppercase tracking-wider text-ink-dim">
                            esterno
                          </span>
                        ) : null}
                      </div>
                      <h3 className="mt-2 text-lg font-medium leading-snug text-ink group-hover:text-band">
                        {p.title}
                      </h3>
                    </div>
                    <Barcode seed={p.slug} length={16} className="mt-5 h-2" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
