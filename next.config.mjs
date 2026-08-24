/** @type {import('next').NextConfig} */
const nextConfig = {
  // Silences Turbopack's workspace-root inference warning: without this,
  // Turbopack walks up parent directories looking for a lockfile and can
  // pick up an unrelated package-lock.json higher in the filesystem
  // (e.g. in the user's home directory), then warns about the ambiguity.
  // Pinning it to this project's own directory removes the guesswork.
  turbopack: {
    root: import.meta.dirname,
  },
};

export default nextConfig;
