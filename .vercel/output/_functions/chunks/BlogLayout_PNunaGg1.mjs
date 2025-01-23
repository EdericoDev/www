import { c as createComponent, r as renderTemplate, m as maybeRenderHead, a as addAttribute, b as renderTransition, d as renderHead, e as renderComponent, f as renderSlot, g as createAstro } from './astro/server_r2Qz89Np.mjs';
import 'kleur/colors';
import 'clsx';
/* empty css                              */

const $$SiteLogo = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<nav class="not-prose m-auto w-full max-w-[65ch] pb-4 text-zinc-700 dark:text-white/80" data-astro-cid-jwiz4kkf> <div class="flex w-full items-center justify-between" data-astro-cid-jwiz4kkf> <div class="flex flex-col gap-1" data-astro-cid-jwiz4kkf> <a href="/" data-astro-cid-jwiz4kkf> <h1 class="text-2xl font-extrabold comic-sans" data-astro-cid-jwiz4kkf> <span class="text-zinc-900 dark:text-white" data-astro-cid-jwiz4kkf>ederico</span><span class="text-purple-600 dark:text-purple-400" data-astro-cid-jwiz4kkf>.dev</span> </h1> </a> </div> </div> </nav> `;
}, "C:/Users/edegm/Documents/GitHub/www/src/components/SiteLogo.astro", undefined);

const $$Astro = createAstro();
const $$BlogLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BlogLayout;
  const { title, description } = Astro2.props.frontmatter || Astro2.props;
  return renderTemplate`<html lang="en"${addAttribute(renderTransition($$result, "tj23574r"), "data-astro-transition-scope")}> <head><meta charset="UTF-8"><meta property="og:site_name" content="ederico.dev"><meta property="og:url" content="https://ederico.dev/"><meta property="og:title"${addAttribute(title, "content")}><meta property="og:description"${addAttribute(description, "content")}><meta name="description"${addAttribute(description, "content")}><meta property="og:locale" content="en_US"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/x-icon" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title + " - ederico.dev"}</title>${renderHead()}</head> <body class="bg-white dark:bg-zinc-900 dark:text-white"> <div class="px-6 py-14"> ${renderComponent($$result, "Navigation", $$SiteLogo, {})} <main class="prose prose-zinc m-auto dark:prose-invert"> ${renderSlot($$result, $$slots["default"])} ${Astro2.url.pathname != "/" && renderTemplate`<a href="/"> <button class="rounded-full border bg-zinc-50 px-2 font-bold text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"> ${"< Homepage"} </button> </a>`} </main> </div> </body></html>`;
}, "C:/Users/edegm/Documents/GitHub/www/src/layouts/BlogLayout.astro", "self");

export { $$BlogLayout as $ };
