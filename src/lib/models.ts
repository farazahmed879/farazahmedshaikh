import mongoose, { Schema, type Model } from "mongoose";

const opts = { timestamps: true, versionKey: false } as const;

const ProfileSchema = new Schema(
  {
    name: { type: String, default: "" },
    shortName: { type: String, default: "" },
    roles: { type: [String], default: [] },
    tagline: { type: String, default: "" },
    availableForWork: { type: Boolean, default: true },
    availabilityText: { type: String, default: "" },
    photo: { type: String, default: "" },
    aboutHeading: { type: String, default: "" },
    bio: { type: String, default: "" },
    location: { type: String, default: "" },
    resumeUrl: { type: String, default: "" },
    stats: { type: [{ _id: false, label: String, value: String }], default: [] },
    email: { type: String, default: "" },
    contactHeading: { type: String, default: "" },
    contactMessage: { type: String, default: "" },
    socials: { type: [{ _id: false, platform: String, url: String }], default: [] },
    githubUsername: { type: String, default: "" },
    githubRepoCount: { type: Number, default: 6, min: 0, max: 30 },
    sections: {
      about: { type: Boolean, default: true },
      experience: { type: Boolean, default: true },
      projects: { type: Boolean, default: true },
      github: { type: Boolean, default: true },
      skills: { type: Boolean, default: true },
      contact: { type: Boolean, default: true },
    },
    seoTitle: { type: String, default: "" },
    seoDescription: { type: String, default: "" },
  },
  opts
);

const ExperienceSchema = new Schema(
  {
    company: { type: String, required: true, trim: true },
    role: { type: String, default: "" },
    period: { type: String, default: "" },
    location: { type: String, default: "" },
    description: { type: String, default: "" },
    highlights: { type: [String], default: [] },
    tech: { type: [String], default: [] },
    logo: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  opts
);

const ProjectSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    subtitle: { type: String, default: "" },
    description: { type: String, default: "" },
    image: { type: String, default: "" },
    link: { type: String, default: "" },
    repo: { type: String, default: "" },
    tags: { type: [String], default: [] },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  opts
);

const SkillCategorySchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    skills: {
      type: [{ _id: false, name: String, level: { type: Number, min: 0, max: 100 } }],
      default: [],
    },
    order: { type: Number, default: 0 },
  },
  opts
);

const MessageSchema = new Schema(
  {
    name: { type: String, required: true, maxlength: 120 },
    email: { type: String, required: true, maxlength: 200 },
    subject: { type: String, default: "", maxlength: 200 },
    message: { type: String, required: true, maxlength: 5000 },
    read: { type: Boolean, default: false },
  },
  opts
);

const MediaSchema = new Schema(
  {
    filename: String,
    contentType: String,
    size: Number,
    data: Buffer,
  },
  opts
);

const str = { type: String, default: "" };
const StorySchema = new Schema(
  {
    enabled: { type: Boolean, default: true },
    navLabel: str,
    eyebrow: str,
    title: str,
    intro: str,
    quote: str,
    quoteAuthor: str,
    spotlights: {
      type: [{ _id: false, emoji: String, eyebrow: String, title: String, text: String, points: String, quotes: String, photos: [String] }],
      default: [],
    },
    chapters: { type: [{ _id: false, year: String, title: String, description: String }], default: [] },
    education: { type: [{ _id: false, institution: String, degree: String, period: String, description: String }], default: [] },
    passions: { type: [{ _id: false, emoji: String, title: String, description: String, details: String }], default: [] },
    funFacts: { type: [String], default: [] },
    goals: { type: [{ _id: false, horizon: String, title: String, description: String }], default: [] },
    dreamTitle: str,
    dreamText: str,
    gallery: { type: [{ _id: false, image: String, caption: String }], default: [] },
    connectTitle: str,
    connectText: str,
  },
  opts
);

const AdminUserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true, trim: true, lowercase: true, minlength: 3, maxlength: 50 },
    passwordHash: { type: String, required: true },
    // Bumped on every credential change so older sessions stop working.
    tokenVersion: { type: Number, default: 0 },
    // True while the auto-created admin/admin credentials are still in use.
    isDefault: { type: Boolean, default: false },
  },
  opts
);

function model(name: string, schema: Schema): Model<any> {
  return (mongoose.models[name] as Model<any>) ?? mongoose.model(name, schema);
}

export const ProfileModel = model("Profile", ProfileSchema);
export const ExperienceModel = model("Experience", ExperienceSchema);
export const ProjectModel = model("Project", ProjectSchema);
export const SkillCategoryModel = model("SkillCategory", SkillCategorySchema);
export const MessageModel = model("Message", MessageSchema);
export const MediaModel = model("Media", MediaSchema);
export const AdminUserModel = model("AdminUser", AdminUserSchema);
export const StoryModel = model("Story", StorySchema);

/** Ordered collections editable from the admin panel. */
export const collections = {
  experiences: ExperienceModel,
  projects: ProjectModel,
  skills: SkillCategoryModel,
} as const;

export type CollectionName = keyof typeof collections;

export function getCollection(name: string): Model<any> | null {
  return name in collections ? collections[name as CollectionName] : null;
}

/** Converts lean docs into plain JSON with a string `id`. */
export function serialize<T = any>(doc: any): T {
  if (Array.isArray(doc)) return doc.map((d) => serialize(d)) as T;
  if (!doc) return doc;
  const plain = JSON.parse(JSON.stringify(doc));
  if (plain._id) {
    plain.id = String(plain._id);
    delete plain._id;
  }
  return plain as T;
}
