# Murtuza Shaikh — Portfolio

Personal portfolio site. Single-page scroll with anchor navigation:
Hero → Research → Education → Work Experience → Projects → Achievements → Contact.

**Stack:** plain HTML, CSS and vanilla JavaScript. No framework, no build step,
no dependencies. The only external request is the Inter webfont from Google Fonts.

## Structure

```
.
├── index.html                        # all page content
├── styles.css                        # design tokens + layout (light/dark)
├── script.js                         # theme toggle, mobile nav, detail panels, scroll spy
└── assets/
    ├── murtuza.jpg                   # profile photo
    ├── fibe.png                      # Fibe logo (Work Experience)
    └── Murtuza_Shaikh_Resume.pdf     # linked by the "Download CV" buttons
```

## Local development

There is no build. Open `index.html` directly in a browser, or serve the folder
so that relative asset paths behave exactly as they will in production:

```bash
# Python (no install needed)
python -m http.server 3000

# or Node
npx serve .
```

Then visit <http://localhost:3000>.

To change content, edit `index.html` — every section is marked with a comment
banner (`<!-- ============ PROJECTS ============ -->`). Colours, spacing and
radii are CSS custom properties at the top of `styles.css`; the dark palette is
the `:root[data-theme="dark"]` block directly beneath the light one.

## Deploying to Vercel

The repo is a static site with `index.html` at the root, so it needs **no
`vercel.json` and no build configuration**.

### Via the dashboard

1. Go to <https://vercel.com/new>.
2. **Import Git Repository** → authorise GitHub if prompted → pick
   `MurtuzaShaikh26/portfolio`.
3. Leave every field at its default. Framework Preset should read
   **Other**; Build Command, Output Directory and Install Command all stay
   empty.
4. Click **Deploy**.

The production URL will be `https://portfolio-<hash>.vercel.app`, with
`https://<project-name>.vercel.app` as the stable alias — rename the project
under **Settings → General** to control that name, or add a custom domain under
**Settings → Domains**.

Every later push to `main` redeploys production automatically; pushes to other
branches get their own preview URL.

### Via the CLI

```bash
npm i -g vercel
vercel          # preview deploy
vercel --prod   # production deploy
```

## Accessibility and browser support

- Skip link, semantic landmarks, and visible focus rings throughout.
- Project detail panels are real `aria-expanded` / `aria-controls` buttons.
- Respects `prefers-color-scheme` on first visit and `prefers-reduced-motion`.
- Layout verified at 375px, 768px and 1440px.
