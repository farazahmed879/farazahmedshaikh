"use client";

import CollectionManager from "@/components/admin/CollectionManager";

export default function ProjectsAdmin() {
  return (
    <CollectionManager
      collection="projects"
      title="Projects"
      singular="Project"
      description="Showcase work. The first featured project is shown as a wide card."
      primary="name"
      secondary={(x) => [x.featured ? "★ Featured" : "", x.subtitle].filter(Boolean).join(" · ")}
      image="image"
      empty={{ name: "", subtitle: "", description: "", image: "", link: "", repo: "", tags: [], featured: false }}
      fields={[
        { name: "name", label: "Project name", type: "text" },
        { name: "subtitle", label: "Short subtitle", type: "text", placeholder: "Cricket scoring web app" },
        { name: "description", label: "Description", type: "textarea", rows: 4 },
        { name: "image", label: "Cover image / logo", type: "image" },
        { name: "link", label: "Live URL", type: "url", placeholder: "https://…" },
        { name: "repo", label: "Source code URL", type: "url", placeholder: "https://github.com/…" },
        { name: "tags", label: "Tech tags", type: "tags", help: "Tags used by 2+ projects become filter buttons." },
        { name: "featured", label: "Featured project", type: "boolean" },
      ]}
    />
  );
}
