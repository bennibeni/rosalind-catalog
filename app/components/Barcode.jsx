import { generateBarcode } from "@/lib/barcode";

const BASE_COLOR = {
  A: "var(--color-band)",
  C: "var(--color-amber)",
  G: "var(--color-band-dim)",
  T: "var(--color-ink-dim)",
};

// The app's signature element: a short strip of nucleotide letters,
// deterministically derived from the problem's own slug (see
// lib/barcode.js), rendered as colored blocks reminiscent of a gel
// electrophoresis lane. Every problem gets its own stable "fingerprint"
// instead of a generic decorative divider.
export default function Barcode({ seed, length = 12, className = "" }) {
  const bases = generateBarcode(seed, length).split("");
  return (
    <div
      className={`flex gap-[2px] ${className}`}
      role="img"
      aria-label={`Codice a barre molecolare per ${seed}`}
    >
      {bases.map((base, i) => (
        <span
          key={i}
          className="flex-1 rounded-[1px]"
          style={{ backgroundColor: BASE_COLOR[base], height: "100%" }}
        />
      ))}
    </div>
  );
}
