import {
  FaGithub,
  FaLinkedin,
  FaXTwitter,
  FaInstagram,
  FaFacebook,
  FaStackOverflow,
  FaYoutube,
  FaDribbble,
  FaMedium,
  FaGlobe,
  FaEnvelope,
} from "react-icons/fa6";

export const SOCIAL_PLATFORMS = {
  github: { label: "GitHub", Icon: FaGithub },
  linkedin: { label: "LinkedIn", Icon: FaLinkedin },
  twitter: { label: "X / Twitter", Icon: FaXTwitter },
  instagram: { label: "Instagram", Icon: FaInstagram },
  facebook: { label: "Facebook", Icon: FaFacebook },
  stackoverflow: { label: "Stack Overflow", Icon: FaStackOverflow },
  youtube: { label: "YouTube", Icon: FaYoutube },
  dribbble: { label: "Dribbble", Icon: FaDribbble },
  medium: { label: "Medium", Icon: FaMedium },
  email: { label: "Email", Icon: FaEnvelope },
  website: { label: "Website", Icon: FaGlobe },
} as const;

export type Platform = keyof typeof SOCIAL_PLATFORMS;

export function socialMeta(platform: string) {
  return SOCIAL_PLATFORMS[platform as Platform] ?? SOCIAL_PLATFORMS.website;
}

export default function SocialIcon({ platform, className }: { platform: string; className?: string }) {
  const { Icon } = socialMeta(platform);
  return <Icon className={className} aria-hidden />;
}
