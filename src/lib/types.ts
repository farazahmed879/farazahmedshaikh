export type Social = { platform: string; url: string };
export type Stat = { label: string; value: string };
export type Skill = { name: string; level: number };

export type Sections = {
  about: boolean;
  experience: boolean;
  projects: boolean;
  github: boolean;
  skills: boolean;
  contact: boolean;
};

export type Profile = {
  id?: string;
  name: string;
  shortName: string;
  roles: string[];
  tagline: string;
  availableForWork: boolean;
  availabilityText: string;
  photo: string;
  /** Up to 3 photos that rotate on the player card; `photo` mirrors the first one. */
  photos?: string[];
  aboutHeading: string;
  bio: string;
  location: string;
  resumeUrl: string;
  stats: Stat[];
  email: string;
  contactHeading: string;
  contactMessage: string;
  socials: Social[];
  githubUsername: string;
  githubRepoCount: number;
  sections: Sections;
  seoTitle: string;
  seoDescription: string;
};

export type Experience = {
  id?: string;
  company: string;
  role: string;
  period: string;
  location: string;
  description: string;
  highlights: string[];
  tech: string[];
  logo: string;
  order: number;
};

export type Project = {
  id?: string;
  name: string;
  subtitle: string;
  description: string;
  image: string;
  link: string;
  repo: string;
  tags: string[];
  featured: boolean;
  order: number;
};

export type SkillCategory = {
  id?: string;
  title: string;
  skills: Skill[];
  order: number;
};

export type Message = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
};

export type SiteContent = {
  profile: Profile;
  experiences: Experience[];
  projects: Project[];
  skills: SkillCategory[];
};

export type StoryChapter = { year: string; title: string; description: string };
export type StoryEducation = { institution: string; degree: string; period: string; description: string };
// A passion with `details` is shown as a big featured "pillar" card.
export type StoryPassion = { emoji: string; title: string; description: string; details?: string };
/**
 * A big "main event" panel near the top of the story page.
 * `points` holds one item per line; `quotes` holds one quote per line as "Quote — Author".
 */
export type StorySpotlight = {
  emoji: string;
  eyebrow: string;
  title: string;
  text: string;
  points: string;
  quotes: string;
  /** Image URLs shown in a small carousel. */
  photos?: string[];
};
export type StoryGoal = { horizon: string; title: string; description: string };
export type StoryPhoto = { image: string; caption: string };

/** Content of the /career "my story" page. */
export type Story = {
  id?: string;
  enabled: boolean;
  navLabel: string;
  eyebrow: string;
  title: string;
  intro: string;
  quote: string;
  quoteAuthor: string;
  spotlights: StorySpotlight[];
  chapters: StoryChapter[];
  education: StoryEducation[];
  passions: StoryPassion[];
  funFacts: string[];
  goals: StoryGoal[];
  dreamTitle: string;
  dreamText: string;
  gallery: StoryPhoto[];
  connectTitle: string;
  connectText: string;
};

export type GithubRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
};
