/* empty css                                 */
import { c as createComponent, r as renderTemplate, o as renderHead, n as renderSlot, b as createAstro, m as maybeRenderHead, a as addAttribute, d as renderComponent, _ as __astro_tag_component__, F as Fragment, i as createVNode } from '../chunks/astro/server_Bx4_Xybi.mjs';
import { a as $$Icon, $ as $$BlogLayout } from '../chunks/BlogLayout_Bnzpcff8.mjs';
import 'kleur/colors';
import 'clsx';
import { c as current_component, p as push, a as pop } from '../chunks/_@astro-renderers_B2oNcLm2.mjs';
export { r as renderers } from '../chunks/_@astro-renderers_B2oNcLm2.mjs';
/* empty css                                 */
import { g as getCollection } from '../chunks/_astro_content_DuryWM1a.mjs';
import { $ as $$Post } from '../chunks/Post_CPrLn2LY.mjs';

/** @import { Component } from '#server' */

/** @param {() => void} fn */
function onDestroy(fn) {
	var context = /** @type {Component} */ (current_component);
	(context.d ??= []).push(fn);
}

const $$Astro$3 = createAstro();
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>${title}</title>${renderHead()}</head> <body class="bg-gray-900 text-white"> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "C:/Users/edegm/Documents/GitHub/www/src/layouts/BaseLayout.astro", undefined);

function Welcome($$payload, $$props) {
	push();

	{
		$$payload.out += '<!--[!-->';
		$$payload.out += `<h1 class="svelte-15vog8v">👋</h1>`;
	}

	$$payload.out += `<!--]-->`;
	pop();
}

const $$Astro$2 = createAstro();
const $$Button = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Button;
  const { href, text, style } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<button class="text-white font-bold py-2 px-4 rounded transition-colors duration-200"${addAttribute(`background-color: ${style};`, "style")}${addAttribute(`window.location.href='${href}';`, "onclick")}> ${text} </button>`;
}, "C:/Users/edegm/Documents/GitHub/www/src/components/button.astro", undefined);

const $$Astro$1 = createAstro();
const $$Badge = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Badge;
  const { type, href, label } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a class="inline-flex items-center gap-1 rounded border border-zinc-200 bg-zinc-50 p-1 text-sm leading-4 text-neutral-900 no-underline hover:underline dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"${addAttribute(href, "href")}> ${renderComponent($$result, "Icon", $$Icon, { "name": type, "class": "h-3 w-3" })} <span class="capitalize">${label || type}</span> </a>`;
}, "C:/Users/edegm/Documents/GitHub/www/src/components/Badge.astro", undefined);

function Spotify($$payload, $$props) {
	push();
	let interval;

	onDestroy(() => {
		clearInterval(interval);
	});

	$$payload.out += `<div class="spotify-widget svelte-1vf9txd"><div class="relative w-full not-prose svelte-1vf9txd">`;

	{
		$$payload.out += '<!--[-->';
		$$payload.out += `<div class="absolute h-full w-full rounded-lg bg-zinc-50 dark:bg-zinc-800 svelte-1vf9txd"></div> <div class="animate-pulse-fast absolute h-full w-full rounded-lg svelte-1vf9txd"><div class="h-full w-full rounded-lg bg-zinc-100 dark:bg-zinc-700 svelte-1vf9txd"></div></div>`;
	}

	$$payload.out += `<!--]--> `;

	{
		$$payload.out += '<!--[!-->';
	}

	$$payload.out += `<!--]--></div></div>`;
	pop();
}

function Osu($$payload, $$props) {
	push();

	$$payload.out += `<div class="osu-widget svelte-6p0m78"><div class="relative w-full not-prose svelte-6p0m78">`;

	{
		$$payload.out += '<!--[-->';
		$$payload.out += `<div class="absolute h-full w-full rounded-lg bg-zinc-50 dark:bg-zinc-800 svelte-6p0m78"></div> <div class="animate-pulse-fast absolute h-full w-full rounded-lg svelte-6p0m78"><div class="h-full w-full rounded-lg bg-zinc-100 dark:bg-zinc-700 svelte-6p0m78"></div></div>`;
	}

	$$payload.out += `<!--]--> `;

	{
		$$payload.out += '<!--[!-->';
	}

	$$payload.out += `<!--]--></div></div>`;
	pop();
}

