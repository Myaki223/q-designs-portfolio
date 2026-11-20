// Portfolio projects, ordered as they appear on the site.
//
// Copy rules for this file: describe only what the artwork shows. Client
// relationships, roles, briefs, audiences, years and results are left out
// until they are confirmed — optional fields (`role`, `brief`, `audience`,
// `year`) render only when filled in.
//
// Image keys refer to optimized derivatives in src/data/image-manifest.json.
// Originals are kept untouched in public/images/projects.

const projectList = [
  {
    "slug": "boelou",
    "title": "Boelou",
    "type": "Social Media Posting",
    "summary": "A square social media ad combining a dog portrait, product imagery, and a bold shop call to action.",
    "overview": "A static social media post for Boelou featuring a dog resting on a blanket, diffuser and refill imagery, and the headline “A little plug. A calmer home.” Teal, deep green, and yellow organize the product message and shopping call to action.",
    "deliverables": [
      "Square social media post"
    ],
    "designNotes": [
      "A resting dog and a soft interior backdrop set a calm visual tone.",
      "Oversized product imagery and a yellow trial badge create a clear focal point.",
      "The dark green shop button and website address anchor the bottom of the layout."
    ],
    "cover": {
      "image": "boelou/static-ad",
      "alt": "Boelou square social media ad with a resting dog, a white diffuser and yellow refill bottles, the headline “A little plug. A calmer home.”, a 30-day trial badge, and a Shop Now button",
      "position": "50% 50%"
    },
    "sections": [
      {
        "title": "Social media post",
        "layout": "hero",
        "items": [
          {
            "image": "boelou/static-ad",
            "alt": "Boelou square social media ad with a resting dog, a white diffuser and yellow refill bottles, the headline “A little plug. A calmer home.”, a 30-day trial badge, and a Shop Now button",
            "caption": "Boelou — square static social media ad."
          }
        ]
      }
    ]
  },
  {
    "slug": "revere-estates",
    "title": "Revere Estates",
    "type": "Social Media Posting",
    "summary": "A portrait social media graphic presenting short-term rental management with property photography and four service highlights.",
    "overview": "A social media post for Revere Estates built around the headline “Your Property. Expertly Managed.” A blue-and-gold palette frames property photography, four service cards, and a call to discover the property’s potential.",
    "deliverables": [
      "Portrait social media post"
    ],
    "designNotes": [
      "Gold branding and a fine divider stand out against the blue sky background.",
      "Four rounded photo cards highlight revenue strategy, guest experience, property care, and owner communication.",
      "A large property photograph leads down to the gold call-to-action bar and website address."
    ],
    "cover": {
      "image": "revere-estates/social-post",
      "alt": "Revere Estates portrait social media graphic with a gold logo, “Your Property. Expertly Managed.” headline, four property-management service cards, a house photograph, and a gold call-to-action bar",
      "position": "50% 50%"
    },
    "sections": [
      {
        "title": "Social media post",
        "layout": "hero",
        "items": [
          {
            "image": "revere-estates/social-post",
            "alt": "Revere Estates portrait social media graphic with a gold logo, “Your Property. Expertly Managed.” headline, four property-management service cards, a house photograph, and a gold call-to-action bar",
            "caption": "Revere Estates — short-term rental management social media post."
          }
        ]
      }
    ]
  },
  {
    slug: 'aersoak',
    title: 'Aersoak',
    type: 'Packaging design',
    summary:
      'Wrap-around label and four-view container presentation for a line of molecular hydrogen bath tablets.',
    overview:
      'Packaging presentation for Aersoak Molecular Hydrogen Bath Tablets, a magnesium-based bath product. The full label is shown laid flat, and the same artwork is shown wrapped around a matte black container from four angles.',
    deliverables: ['Wrap-around container label', 'Four-view container presentation'],
    designNotes: [
      'Pale blue accents and thin line icons on a near-black label; the brightest mark is the single dot beside the wordmark.',
      'A bold sans-serif wordmark set against monospaced type for the product details, directions, and claims.',
      'The label is split into four panels — formula and usage, product name and count, benefits, and claims with the barcode — so each face of the container reads on its own.',
    ],
    cover: {
      image: 'aersoak/range',
      alt: 'Four matte black Aersoak containers shown side by side',
      position: '72% 50%',
    },
    sections: [
      {
        title: 'Container views',
        layout: 'hero',
        items: [
          {
            image: 'aersoak/range',
            alt: 'Aersoak bubble-and-splash mark beside four views of the matte black container: formula and usage panel, front panel with the wordmark, benefits panel, and the claims panel with barcode',
            caption: 'The brand mark and the container from four sides.',
          },
        ],
      },
      {
        title: 'Label artwork',
        layout: 'hero',
        items: [
          {
            image: 'aersoak/label',
            alt: 'Flat Aersoak label: formula information and usage directions, the Aersoak wordmark with "Molecular Hydrogen Bath Tablets" and a 60-tablet count, three benefits with icons, and claims copy above a barcode',
            caption: 'The complete label laid flat. Open it to read the panel copy at full size.',
          },
        ],
      },
    ],
  },
  {
    slug: 'streamingmeme',
    title: 'StreamingMeme',
    type: 'LinkedIn carousel',
    summary:
      'A three-slide LinkedIn carousel introducing StreamingMeme’s news coverage, daily brief, and buyers guide.',
    overview:
      'A three-slide LinkedIn carousel for StreamingMeme that introduces its streaming technology news, its daily industry brief, and its buyers guide, using bold typography and a consistent blue-and-white visual identity.',
    deliverables: ['Three square LinkedIn carousel slides'],
    designNotes: [
      'Each headline pairs a short black statement with a blue reply — “Big industry.” then “One daily brief.” — and the pattern holds across all three slides.',
      'A large, softly blurred play-shaped mark sits in the lower-left corner of every slide and links the three together.',
      'The sequence ends on an action: a search bar, a “Visit StreamingMeme” button, and the URL.',
    ],
    cover: {
      image: 'streamingmeme/slide-1',
      alt: 'StreamingMeme carousel slide reading “Streaming. One step ahead.”',
      position: '50% 50%',
    },
    sections: [
      {
        title: 'The carousel',
        layout: 'sequence',
        items: [
          {
            image: 'streamingmeme/slide-1',
            alt: 'Slide 1: StreamingMeme logo, “Streaming technology news”, and the headline “Streaming. One step ahead.” over “Daily curated news for video professionals” and streamingmeme.com',
            caption: 'Introduces the publication.',
          },
          {
            image: 'streamingmeme/slide-2',
            alt: 'Slide 2: “Big industry. One daily brief. Free. Focused. In your inbox.” beside a hand holding a phone showing the StreamingMeme site, surrounded by topic tags such as Video encoding, CDN delivery, and Ad tech',
            caption: 'Presents the daily brief and its topics.',
          },
          {
            image: 'streamingmeme/slide-3',
            alt: 'Slide 3: “Buyers Guide — Your next partner. Starts here. Discover the companies behind streaming.” above a search bar, a “Visit StreamingMeme” button, and streamingmeme.com',
            caption: 'Points to the buyers guide.',
          },
        ],
      },
    ],
  },
  {
    slug: 'astova',
    title: 'Astova',
    type: 'Packaging design',
    summary:
      'Bottle label for a vegan astaxanthin and curcumin supplement, shown in dark and light colorways.',
    overview:
      'Label and bottle presentation for Astova Astaxanthin & Curcumin, a vegan dietary supplement. The label is shown in a dark and a light colorway, each on a set of three amber bottles.',
    deliverables: [
      'Bottle label in dark and light colorways',
      'Three-bottle presentation for each colorway',
      'Supplement facts panel',
    ],
    designNotes: [
      'A widely spaced serif wordmark sits under an AA monogram that shifts from red to cream.',
      'Orange carries the accents in both colorways — the category line, the rules, and the section headings.',
      'Thin concentric circles sit behind the front-panel type.',
    ],
    cover: {
      image: 'astova/dark-range',
      alt: 'Three amber Astova supplement bottles with dark labels',
      position: '78% 50%',
    },
    sections: [
      {
        title: 'Dark colorway',
        layout: 'hero',
        items: [
          {
            image: 'astova/dark-range',
            alt: 'Gradient AA monogram beside three amber bottles with the dark Astova label, the center bottle facing front',
            caption: 'Monogram and bottles, dark label.',
          },
        ],
      },
      {
        title: 'Light colorway',
        layout: 'hero',
        items: [
          {
            image: 'astova/light-range',
            alt: 'Gradient AA monogram beside three amber bottles with the light Astova label, the center bottle facing front',
            caption: 'Monogram and bottles, light label.',
          },
        ],
      },
      {
        title: 'Label details',
        layout: 'trio',
        items: [
          {
            image: 'astova/dark-front',
            alt: 'Dark front panel: AA monogram, Astova wordmark, “Antioxidant & Recovery Support”, “Astaxanthin & Curcumin”, “With Piperine + PEA, Vegan Dietary Supplement”, and “60 Capsules, Vegan”',
            caption: 'Front panel, dark.',
          },
          {
            image: 'astova/light-front',
            alt: 'Light front panel with the same layout: AA monogram, Astova wordmark, product name, and capsule count',
            caption: 'Front panel, light.',
          },
          {
            image: 'astova/dark-facts',
            alt: 'Supplement facts table listing vitamin D3, magnesium, natural astaxanthin, curcumin, palmitoylethanolamide, and piperine with amounts per serving',
            caption: 'Supplement facts panel, dark.',
          },
        ],
      },
    ],
  },
  {
    slug: 'pilar-college',
    title: 'Pilar College of Zamboanga City',
    shortTitle: 'Pilar College',
    type: 'Institutional communications and apparel',
    summary:
      'An eleven-banner program series, social media posts, and uniform designs for Pilar College of Zamboanga City.',
    overview:
      'Communications and apparel for Pilar College of Zamboanga City: a banner series covering eleven programs from Kinder to the college degrees, social media posts for school announcements and observances, and a polo and jersey design.',
    deliverables: ['11 program banners', 'Social media posts', 'Polo shirt', 'Jersey in two colorways'],
    designNotes: [
      'The banners share one layout — a group photo over a photo collage, a two-line program title, and the program seal — and change only the color field from program to program.',
      'Most posts close with the same strip: the school’s website, email address, and phone line.',
      'The uniforms use geometric pattern bands at the hem and sleeves; the jersey adds a dolphin and wave motif behind the number.',
    ],
    cover: {
      image: 'pilar/banner-2',
      alt: 'Pilar College banner for the Bachelor of Science in Information Technology program',
      position: '50% 40%',
    },
    sections: [
      {
        title: 'Program banner series',
        intro: 'Eleven banners, one per program. Two are shown large; the full series follows.',
        layout: 'feature',
        items: [
          {
            image: 'pilar/banner-1',
            alt: 'Banner for the Bachelor of Science in Nursing: students in red shirts over a photo collage, with a red color field and the nursing program seal',
            caption: 'Bachelor of Science in Nursing.',
          },
          {
            image: 'pilar/banner-9',
            alt: 'Banner for Basic Education, Grade School: pupils in uniform over a photo collage, with a blue color field',
            caption: 'Basic Education — Grade School.',
          },
        ],
      },
      {
        title: 'Full series',
        layout: 'grid',
        items: [
          ['pilar/banner-1', 'Bachelor of Science in Nursing'],
          ['pilar/banner-2', 'Bachelor of Science in Information Technology'],
          ['pilar/banner-3', 'Bachelor of Science in Tourism Management'],
          ['pilar/banner-4', 'Bachelor of Science in Hospitality Management'],
          ['pilar/banner-5', 'Bachelor of Science in Business Administration'],
          ['pilar/banner-6', 'Bachelor of Elementary Education'],
          ['pilar/banner-7', 'Bachelor of Library and Information Science'],
          ['pilar/banner-8', 'Basic Education — Kinder'],
          ['pilar/banner-9', 'Basic Education — Grade School'],
          ['pilar/banner-10', 'Basic Education — Junior High School'],
          ['pilar/banner-11', 'Basic Education — Senior High School'],
        ].map(([image, name]) => ({
          image,
          alt: `Program banner: ${name}`,
          caption: name,
        })),
      },
      {
        title: 'Social media posts',
        intro: 'Enrollment and entrance exam announcements, and posts for religious and national observances.',
        layout: 'masonry',
        items: [
          {
            image: 'pilar/social-2',
            alt: 'Entrance examination schedule for A.Y. 2026–2027 set as a whiteboard table of examinees and dates, with exam times and an Enroll Now button beside campus photos',
            caption: 'Entrance examination schedule, A.Y. 2026–2027.',
          },
          {
            image: 'pilar/social-1',
            alt: 'Enrollment announcement for the Higher Education Department, 2nd semester S.Y. 2025–2026, listing enrollment dates by year level beside two students in uniform',
            caption: 'Higher Education enrollment, 2nd semester.',
          },
          {
            image: 'pilar/social-5',
            alt: 'Holy Week schedule listing Maundy Thursday, Good Friday, Black Saturday, and Easter Sunday in rounded date cards on a blue background',
            caption: 'Holy Week schedule.',
          },
          {
            image: 'pilar/social-4',
            alt: '“40 Days Lenten Calendar” post for February 27, 2026, on a blue textured background',
            caption: 'Lenten calendar post.',
          },
          {
            image: 'pilar/social-3',
            alt: 'EDSA People Power Revolution post dated February 25, 2026, with the People Power monument in front of a blue-tinted crowd and the line “Never Forget! Never Again!”',
            caption: 'EDSA People Power anniversary.',
          },
        ],
      },
      {
        title: 'Uniforms',
        layout: 'stack',
        items: [
          {
            image: 'pilar/polo',
            alt: 'Front and back of a navy and white polo shirt with geometric pattern bands, “PCZC” running vertically on the front and the school seal on the back',
            caption: 'Polo shirt, front and back.',
          },
          {
            image: 'pilar/jersey-navy',
            alt: 'Front and back of a navy Pilar College jersey with outlined lettering and a dolphin and wave pattern behind the number',
            caption: 'Jersey, navy colorway.',
          },
          {
            image: 'pilar/jersey-white',
            alt: 'Front and back of a white Pilar College jersey with navy lettering and a pale dolphin and wave pattern',
            caption: 'Jersey, white colorway.',
          },
        ],
      },
    ],
  },
  {
    slug: 'bellows-labs',
    title: 'Bellows Labs',
    type: 'Packaging design',
    summary:
      'Wrap-around label and three-view bottle presentation for a berberine dietary supplement.',
    overview:
      'Label and bottle presentation for Bellows Labs Metabolic Support, a berberine dietary supplement. The full wrap-around label is shown laid flat, and the bottle is shown from three sides.',
    deliverables: ['Wrap-around bottle label', 'Three-view bottle presentation'],
    designNotes: [
      'Deep green and gold throughout: green for the label’s outer bands, gold for the rules, icons, and the product-name bar.',
      'Three circular badges — Non-GMO, Lab Tested, GMP Certified — stack down the green left band.',
      'The label reads in three panels: supplement facts, the front with the hexagon B mark, and benefits with use, ingredients, and warnings.',
    ],
    cover: {
      image: 'bellows/range',
      alt: 'Three white Bellows Labs supplement bottles with green and gold labels',
      position: '74% 50%',
    },
    sections: [
      {
        title: 'Bottle views',
        layout: 'hero',
        items: [
          {
            image: 'bellows/range',
            alt: 'Bellows Labs hexagon B mark and wordmark beside three white bottles showing the supplement facts side, the front, and the benefits side of the label',
            caption: 'Mark and wordmark, with the bottle from three sides.',
          },
        ],
      },
      {
        title: 'Label artwork',
        layout: 'hero',
        items: [
          {
            image: 'bellows/label',
            alt: 'Flat Bellows Labs label: three badges on a green band, the supplement facts table, the front panel with “Metabolic Support” and “Dietary Supplement, 60 Capsules”, and benefits, suggested use, ingredients, warning, and barcode',
            caption: 'The complete label laid flat.',
          },
        ],
      },
    ],
  },
  {
    slug: 'driven-motorworks',
    title: 'Driven Motorworks',
    type: 'Apparel graphics',
    summary: 'Four T-shirt designs, each in a different graphic direction.',
    overview:
      'T-shirt graphics for Driven Motorworks. Each design takes a different direction: a classic muscle car illustration, a Japanese touge theme, an off-road scene, and a minimal nail mark.',
    deliverables: ['Four T-shirt designs'],
    designNotes: [
      'Each design has its own type and palette: script and red ink for Classics, katakana and a red sun for the touge shirt, spaced condensed capitals in orange for Off-Road, and a serif wordmark with a nail for the minimal shirt.',
      'Where the front is shown, it carries a small chest mark; the illustration and copy sit on the back.',
    ],
    cover: {
      image: 'driven/touge',
      alt: 'Black Driven Motorworks T-shirt with a touge-themed back print',
      position: '78% 50%',
    },
    sections: [
      {
        title: 'T-shirt designs',
        layout: 'pair',
        items: [
          {
            image: 'driven/classics',
            alt: 'Back of a white T-shirt worn by a model: “Driven Motorworks” in blue script above a red muscle car illustration and the word “Classics”',
            caption: 'Classics.',
          },
          {
            image: 'driven/touge',
            alt: 'Front and back of a black T-shirt: a katakana chest mark, and a back print with a white sports car, a red sun over a mountain, and “Driven by Obsession”',
            caption: 'Touge.',
          },
          {
            image: 'driven/offroad',
            alt: 'Front and back of a black T-shirt: a small “Driven Motorworks Offroad” chest mark, and two off-road vehicles in front of mountains and a striped sun above “Off-Road”',
            caption: 'Off-Road.',
          },
          {
            image: 'driven/nail',
            alt: 'Front and back of a black T-shirt with a white nail mark and the serif wordmark “Driven Motorworks”',
            caption: 'Nail mark.',
          },
        ],
      },
    ],
  },
  {
    slug: 'jci-zamboanga',
    title: 'JCI Zamboanga',
    type: 'Award submission boards',
    summary:
      'Presentation boards for the Zamboanga Hermosa Festival entry in the Best Tourism Program category.',
    overview:
      'Square submission boards for JCI Zamboanga’s entry “Zamboanga Hermosa Festival: Regatta & Wow Sardinas!” in the Best Tourism Program category. Each board covers one section of the entry with photos, text, and supporting figures.',
    deliverables: ['Award submission boards'],
    designNotes: [
      'Every board shares one frame: the JCI Philippines and JCI Zamboanga logos at top left, the “Journey and Destiny” mark at top right, and the entry name and category in the footer.',
      'Each board’s section name runs vertically along the left edge, such as “Benefit to the community” and “General planning, execution & partnership”.',
      'Where the entry has numbers, they lead the hierarchy, such as the visitor figures and the P340k budget set in large color type.',
    ],
    cover: {
      image: 'jci/board-4',
      alt: 'JCI Zamboanga submission board titled “Economic Waves: Ripple Effect of Festivity”',
      position: '50% 30%',
    },
    sections: [
      {
        title: 'Featured boards',
        layout: 'pair',
        items: [
          {
            image: 'jci/board-4',
            alt: 'Board “Economic Waves: Ripple Effect of Festivity” under “Benefit to the community”, with an economic boost section and inbound traveler figures of 683,744 visitors in 2023 against 452,585 in 2019',
            caption: 'Benefit to the community.',
          },
          {
            image: 'jci/board-7',
            alt: 'Board “Collaborative Canvas: Painting the Festival Scene” under “General planning, execution & partnership”, covering festival preparation, planning, a P340k budget approval, the outcome, and a grid of partner logos',
            caption: 'General planning, execution & partnership.',
          },
        ],
      },
      {
        title: 'More boards',
        layout: 'grid',
        items: [
          {
            image: 'jci/board-2',
            alt: 'Board “Community Catalyst: Elevating JCI Zamboanga” under “Value to JCI”, with a leadership development section, social media post screenshots, and group photos',
            caption: 'Value to JCI — Community Catalyst.',
          },
          {
            image: 'jci/board-3',
            alt: 'Board “Global Vision: JCI’s Worldwide Influence” under “Value to JCI”, with a speaker portrait and festival group photos',
            caption: 'Value to JCI — Global Vision.',
          },
          {
            image: 'jci/board-5',
            alt: 'Board “Cultural Echoes: Sustaining Heritage” under “Results achieved or long-term sustainability”, with vinta sail and regatta photos',
            caption: 'Results achieved — Cultural Echoes.',
          },
        ],
      },
    ],
  },
]

// Display order, grouped by kind of work: packaging, digital, institutional,
// apparel, then presentation boards.
const order = [
  'aersoak',
  'astova',
  'bellows-labs',
  'streamingmeme',
  'boelou',
  'revere-estates',
  'pilar-college',
  'driven-motorworks',
  'jci-zamboanga',
]

export const projects = order.map((slug) => projectList.find((item) => item.slug === slug))

export const getProject = (slug) => projects.find((project) => project.slug === slug)
