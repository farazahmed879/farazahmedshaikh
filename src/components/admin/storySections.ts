import type { Field } from "./fields";

/** The /career story page, split into sub-sections — each one gets its own admin page and sidebar link. */
export type StorySection = {
  slug: string;
  label: string;
  description: string;
  /** Section id on the public /career page, for the "View on site" link. */
  anchor: string;
  fields: Field[];
};

export const STORY_SECTIONS: StorySection[] = [
  {
    slug: "intro",
    label: "Intro & settings",
    description: "The top of the page: who you are in your own words, your motto, and whether the page is shown.",
    anchor: "intro",
    fields: [
      { name: "enabled", label: "Show this page", type: "boolean" },
      { name: "navLabel", label: "Menu label", type: "text", placeholder: "My Story" },
      { name: "eyebrow", label: "Small label above the title", type: "text" },
      { name: "title", label: "Title", type: "text", help: "Wrap words in *asterisks* to highlight them in amber." },
      { name: "intro", label: "Introduction", type: "textarea", rows: 6, help: "Leave a blank line between paragraphs." },
      { name: "quote", label: "Favourite quote / motto", type: "text" },
      { name: "quoteAuthor", label: "Quote author", type: "text" },
    ],
  },
  {
    slug: "main-events",
    label: "Main events",
    description: "The big things that define you, shown as large panels right after the intro. Quotes and photos rotate when there's more than one.",
    anchor: "spotlight",
    fields: [
      {
        name: "spotlights",
        label: "Main events",
        type: "list",
        itemLabel: "Main event",
        itemFields: [
          { name: "emoji", label: "Emoji", type: "text", narrow: true, placeholder: "🏋️" },
          { name: "eyebrow", label: "Small label", type: "text", placeholder: "Daily discipline" },
          { name: "title", label: "Title", type: "text", placeholder: "Health & *fitness*" },
          { name: "text", label: "Story", type: "textarea" },
          { name: "points", label: "Key points (one per line)", type: "textarea" },
          { name: "quotes", label: "Quotes (one per line, as: Quote — Author)", type: "textarea" },
          { name: "photos", label: "Photos", type: "images", help: "Shown as a small carousel. Up to 4 MB each — you can pick several at once." },
        ],
      },
    ],
  },
  {
    slug: "chapters",
    label: "Life chapters",
    description: "The key moments of your journey, in order. Wrap words in *asterisks* to make them bold.",
    anchor: "chapters",
    fields: [
      {
        name: "chapters",
        label: "Chapters",
        type: "list",
        itemLabel: "Chapter",
        itemFields: [
          { name: "year", label: "Year / period", type: "text", narrow: true, placeholder: "2017" },
          { name: "title", label: "Title", type: "text" },
          { name: "description", label: "Story", type: "textarea" },
        ],
      },
    ],
  },
  {
    slug: "education",
    label: "Education",
    description: "Schools, college, university, courses and certifications.",
    anchor: "education",
    fields: [
      {
        name: "education",
        label: "Education",
        type: "list",
        itemLabel: "Entry",
        itemFields: [
          { name: "period", label: "Period", type: "text", narrow: true, placeholder: "2013 — 2017" },
          { name: "institution", label: "Institution", type: "text" },
          { name: "degree", label: "Degree / programme", type: "text" },
          { name: "description", label: "Description", type: "textarea" },
        ],
      },
    ],
  },
  {
    slug: "passions",
    label: "Passions & facts",
    description:
      "Fill in “Longer story” to make a passion a big featured card; leave it empty for a small card. The emojis also appear as stickers around your player card.",
    anchor: "passions",
    fields: [
      {
        name: "passions",
        label: "Passions",
        type: "list",
        itemLabel: "Passion",
        itemFields: [
          { name: "emoji", label: "Emoji", type: "text", narrow: true, placeholder: "🏏" },
          { name: "title", label: "Title", type: "text" },
          { name: "description", label: "Short description", type: "textarea" },
          { name: "details", label: "Longer story (optional, makes it a big featured card)", type: "textarea" },
        ],
      },
      { name: "funFacts", label: "Quick facts", type: "lines", help: "One per line." },
    ],
  },
  {
    slug: "goals",
    label: "Goals & dream",
    description: "Where you're heading next, and the big dream.",
    anchor: "future",
    fields: [
      {
        name: "goals",
        label: "Goals",
        type: "list",
        itemLabel: "Goal",
        itemFields: [
          { name: "horizon", label: "When", type: "text", narrow: true, placeholder: "Next 2 years" },
          { name: "title", label: "Goal", type: "text" },
          { name: "description", label: "Description", type: "textarea" },
        ],
      },
      { name: "dreamTitle", label: "Dream headline", type: "text", full: true, help: "Wrap words in *asterisks* to highlight them in amber." },
      { name: "dreamText", label: "Dream description", type: "textarea", rows: 4 },
    ],
  },
  {
    slug: "gallery",
    label: "Photo gallery",
    description: "Optional — moments from your life. The section is hidden while it's empty.",
    anchor: "moments",
    fields: [
      {
        name: "gallery",
        label: "Photos",
        type: "list",
        itemLabel: "Photo",
        itemFields: [
          { name: "image", label: "Image", type: "image" },
          { name: "caption", label: "Caption", type: "text" },
        ],
      },
    ],
  },
  {
    slug: "connect",
    label: "Connect",
    description: "The closing section. The social links themselves come from Portfolio → Profile & sections.",
    anchor: "connect",
    fields: [
      { name: "connectTitle", label: "Heading", type: "text", full: true },
      { name: "connectText", label: "Text", type: "textarea", rows: 2 },
    ],
  },
];

export const storySection = (slug: string) => STORY_SECTIONS.find((s) => s.slug === slug);