const $$Links = createComponent(($$result, $$props, $$slots) => {
  const links = [
    {
      href: "https://github.com/edericodev",
      label: "github"
    },
    {
      href: "mailto:hello@ederico.dev",
      label: "e-mail"
    }
  ];
  return renderTemplate`${maybeRenderHead()}<div class="not-prose flex gap-x-3"> ${links.map((link) => renderTemplate`<a${addAttribute(link.href, "href")} class="flex items-center gap-1 hover:underline"> ${renderComponent($$result, "Icon", $$Icon, { "name": "phantom", "class": "h-5 w-5" })} <span class="font-bold">${link.label}</span> </a>`)} </div>`;
}, "C:/Users/edegm/Documents/GitHub/www/src/components/Links.astro", undefined);

const $$Astro = createAstro();
const $$Posts = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Posts;
  const { currentPage = 1, tag, searchQuery } = Astro2.props;
  const POSTS_PER_PAGE = 10;
  const allPosts = await getCollection("myblog");
  let filteredPosts = allPosts.sort(
    (a, b) => new Date(b.data.pubDate).getTime() - new Date(a.data.pubDate).getTime()
  );
  if (tag) {
    filteredPosts = filteredPosts.filter(
      (post) => post.data.tags && post.data.tags.includes(tag)
    );
  }
  if (searchQuery) {
    filteredPosts = filteredPosts.filter(
      (post) => post.data.title.toLowerCase().includes(searchQuery.toLowerCase()) || post.data.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  const calculateReadingTime = (content) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const end = start + POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(start, end);
  return renderTemplate`${maybeRenderHead()}<div class="not-prose flex flex-col gap-4"> ${paginatedPosts.map((post) => renderTemplate`${renderComponent($$result, "Post", $$Post, { "href": `/blog/${post.slug}`, "title": post.data.title, "description": post.data.description, "tags": post.data.tags || [], "pubDate": post.data.pubDate, "readingTime": calculateReadingTime(post.body) })}`)} </div>`;
}, "C:/Users/edegm/Documents/GitHub/www/src/components/Posts.astro", undefined);

const $$Places = createComponent(($$result, $$props, $$slots) => {
  const places = [
    {
      name: "Linux Day 2023/2024",
      url: "https://www.linuxday.it/2024/",
      icon: "linuxday"
    }
  ];
  return renderTemplate`${maybeRenderHead()}<div class="places-widget" data-astro-cid-ojkvtf5n> <div class="relative w-full not-prose" data-astro-cid-ojkvtf5n> <div class="rounded-lg border border-zinc-200 dark:border-zinc-700 p-4 bg-white dark:bg-zinc-900 shadow-md" data-astro-cid-ojkvtf5n> <ul class="space-y-3" data-astro-cid-ojkvtf5n> ${places.map(({ name, url, visitDate, icon }) => renderTemplate`<li class="flex items-center gap-3 p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-all" data-astro-cid-ojkvtf5n> ${renderComponent($$result, "Icon", $$Icon, { "name": icon, "class": "h-5 w-5 text-gray-800 dark:text-white", "data-astro-cid-ojkvtf5n": true })} <a${addAttribute(url, "href")} target="_blank" rel="noopener noreferrer" class="text-zinc-800 dark:text-zinc-100 font-medium hover:underline flex-grow" data-astro-cid-ojkvtf5n> ${name} </a> ${visitDate && renderTemplate`<span class="text-sm text-gray-600 dark:text-gray-300 ml-2 italic" data-astro-cid-ojkvtf5n> ${visitDate} </span>`} </li>`)} </ul> </div> </div> </div> `;
}, "C:/Users/edegm/Documents/GitHub/www/src/components/Places.astro", undefined);

