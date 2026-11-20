"use client";

import CollectionManager from "@/components/admin/CollectionManager";

export default function ExperienceAdmin() {
  return (
    <CollectionManager
      collection="experiences"
      title="Experience"
      singular="Experience"
      description="Your work history, shown as an animated timeline."
      primary="role"
      secondary={(x) => `${x.company} · ${x.period}`}
      image="logo"
      empty={{ company: "", role: "", period: "", location: "", description: "", highlights: [], tech: [], logo: "" }}
      fields={[
        { name: "role", label: "Role / title", type: "text" },
        { name: "company", label: "Company", type: "text" },
        { name: "period", label: "Period", type: "text", placeholder: "Jan 2021 — Present" },
        { name: "location", label: "Location", type: "text" },
        { name: "description", label: "Description", type: "textarea", rows: 4 },
        { name: "highlights", label: "Key achievements", type: "lines", help: "One per line — shown as bullet points." },
        { name: "tech", label: "Tech used", type: "tags" },
        { name: "logo", label: "Company logo", type: "image" },
      ]}
    />
  );
}
