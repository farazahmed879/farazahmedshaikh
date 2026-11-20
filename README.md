# Faraz Ahmed Shaikh — Portfolio

Personal portfolio built with **Next.js 16 (App Router)**, **Tailwind CSS 4**, **Framer Motion** and **MongoDB**, with a built-in **admin panel** for editing all content without touching code.

## Features

- Animated single-page site: hero with typewriter roles, about + count-up stats, scroll-drawn experience timeline, filterable 3D-tilt project cards, tabbed skill bars + marquee, live GitHub repos, contact form.
- Admin panel at `/admin`: edit profile/hero/about/contact, social links, section visibility, SEO, experience, projects, skills (drag-to-reorder), upload images & resume, read contact-form messages.
- Content lives in MongoDB. On first connection to an empty database the site seeds itself with the default content in [`src/lib/defaults.ts`](src/lib/defaults.ts).
- Pages are statically generated and refreshed automatically whenever you save in the admin panel.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000  ·  admin: http://localhost:3000/admin
```

### Admin login

On first run an admin account is created in MongoDB with username **`admin`** and password **`admin`**. Sign in at `/admin` and change it right away under **Account & password** — the panel shows a warning until you do. Changing the login signs out all other sessions.

### Environment variables

| Variable | Purpose |
| --- | --- |
| `MONGODB_URI` | MongoDB connection string (e.g. Atlas) |
| `AUTH_SECRET` | Random string (32+ chars) used to sign the session cookie |
| `NEXT_PUBLIC_SITE_URL` | Public URL of the site, used for SEO metadata |
| `GITHUB_TOKEN` *(optional)* | Raises the GitHub API rate limit for the repos section |

## Project structure

```
src/
  app/
    page.tsx                 public site
    admin/login              admin sign-in
    admin/(panel)/…          dashboard, profile, experience, projects, skills, messages
    api/                     contact form, media, auth, admin CRUD
  components/site/           public UI sections
  components/admin/          admin UI (forms, collection manager, sidebar)
  lib/                       db connection, models, auth, content loading, defaults
public/images/               bundled images
```

## Deployment

Deploy to **Vercel** (recommended): import the repo, add the environment variables above, deploy. In MongoDB Atlas → Network Access, allow connections from Vercel (e.g. `0.0.0.0/0`).

Uploaded images are stored in MongoDB (max 4 MB each) and served from `/api/media/:id`.