const MDXLayout = function ({children}) {
  const {layout, ...content} = frontmatter;
  content.file = file;
  content.url = url;
  return createVNode($$BlogLayout, {
    file,
    url,
    content,
    frontmatter: content,
    headings: getHeadings(),
    'server:root': true,
    children
  });
};
const frontmatter = {
  "layout": "@layouts/BlogLayout.astro",
  "title": "home",
  "description": "Hello, world!"
};
function getHeadings() {
  return [{
    "depth": 2,
    "slug": "conventions-and-events-ive-been-a-part-of",
    "text": "Conventions and events I’ve been a part of."
  }];
}
function _createMdxContent(props) {
  const _components = {
    a: "a",
    h2: "h2",
    hr: "hr",
    p: "p",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(Welcome, {
      "client:load": true,
      "client:component-path": "C:/Users/edegm/Documents/GitHub/www/src/components/Welcome.svelte",
      "client:component-export": "default",
      "client:component-hydration": true
    }), "\n", createVNode(_components.p, {
      children: ["My nickname is edericodev or edericogames (he/him), and I’m a 15-year-old beginner self-taught developer based in ", createVNode($$Badge, {
        type: "italy",
        href: "https://youtu.be/drojd1HYtcM?si=xvjPnkDNgscCGHqA",
        label: "Italy"
      }), "."]
    }), "\n", createVNode(_components.p, {
      children: ["I love open source and I’m always looking for new ideas. I was a Windows user, but recently i moved to ", createVNode($$Badge, {
        type: "arch",
        href: "https://archlinux.org/",
        label: "Arch"
      }), ", my first linux distro. My favorite tools for exploring this awesome world include: VSCode, CodePen, and GitHub."]
    }), "\n", createVNode(_components.p, {
      children: "My journey began a couple of years ago with Discord bots, then I moved to web development and more complete projects. However, I also love coding with languages like C/C++ , Python, Javascript, HTML, and CSS (even if they’re not coding languages).\r\nI’m keen to try out Rust in the near future."
    }), "\n", createVNode(_components.p, {
      children: "If you want to see my projects, head up to GitHub!"
    }), "\n", createVNode($$Links, {}), "\n", createVNode(_components.hr, {}), "\n", createVNode(_components.h2, {
      id: "conventions-and-events-ive-been-a-part-of",
      children: "Conventions and events I’ve been a part of."
    }), "\n", createVNode($$Places, {}), "\n", createVNode(_components.hr, {}), "\n", createVNode(_components.p, {
      children: ["For the past few years, I’ve been learning English through Cambridge courses. I’m currently at a ", createVNode(_components.a, {
        href: "https://www.efset.org/cefr/b2/",
        children: "B2"
      }), " level, but I aspire to reach proficiency. When I have spare time, I use ", createVNode($$Badge, {
        type: "duolingo",
        href: " https://www.duolingo.com/profile/jxst_ede?via=share_profile_qr",
        label: "Duolingo"
      }), " for daily training."]
    }), "\n", createVNode(_components.hr, {}), "\n", createVNode(_components.p, {
      children: ["In my free time, I play ", createVNode($$Badge, {
        type: "osu",
        href: "https://osu.ppy.sh/users/34603157",
        label: "osu!"
      }), ". I really enjoy the standard mode. However, I’m not good at mania, catch, or taiko. Check my real-time stats below:"]
    }), "\n", createVNode(Osu, {
      "client:load": true,
      "client:component-path": "C:/Users/edegm/Documents/GitHub/www/src/components/Osu.svelte",
      "client:component-export": "default",
      "client:component-hydration": true
    }), "\n", createVNode(_components.p, {
      children: ["Or sometimes , i use my ", createVNode($$Badge, {
        type: "playstation",
        href: "https://psnprofiles.com/jxst_ede",
        label: "PS5"
      }), " for playing absolute masterpieces."]
    }), "\n", createVNode(_components.p, {
      children: ["I also listen to pretty much every genre on ", createVNode($$Badge, {
        type: "spotify",
        href: "https://open.spotify.com/user/31w3g2o6tkydwgjzyuntt42gpi54?si=fdeb7fa8d94e45b7",
        label: "spotify"
      }), ". Check what I’m into below:"]
    }), "\n", createVNode(Spotify, {
      "client:load": true,
      "client:component-path": "C:/Users/edegm/Documents/GitHub/www/src/components/Spotify.svelte",
      "client:component-export": "default",
      "client:component-hydration": true
    }), "\n", createVNode(_components.hr, {}), "\n", createVNode(_components.p, {
      children: ["The entire website was built with ", createVNode($$Badge, {
        type: "astro",
        href: "https://astro.build/",
        label: "astro"
      }), ", ", createVNode($$Badge, {
        type: "tailwindcss",
        href: "https://tailwindcss.com/",
        label: "tailwind"
      }), ", and ", createVNode($$Badge, {
        type: "svelte",
        href: "https://svelte.dev/",
        label: "svelte"
      }), "."]
    })]
  });
}
function MDXContent(props = {}) {
  return createVNode(MDXLayout, {
    ...props,
    children: createVNode(_createMdxContent, {
      ...props
    })
  });
}

const url = "";
const file = "C:/Users/edegm/Documents/GitHub/www/src/pages/index.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "C:/Users/edegm/Documents/GitHub/www/src/pages/index.mdx";
__astro_tag_component__(Content, 'astro:jsx');

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	Content,
	default: Content,
	file,
	frontmatter,
	getHeadings,
	url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
