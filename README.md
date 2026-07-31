# webapp

The `shoots` marketing site and documentation portal — Next.js 16 (App Router,
Turbopack) + Tailwind CSS 4.

## Content is not authored here

The documentation rendered by this site **is** the shoots repository
documentation. It is authored in [stefanopascazi/shoots](https://github.com/stefanopascazi/shoots)
and mirrored here by that repo's `sync-webapp` workflow
(`scripts/sync-webapp-content.mjs`):

| Source, in `shoots` | Destination, here |
| --- | --- |
| `docs/**/*.md` | `content/docs/` |
| `assets/` (PNG captures, logo) | `public/assets/` |
| `package.json` version | `content/meta.json` |

**Never edit `content/` or `public/assets/` by hand** — change the markdown in
`shoots/docs/` instead. The next push to `main` there rewrites them, and the
resulting commit here is what triggers the Vercel deployment. Editing them
locally only means the next sync reverts it.

The two repositories are separate because Vercel could not reliably build the
site from a subdirectory of the monorepo. The workflow is what restores the
single source of truth that arrangement had.

## Deploying

Vercel, standard Next.js project: Root Directory empty (the repository root *is*
the app), Build Command and Output Directory on their defaults. There is no
`vercel.json` and no ignore command — the site redeploys on every push, and
pushes only happen when the site's own sources or the mirrored content change.

Every markdown file under `content/docs/` must also appear in `lib/docs/nav.ts`;
the docs layout asserts this and fails the build otherwise, so a new page can
never end up unreachable. Adding a page in `shoots/docs/` therefore requires the
matching `nav.ts` entry here, or the first deployment after the sync fails.

## Commands

```sh
npm run dev         # next dev
npm run build       # next build
npm run typecheck   # tsc --noEmit
```

## Layout

```
app/
  page.tsx                    landing page
  docs/[...slug]/page.tsx     one static route per markdown file
  search-index.json/route.ts  static search corpus, fetched by ⌘K
components/
  home/      landing-page sections
  docs/      sidebar, table of contents, pager
  layout/    header, footer
  search/    ⌘K dialog and its provider
  ui/        shared primitives
lib/
  docs/      markdown pipeline, nav config, link rewriting
  search.ts  ranking used by the ⌘K dialog
```

Markdown is rendered at build time with unified (remark/rehype) and highlighted
by Shiki, so no markdown or highlighting code ships to the browser.
