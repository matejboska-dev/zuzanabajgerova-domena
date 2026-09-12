import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js';

const here = dirname(fileURLToPath(import.meta.url));

/** @type {(phase: string) => import('next').NextConfig} */
export default (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;

  return {
    outputFileTracingRoot: here,
    // Oddeleny adresar pro dev server (.next-dev) a pro produkcni build (.next).
    // Diky tomu 'next build' nikdy nepremaze bezici 'next dev', coz zpusobovalo
    // pad serveru s 500 (ENOENT / Cannot find module ...).
    distDir: process.env.NEXT_DIST_DIR || (isDev ? '.next-dev' : '.next'),
    devIndicators: false,
    experimental: {
      devtoolSegmentExplorer: false,
    },
    // nahledy fotek z RE/MAX CDN (dokud se nehostuji na vlastni domene)
    images: { unoptimized: true },
    webpack(config, { dev }) {
      if (dev) {
        config.cache = false;
      }
      return config;
    },
    async headers() {
      return [{ source: '/api/:path*', headers: [{ key: 'Cache-Control', value: 'no-store' }] }];
    },
    // vychozi locale (cs) bez prefixu v URL — reseno tu (framework rewrite),
    // ne v middlewaru, protoze middleware rewrite na prerenderovane stranky
    // na Netlify spolehlive vracel 404
    async rewrites() {
      return [
        { source: '/', destination: '/cs' },
        { source: '/:path*', destination: '/cs/:path*' },
      ];
    },
  };
};

