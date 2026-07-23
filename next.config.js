/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: true,
  async redirects() {
    // /download/* never shipped (deleted pre-launch 2026-07-09), but pins and
    // docs were generated against these URLs. With trailingSlash: true, Next
    // normalizes requests to the slashed form BEFORE matching these sources,
    // so every source must end in a slash or it will never match.
    return [
      // Legacy Kajabi-era and old-site URLs still indexed by Google
      // (Search Console "Not found (404)", 2026-07-23).
      {
        source: '/login/',
        destination: 'https://courses.growthmindsetparenting.com/login',
        permanent: true,
      },
      {
        source: '/password/new/',
        destination: 'https://courses.growthmindsetparenting.com/password/new',
        permanent: true,
      },
      {
        source: '/store/',
        destination: 'https://courses.growthmindsetparenting.com/store',
        permanent: true,
      },
      {
        source: '/contact/',
        destination: '/work-with-me/',
        permanent: true,
      },
      {
        source: '/download/field-guide/',
        destination: '/freebies/six-middle-skills/',
        permanent: true,
      },
      {
        source: '/download/4s-flowchart/',
        destination: '/freebies/4s-flowchart/',
        permanent: true,
      },
      {
        source: '/download/five-minute-meeting/',
        destination: '/freebies/five-minute-meeting/',
        permanent: true,
      },
      {
        source: '/download/release-replay-repair-return/',
        destination: '/freebies/release-replay-repair-return/',
        permanent: true,
      },
      // Unknown /download/ paths: temporary redirect home, so nothing is
      // cached forever if these paths are ever reused.
      {
        source: '/download/:path*/',
        destination: '/',
        permanent: false,
      },
      // Extension-bearing paths (e.g. /download/foo.pdf) skip slash
      // normalization, so they need an unslashed twin.
      {
        source: '/download/:path*',
        destination: '/',
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
