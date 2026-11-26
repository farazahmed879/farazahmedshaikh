import { getSiteContent, getStory } from "@/lib/content";
import { getGithubRepos } from "@/lib/github";
import Background from "@/components/site/Background";
import BallCursor from "@/components/site/BallCursor";
import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import Ticker from "@/components/site/Ticker";
import About from "@/components/site/About";
import ExperienceSection from "@/components/site/Experience";
import Projects from "@/components/site/Projects";
import GithubRepos from "@/components/site/GithubRepos";
import Skills from "@/components/site/Skills";
import Contact from "@/components/site/Contact";
import Footer from "@/components/site/Footer";
import MotionProvider from "@/components/site/MotionProvider";

// Re-generated in the background at most once a minute, and immediately after admin edits.
export const revalidate = 60;

export default async function Home() {
  const [{ profile, experiences, projects, skills }, story] = await Promise.all([getSiteContent(), getStory()]);
  const { sections } = profile;
  const repos = sections.github ? await getGithubRepos(profile.githubUsername, profile.githubRepoCount) : [];

  const nav = [
    sections.about && { id: "about", label: "Profile" },
    sections.experience && experiences.length > 0 && { id: "experience", label: "Scorecard" },
    sections.projects && projects.length > 0 && { id: "projects", label: "Highlights" },
    sections.skills && skills.length > 0 && { id: "skills", label: "Skills" },
    sections.github && repos.length > 0 && { id: "github", label: "Nets" },
    sections.contact && { id: "contact", label: "Contact" },
    story.enabled && { id: "story", label: story.navLabel || "My Story", href: "/career" },
  ].filter(Boolean) as { id: string; label: string; href?: string }[];

  // Broadcast ticker built from the content itself.
  const current = experiences.find((e) => /present|now|current/i.test(e.period));
  const ticker = [
    current && `${current.role} at ${current.company} — since ${current.period.split(/[—–-]/)[0].trim()}`,
    ...projects.map((p) => `${p.name}${p.subtitle ? ` — ${p.subtitle}` : ""}`),
  ].filter(Boolean) as string[];
  const tape = [...profile.roles, ...skills.flatMap((c) => c.skills.filter((s) => s.level >= 85).map((s) => s.name))];

  return (
    <MotionProvider>
      <div className="relative min-h-screen overflow-x-clip">
        <Background />
        <BallCursor />
        <Navbar brand={profile.shortName || profile.name} links={nav} resumeUrl={profile.resumeUrl} />
        <main className="relative z-10">
          <Hero profile={profile} />
          <Ticker items={ticker} secondary={tape} />
          {sections.about && <About profile={profile} storyLabel={story.enabled ? story.navLabel || "My Story" : ""} />}
          {sections.experience && experiences.length > 0 && <ExperienceSection items={experiences} />}
          {sections.projects && projects.length > 0 && <Projects items={projects} />}
          {sections.skills && skills.length > 0 && <Skills categories={skills} />}
          {sections.github && repos.length > 0 && <GithubRepos repos={repos} username={profile.githubUsername} />}
          {sections.contact && <Contact profile={profile} />}
        </main>
        <Footer profile={profile} />
      </div>
    </MotionProvider>
  );
}
