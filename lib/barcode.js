// Every problem gets a short strip of nucleotide letters derived
// deterministically from its own slug/Rosalind ID - a small per-problem
// visual fingerprint (the app's signature element), styled like a gel
// electrophoresis lane. Same input always produces the same strip, so a
// problem's "barcode" is stable across the catalog and its own detail
// page, but distinct problems very rarely collide.
const BASES = ["A", "C", "G", "T"];

function hashString(str) {
  let h = 2166136261; // FNV-1a offset basis
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function generateBarcode(seed, length = 12) {
  let h = hashString(seed);
  const bases = [];
  for (let i = 0; i < length; i++) {
    // Xorshift-style mix so consecutive letters don't just cycle through
    // BASES in the same fixed order every time.
    h ^= h << 13;
    h >>>= 0;
    h ^= h >>> 17;
    h ^= h << 5;
    h >>>= 0;
    bases.push(BASES[h % BASES.length]);
  }
  return bases.join("");
}
