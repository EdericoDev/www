import { r as renderers } from './chunks/_@astro-renderers_CNUOuFo5.mjs';
import { c as createExports } from './chunks/entrypoint_pvwZPDhv.mjs';
import { manifest } from './manifest__axLO77n.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/osu.json.astro.mjs');
const _page2 = () => import('./pages/api/spotify.json.astro.mjs');
const _page3 = () => import('./pages/blog/videogames.astro.mjs');
const _page4 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/osu.json.ts", _page1],
    ["src/pages/api/spotify.json.ts", _page2],
    ["src/pages/blog/videogames.mdx", _page3],
    ["src/pages/index.mdx", _page4]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "4227fa87-becd-4180-b4f1-678f612bb8e1",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
