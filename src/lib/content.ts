import "server-only";
import { connectDB, isDbConfigured } from "./db";
import { ExperienceModel, ProfileModel, ProjectModel, SkillCategoryModel, StoryModel, serialize } from "./models";
import { defaultContent, defaultExperiences, defaultProfile, defaultProjects, defaultSkills, defaultStory } from "./defaults";
import type { Experience, Profile, Project, SiteContent, SkillCategory, Story } from "./types";

let seeding: Promise<void> | null = null;

/** Fills empty collections with the default content (runs once per empty DB). */
export async function ensureSeeded() {
  if (!seeding) {
    seeding = (async () => {
      await connectDB();
      const [p, e, pr, s] = await Promise.all([
        ProfileModel.estimatedDocumentCount(),
        ExperienceModel.estimatedDocumentCount(),
        ProjectModel.estimatedDocumentCount(),
        SkillCategoryModel.estimatedDocumentCount(),
      ]);
      if (p === 0) await ProfileModel.create(defaultProfile);
      // Only seed lists on a brand-new database (no profile yet), so deleting
      // every item from the admin panel doesn't bring the defaults back.
      if (p === 0 && e === 0) await ExperienceModel.insertMany(defaultExperiences);
      if (p === 0 && pr === 0) await ProjectModel.insertMany(defaultProjects);
      if (p === 0 && s === 0) await SkillCategoryModel.insertMany(defaultSkills);
    })().catch((err) => {
      seeding = null;
      throw err;
    });
  }
  return seeding;
}

export async function getProfile(): Promise<Profile> {
  await ensureSeeded();
  const doc = await ProfileModel.findOne().lean();
  return { ...defaultProfile, ...serialize<Profile>(doc) };
}

/** The /career page content; created from the draft defaults the first time. */
export async function getStory(): Promise<Story> {
  if (!isDbConfigured()) return defaultStory;
  try {
    await connectDB();
    let doc = await StoryModel.findOne().lean();
    if (!doc) {
      await StoryModel.updateOne({}, { $setOnInsert: defaultStory }, { upsert: true });
      doc = await StoryModel.findOne().lean();
    }
    return { ...defaultStory, ...serialize<Story>(doc) };
  } catch (err) {
    console.error("[content] Falling back to default story:", (err as Error).message);
    return defaultStory;
  }
}

export async function getSiteContent(): Promise<SiteContent> {
  if (!isDbConfigured()) return defaultContent;
  try {
    await ensureSeeded();
    const [profile, experiences, projects, skills] = await Promise.all([
      getProfile(),
      ExperienceModel.find().sort({ order: 1, createdAt: 1 }).lean(),
      ProjectModel.find().sort({ order: 1, createdAt: 1 }).lean(),
      SkillCategoryModel.find().sort({ order: 1, createdAt: 1 }).lean(),
    ]);
    return {
      profile,
      experiences: serialize<Experience[]>(experiences),
      projects: serialize<Project[]>(projects),
      skills: serialize<SkillCategory[]>(skills),
    };
  } catch (err) {
    console.error("[content] Falling back to default content:", (err as Error).message);
    return defaultContent;
  }
}
