import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSiteContent, getStory } from "@/lib/content";
import Background from "@/components/site/Background";
import BallCursor from "@/components/site/BallCursor";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import StoryHero from "@/components/career/StoryHero";
import Spotlights from "@/components/career/Spotlights";
import { Chapters, Connect, Dream, Education, Gallery, Goals, Passions } from "@/components/career/StorySections";

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const story = await getStory();
  return {
    title: story.navLabel || "My Story",
    description: story.intro.split("\n")[0].slice(0, 160),
  };
}

export default async function CareerPage() {
  const [story, { profile }] = await Promise.all([getStory(), getSiteContent()]);
  if (!story.enabled) notFound();

  const links = [
    { id: "portfolio", label: "← Portfolio", href: "/" },
    story.spotlights?.length > 0 && { id: "spotlight", label: "Main events" },
    story.chapters.length > 0 && { id: "chapters", label: "Innings" },
    story.education.length > 0 && { id: "education", label: "Academy" },
    story.passions.length > 0 && { id: "passions", label: "Off the field" },
    (story.goals.length > 0 || story.dreamTitle) && { id: story.goals.length ? "future" : "dream", label: "The chase" },
    { id: "connect", label: "Fan club" },
  ].filter(Boolean) as { id: string; label: string; href?: string }[];

  return (
    <div className="relative min-h-screen overflow-x-clip">
      <Background />
      <BallCursor />
      <Navbar brand={profile.shortName || profile.name} brandHref="/" links={links} resumeUrl={profile.resumeUrl} />
      <main className="relative z-10">
        <StoryHero story={story} profile={profile} />
        {story.spotlights?.length > 0 && <Spotlights items={story.spotlights} />}
        {story.chapters.length > 0 && <Chapters story={story} />}
        {story.education.length > 0 && <Education story={story} />}
        {story.passions.length > 0 && <Passions story={story} />}
        {story.goals.length > 0 && <Goals story={story} />}
        {story.dreamTitle && <Dream story={story} />}
        <Gallery story={story} />
        <Connect story={story} profile={profile} />
      </main>
      <Footer profile={profile} />
    </div>
  );
}
