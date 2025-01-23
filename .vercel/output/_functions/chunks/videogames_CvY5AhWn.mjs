/* empty css                              */
import { _ as __astro_tag_component__, F as Fragment, i as createVNode } from './astro/server_D5qSBhsU.mjs';
import { $ as $$BlogLayout } from './BlogLayout_DZaxzbPa.mjs';
import { $ as $$Image } from './_astro_assets_D0axUtOn.mjs';
import 'clsx';

const ghostoftsushima = new Proxy({"src":"/_astro/ghostoftsushima.Dmq5cho6.jpeg","width":1170,"height":653,"format":"jpg","orientation":1}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/edegm/Documents/GitHub/www/src/assets/blog/videogames/ghostoftsushima.jpeg";
							}
							
							return target[name];
						}
					});

const kissyou = new Proxy({"src":"/_astro/kissyou.DRnHn-z2.jpeg","width":1280,"height":720,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/edegm/Documents/GitHub/www/src/assets/blog/videogames/kissyou.jpeg";
							}
							
							return target[name];
						}
					});

const legomarvel = new Proxy({"src":"/_astro/legomarvel.eeK0uKgP.jpeg","width":1920,"height":1080,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/edegm/Documents/GitHub/www/src/assets/blog/videogames/legomarvel.jpeg";
							}
							
							return target[name];
						}
					});

