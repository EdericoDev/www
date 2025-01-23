import 'cookie';
import 'kleur/colors';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_BwfvXawH.mjs';
import 'es-module-lexer';
import { h as decodeKey } from './chunks/astro/server_r2Qz89Np.mjs';
import 'clsx';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || undefined,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : undefined,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/edegm/Documents/GitHub/www/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/osu.json","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/osu\\.json\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"osu.json","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/osu.json.ts","pathname":"/api/osu.json","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/spotify.json","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/spotify\\.json\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"spotify.json","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/spotify.json.ts","pathname":"/api/spotify.json","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/videogames.BUfBAZgO.css"}],"routeData":{"route":"/blog/videogames","isIndex":false,"type":"page","pattern":"^\\/blog\\/videogames\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}],[{"content":"videogames","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog/videogames.mdx","pathname":"/blog/videogames","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":".gradient-text.svelte-15vog8v{background:linear-gradient(90deg,#f35608,#f14758 33%,#de4d9a 66%,#bb60f5);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;color:transparent}.wave.svelte-15vog8v{display:inline-block;animation-name:svelte-15vog8v-wave-animation;animation-duration:2s;animation-iteration-count:infinite;transform-origin:70% 70%;animation-delay:.5s}@keyframes svelte-15vog8v-wave-animation{0%,to{transform:rotate(0)}10%{transform:rotate(14deg)}20%{transform:rotate(-8deg)}30%{transform:rotate(14deg)}40%{transform:rotate(-4deg)}50%{transform:rotate(10deg)}60%{transform:rotate(0)}}.spotify-widget.svelte-kvsgg1{max-width:400px;margin:2rem auto}.animate-pulse-fast.svelte-kvsgg1{animation:svelte-kvsgg1-pulse 1s cubic-bezier(.4,0,.6,1) infinite}@keyframes svelte-kvsgg1-pulse{0%,to{opacity:1}50%{opacity:.5}}.osu-widget.svelte-6p0m78{max-width:400px;margin:2rem auto}.animate-pulse-fast.svelte-6p0m78{animation:svelte-6p0m78-pulse 1s cubic-bezier(.4,0,.6,1) infinite}@keyframes svelte-6p0m78-pulse{0%,to{opacity:1}50%{opacity:.5}}.places-widget[data-astro-cid-ojkvtf5n]{max-width:400px;margin:2rem auto}\n"},{"type":"external","src":"/_astro/videogames.BUfBAZgO.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.mdx","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/edegm/Documents/GitHub/www/src/pages/index.mdx",{"propagation":"in-tree","containsHead":true}],["C:/Users/edegm/Documents/GitHub/www/src/pages/blog/videogames.mdx",{"propagation":"in-tree","containsHead":true}],["C:/Users/edegm/Documents/GitHub/www/src/layouts/BlogLayout.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/blog/videogames@_@mdx",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["C:/Users/edegm/Documents/GitHub/www/src/components/Posts.astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/index@_@mdx",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-page:src/pages/blog/videogames@_@mdx":"pages/blog/videogames.astro.mjs","\u0000@astro-page:src/pages/api/osu.json@_@ts":"pages/api/osu.json.astro.mjs","\u0000@astro-page:src/pages/api/spotify.json@_@ts":"pages/api/spotify.json.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-page:src/pages/index@_@mdx":"pages/index.astro.mjs","\u0000@astro-renderers":"renderers.mjs","C:/Users/edegm/Documents/GitHub/www/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_BDurOqMu.mjs","\u0000@astrojs-manifest":"manifest__axLO77n.mjs","C:/Users/edegm/Documents/GitHub/www/src/components/Welcome.svelte":"_astro/Welcome.BJcQPzgS.js","C:/Users/edegm/Documents/GitHub/www/src/components/Osu.svelte":"_astro/Osu.DcuUjq9i.js","C:/Users/edegm/Documents/GitHub/www/src/components/Spotify.svelte":"_astro/Spotify.DQc1nUWp.js","@astrojs/svelte/client.js":"_astro/client.svelte.BxOlLqtK.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/ghostoftsushima.Dmq5cho6.jpeg","/_astro/kissyou.DRnHn-z2.jpeg","/_astro/liesofp.CngOFaIl.jpg","/_astro/legomarvel.eeK0uKgP.jpeg","/_astro/videogames.BUfBAZgO.css","/favicon.svg","/_astro/client.svelte.BxOlLqtK.js","/_astro/index-client.CS-wT3sY.js","/_astro/index.CQC0emMZ.js","/_astro/index.D6fT1jVK.css","/_astro/Osu.DcuUjq9i.js","/_astro/render.CCc2TC_d.js","/_astro/Spotify.DQc1nUWp.js","/_astro/Welcome.BJcQPzgS.js","/img/catch.png","/img/cyberpunkgif.gif","/img/OIP (2).jpg","/img/reddeadpfp.png","/img/temp.gif","/img/widget.png"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"O+JNlcMKdJ6vr/AxVRYTLzfJae69YvrfGV5BJAKw/SE="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
