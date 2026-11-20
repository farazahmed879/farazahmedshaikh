"use client";

import CollectionManager from "@/components/admin/CollectionManager";

export default function SkillsAdmin() {
  return (
    <CollectionManager
      collection="skills"
      title="Skills"
      singular="Skill category"
      description="Each category becomes a tab with animated progress bars."
      primary="title"
      secondary={(x) => `${x.skills?.length ?? 0} skills`}
      empty={{ title: "", skills: [] }}
      fields={[
        { name: "title", label: "Category title", type: "text", full: true },
        { name: "skills", label: "Skills", type: "skills" },
      ]}
    />
  );
}
