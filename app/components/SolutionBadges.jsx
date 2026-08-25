// Piccoli badge testuali (non i loghi ufficiali, per restare puliti dal
// punto di vista del marchio) che segnalano se per un problema esiste
// una soluzione Python (data/scripts/<slug>.py) e/o JavaScript
// (public/js-solutions/<slug>.mjs). Puramente presentazionale: la
// logica di "esiste o no" resta nei rispettivi lib/*.js.
export default function SolutionBadges({ hasPython, hasJs, className = "" }) {
  if (!hasPython && !hasJs) return null;

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      {hasPython ? (
        <span
          title="Soluzione Python disponibile"
          className="inline-flex items-center gap-1 rounded-md bg-[#306998]/15 px-1.5 py-0.5 font-mono-lab text-[10px] font-semibold tracking-wide text-[#ffd43b]"
          style={{ backgroundColor: "rgba(48,105,152,0.15)", color: "#306998" }}
        >
          Py
        </span>
      ) : null}
      {hasJs ? (
        <span
          title="Soluzione JavaScript disponibile"
          className="inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 font-mono-lab text-[10px] font-semibold tracking-wide"
          style={{ backgroundColor: "rgba(240,219,79,0.2)", color: "#8a7300" }}
        >
          JS
        </span>
      ) : null}
    </div>
  );
}