const liesofp = new Proxy({"src":"/_astro/liesofp.CngOFaIl.jpg","width":1460,"height":817,"format":"jpg"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/edegm/Documents/GitHub/www/src/assets/blog/videogames/liesofp.jpg";
							}
							
							return target[name];
						}
					});

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
  "title": "My experience with videogames",
  "description": "In this long post I will talk about my most valuable memories with videogames.",
  "tags": ["biographic", "off-topic", "videogames"],
  "pubDate": "2024-10-17T00:00:00.000Z"
};
function getHeadings() {
  return [];
}
function _createMdxContent(props) {
  const _components = {
    a: "a",
    em: "em",
    hr: "hr",
    p: "p",
    strong: "strong",
    ...props.components
  };
  return createVNode(Fragment, {
    children: [createVNode(_components.p, {
      children: "I’ve been passionate about video games ever since I was a child, spending hours of time fascinated by virtual worlds. Over time, I came to realize that video games were more than just a form of entertainment for me; they can actually change your life perspective."
    }), "\n", createVNode($$Image, {
      src: legomarvel,
      alt: "legomarvel.jpeg"
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.em, {
        children: "A screenshot from Lego Marvel Super Heroes, one of my first games ever"
      })
    }), "\n", createVNode(_components.p, {
      children: "It all started when I was a child, with a Wii, a CRT flat TV, and some imagination. As far as I remember, my first experience was Wii Sports. I remember that I was afraid of its intro for some reason. XD. I moved a bit later to more complex games like Wii Fit, Wii Play, or Just Dance that actually required a full motion of the body in order to play properly."
    }), "\n", createVNode(_components.p, {
      children: "The latter will occupy a special spot in my heart, to the point that I continue to have fun with both the latest installments and some of the earlier versions on PS3, as well as on my beloved old Wii. The Just Dance games from 4 to 2018 perfectly reflect my current taste in music."
    }), "\n", createVNode($$Image, {
      src: kissyou,
      alt: "kissyou.jpeg"
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.em, {
        children: ["Kiss You / Just Dance 2014 / ", createVNode(_components.a, {
          href: "https://www.newgamenetwork.com/media/13562/just-dance-2014/",
          children: "img credits"
        })]
      })
    }), "\n", createVNode(_components.p, {
      children: "Moreover, I used to play Super Mario titles (such as 3D World and Galaxy) and LEGO games, with LEGO Marvel Super Heroes being my first one, with a 3DS and a Wii U. These games introduced me to the excitement of exploration, especially for the collectibles, amusement, and challenge."
    }), "\n", createVNode(_components.p, {
      children: "As I grew older, my taste in games evolved. I started to collect Skylanders and Disney Infinity figures, and I owned an enormous variety of them. My favorite figure was Food Fight from Trap Team. I also activated my creative skills while creating small toy boxes."
    }), "\n", createVNode(_components.p, {
      children: "In early 2020, I discovered indie games, with Cuphead being my best pick. It took me about 50 hours to complete the main story because the boss fights were like tough nuts to crack. From my perspective, the most tedious one was King Dice, which I failed dozens of times before finally having the opportunity to face the devil."
    }), "\n", createVNode(_components.p, {
      children: "The quarantine was quite boring; however, I spent my time in competitive games (I regret this) such as Apex or Rocket League."
    }), "\n", createVNode(_components.p, {
      children: "I didn’t play anything new until 2023 when I discovered PlayStation’s masterpieces such as The Last of Us, God of War, Horizon, Astro, Uncharted, and many others."
    }), "\n", createVNode($$Image, {
      src: ghostoftsushima,
      alt: "ghostoftsushima.jpeg"
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.em, {
        children: "Ghost of Tsushima, taken from PS5 version’s photo mode."
      })
    }), "\n", createVNode(_components.p, {
      children: ["In early 2024, I played my first SoulsBorne, Elden Ring. It took me almost 70 hours of exploring around to (almost) beat the game. Despite my initial skepticism, I gradually began to appreciate the depth of ", createVNode(_components.strong, {
        children: "Elden Ring"
      }), ". After experimenting with several classes, I found myself gravitating towards the ", createVNode(_components.strong, {
        children: "Faith Samurai"
      }), " build. The mix of agility, precision, and a balanced approach to both melee and enchants suited my playstyle. This class allowed me to focus on dexterity and endurance. I particularly enjoyed the challenge of perfecting my dodging mechanics, which became increasingly rewarding as I faced stronger enemies. I loved bleeding my opponents."]
    }), "\n", createVNode(_components.p, {
      children: ["Even though ", createVNode(_components.strong, {
        children: "Margit the Fell Omen"
      }), " was my first major challenge, I quickly learned that patience and timing were key. I started to rely less on brute force and more on outsmarting enemies, reading their patterns, and planning my attacks and dodging accordingly. By the time I faced the last enemy, I had already grown attached to my Samurai’s versatility, and the fight felt like a true test of everything I had learned so far, even if I couldn’t beat the final boss."]
    }), "\n", createVNode(_components.p, {
      children: ["Then, I decided to try ", createVNode(_components.strong, {
        children: "Lies of P"
      }), ", a soulslike. This time, I found myself immersed in a captivating world inspired by the tale of ", createVNode(_components.strong, {
        children: "Pinocchio"
      }), ". The gameplay mechanics felt more accessible to me, and the combat system was fluid and engaging. As I navigated through the dark, atmospheric environments, I quickly adapted to the challenges and learned from my mistakes. To my surprise, I managed to beat the entire game, feeling a sense of accomplishment that I hadn’t experienced with ", createVNode(_components.strong, {
        children: "Elden Ring"
      }), ". The combination of a breathtaking narrative and balanced difficulty made my journey through ", createVNode(_components.strong, {
        children: "Lies of P"
      }), " both enjoyable and rewarding."]
    }), "\n", createVNode($$Image, {
      src: liesofp,
      alt: "liesofp.jpg"
    }), "\n", createVNode(_components.p, {
      children: createVNode(_components.em, {
        children: ["Lies of P / ", createVNode(_components.a, {
          href: "https://jpgames.de/2023/02/lies-of-p-das-vielversprechende-souls-like-im-bloodborne-stil-hat-endlich-einen-termin/",
          children: "img credits"
        })]
      })
    }), "\n", createVNode(_components.p, {
      children: ["Another saga that had a significant impact on my life was ", createVNode(_components.strong, {
        children: "Persona"
      }), ". My experience with these games began last year, with ", createVNode(_components.em, {
        children: "Persona 4"
      }), " being my first title. I didn’t appreciate it at first glance because it was different from the action games I was used to. However, as I dove deeper into the next chapters, I began to understand its depth."]
    }), "\n", createVNode(_components.p, {
      children: "What initially seemed like a simple story about a group of friends solving a mystery gradually became a deep exploration of identity, friendship, and mental health. Each character had their own struggles. The game’s unique variety of gameplay mechanics, from dungeon crawling to social simulation with confidants, allowed me to engage with the narrative on multiple levels."
    }), "\n", createVNode(_components.p, {
      children: ["As I progressed through ", createVNode(_components.em, {
        children: "Persona 5 Royal and 3 Reload"
      }), ", I realized how much the game encouraged introspection. It prompted me to reflect on my own fears and insecurities. The emotional weight of the story, coupled with its brilliant art style and catchy soundtrack, made it an unforgettable experience."]
    }), "\n", createVNode(_components.hr, {}), "\n", createVNode(_components.p, {
      children: ["In conclusion, my journey through the world of video games has been a transformative experience that has shaped my perspective on life. From my early days with ", createVNode(_components.em, {
        children: "Wii Sports"
      }), " to my explorations in the enormous universes of ", createVNode(_components.em, {
        children: "Elden Ring"
      }), " and ", createVNode(_components.em, {
        children: "Persona"
      }), ", each game has offered an unforgettable experience and emotional connections. As I continue to discover new titles and revisit beloved classics, I look forward to new experiences, even if they probably won’t be as significant as the ones mentioned in this post."]
    }), "\n", createVNode(_components.p, {
      children: "Maybe I will update this post when I try other games and share my experiences with them!"
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

const url = "/blog/videogames";
const file = "C:/Users/edegm/Documents/GitHub/www/src/pages/blog/videogames.mdx";
const Content = (props = {}) => MDXContent({
  ...props,
  components: { Fragment: Fragment, ...props.components, },
});
Content[Symbol.for('mdx-component')] = true;
Content[Symbol.for('astro.needsHeadRendering')] = !Boolean(frontmatter.layout);
Content.moduleId = "C:/Users/edegm/Documents/GitHub/www/src/pages/blog/videogames.mdx";
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

export { _page as _ };
