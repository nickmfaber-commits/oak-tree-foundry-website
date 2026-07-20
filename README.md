# Oak Tree Foundry — Website

Static marketing site for **Oak Tree Foundry** (the public-facing DBA of Oaktree Advisors LLC).
No framework, no build step — just HTML, CSS, and a little JS. That keeps it fast, easy to edit
in Cursor, and trivial for Cloudflare Pages to deploy.

## Files

```
index.html      → the page (all content lives here)
styles.css      → all styling + brand tokens (top of file)
script.js       → nav scroll state, scroll reveals, altitude-line draw
assets/         → mark.png, mark-paper.png (dark bg), favicon.png
brand/          → original logo master (source of truth, not loaded by the site)
robots.txt      → allow all crawlers
```

Brand tokens (edit once, apply everywhere) live in `:root` at the top of `styles.css`:
navy `#11202E` · burnt orange `#C75D2C` · warm paper `#FAF9F5`. Type is Space Grotesk +
Space Mono, loaded from Google Fonts in `index.html`.

## The workflow

```
Cursor (edit)  →  git push to GitHub  →  Cloudflare Pages auto-deploys  →  live
```

### 1. One-time setup

**a. Open in Cursor.** File → Open Folder → this folder. Preview locally by opening
`index.html` in a browser, or run a tiny static server:

```bash
python3 -m http.server 8080
# then visit http://localhost:8080
```

**b. Put it on GitHub.** In Cursor's terminal:

```bash
git init
git add .
git commit -m "Initial Oak Tree Foundry site"
git branch -M main
# create an empty repo on github.com first (e.g. oaktree-foundry-site), then:
git remote add origin https://github.com/<your-username>/oaktree-foundry-site.git
git push -u origin main
```

**c. Connect Cloudflare Pages.**
1. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Authorize GitHub and pick the repo.
3. Build settings — this is a plain static site, so:
   - **Framework preset:** `None`
   - **Build command:** *(leave empty)*
   - **Build output directory:** `/`
4. **Save and Deploy.** First build takes ~1 minute; you get a `*.pages.dev` URL.

### 2. Every change after that

```bash
# edit in Cursor, then:
git add .
git commit -m "describe the change"
git push
```

Cloudflare Pages sees the push and redeploys automatically — usually live in under a minute.
Pull requests get their own preview URL if you'd rather review before it goes to production.

### 3. Custom domain (when ready)

Cloudflare Pages project → **Custom domains** → add e.g. `oaktreefoundry.com`. If the domain
is registered at Cloudflare, DNS is set for you; otherwise point a CNAME at the `pages.dev`
target. HTTPS is automatic.

## Editing the content

Everything reads top-to-bottom in `index.html` in the same order it appears on the page:
Nav → Hero → Operator strip → The problem → Philosophy → Statement band → Proof → The Ladder →
AI positioning → Selected work → Operator (founder) → Why us → FAQ → Assessment (CTA) → Footer.
Change copy directly in the markup. The contact address (`nick@oaktreefoundry.com`) appears
in the Start section — swap it wherever you land on a real inbox.

## Notes

- Fonts load from Google Fonts. If you ever want zero external requests, self-host the two
  font families in `assets/fonts/` and swap the `<link>` for a local `@font-face` block.
- The legal entity stays **Oaktree Advisors LLC** on all paper; the site carries the
  **Oak Tree Foundry** brand with the entity line in the footer.
