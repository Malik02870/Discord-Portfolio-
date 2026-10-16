# VOLTERRA — static portfolio

A complete dependency-free website using HTML5, CSS3, and vanilla JavaScript. No installation, build step, API, account, or database is required.

## Files
- `index.html`: page content, sections, SEO metadata, and contact links.
- `style.css`: semantic colors, typography, desktop/mobile layouts, and reduced-motion behavior.
- `script.js`: mobile navigation, project gallery data, keyboard navigation, accessible image lightbox, and copyright year.
- `assets/`: 26 optimized genuine project screenshots, generated VOLTERRA hero artwork, and a replaceable favicon.

## Preview
Open `index.html` in a browser. For a local web preview, run `python3 -m http.server 8000` in this folder and visit http://localhost:8000. JavaScript enables the mobile menu and gallery; all page sections and contact links remain available without it.

## Edit
Edit page copy in `index.html`. Change design tokens at the top of `style.css`. Update project image groupings in the `projects` array at the top of `script.js`; the visible portfolio cards are edited separately in `index.html`. Keep the image filenames and relative paths consistent. Replace `assets/favicon.ico` to use your final icon.

Every Discord contact link uses https://discord.gg/ubvSjDJTKx with `target="_blank"` and `rel="noopener noreferrer"`. To change the invite later, update every occurrence in `index.html`.

Both packages show Custom Quote. Features are starting points; confirm final scope with clients. Existing third-party bots are configured, not presented as VOLTERRA-authored bots. No client reviews were supplied, so the reviews area is an honest placeholder. The owner confirmed the screenshots are their work; descriptions cover visible server configuration rather than unverified performance metrics. All 26 screenshots are included unchanged in content, with WebP compression. Screenshot usernames are present in the originals; review publication permissions before publishing. Hero artwork is brand artwork, not a project screenshot.

Optional Google Fonts are loaded online with local font fallbacks. Images, styles, JavaScript, and favicon use local relative paths. No tracking is included.

## Publish on GitHub Pages (free)
1. Create a GitHub repository.
2. Upload the CONTENTS of this folder so `index.html`, `style.css`, `script.js`, and `assets/` are in the repository root.
3. Open repository Settings → Pages.
4. Under Build and deployment, select Deploy from a branch.
5. Select your main branch and / (root), then Save.
6. GitHub displays your site URL once deployment finishes. Keep all filenames and image paths intact.
7. For updates, edit or upload the changed files and wait for GitHub Pages to finish deployment.

Once your real domain is known, optionally add a self-referencing canonical link and og:url in `index.html`. No placeholder domain or share image URL is included. GitHub Pages hosts these static files directly; no paid plan is required for a public repository.
