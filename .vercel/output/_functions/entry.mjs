import { r as renderers } from './chunks/_@astro-renderers_B2oNcLm2.mjs';
import { c as createExports } from './chunks/entrypoint_BFBmAvBF.mjs';
import { manifest } from './manifest_B8HdtTw9.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/osu.json.astro.mjs');
const _page2 = () => import('./pages/api/spotify.json.astro.mjs');
const _page3 = () => import('./pages/myblog.astro.mjs');
const _page4 = () => import('./pages/myblog/_---slug_.astro.mjs');
const _page5 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/osu.json.ts", _page1],
    ["src/pages/api/spotify.json.ts", _page2],
    ["src/pages/myblog/index.astro", _page3],
    ["src/pages/myblog/[...slug].astro", _page4],
    ["src/pages/index.mdx", _page5]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "659290f4-ef50-4ad2-9d45-a68d7f5a14ac",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
