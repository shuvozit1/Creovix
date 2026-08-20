# Creovix Website — Publishing Guide

## What's inside
- `index.html`, `css/`, `js/` — the public website
- `data/` — your content (portfolio, pricing, articles, settings) as JSON files
- `admin/` — the Admin Panel (Decap CMS)
- `images/portfolio/` — replace the placeholder images with your real designs

## Part 1 — Put this on GitHub
1. Go to https://github.com and create a free account if you don't have one.
2. Click **New repository**. Name it `creovix-site` (or anything you like). Keep it **Public**. Create it.
3. On the new repo page, click **uploading an existing file**, then drag in ALL the files/folders from this project (keep the folder structure exactly as-is).
4. Commit the files (green **Commit changes** button).
5. Go to **Settings → Pages** in your repo. Under "Build and deployment", choose **Deploy from a branch**, branch = `main`, folder = `/ (root)`. Save.
6. After 1–2 minutes your site will be live at:
   `https://YOUR-GITHUB-USERNAME.github.io/creovix-site/`

## Part 2 — Turn on the Admin Panel login
The Admin Panel needs a login system (GitHub OAuth). GitHub Pages can't provide this by itself, so we use Netlify **only** for the free login step — your website itself stays on GitHub Pages.

1. Go to https://app.netlify.com and sign up free (you can sign up with your GitHub account).
2. Click **Add new site → Import an existing project**, and pick the same `creovix-site` GitHub repo.
3. Deploy settings can stay default — just click **Deploy**. (You won't actually use this Netlify site for hosting; it only exists to power the login.)
4. Once deployed, go to **Site settings → Access & security → OAuth** (in some Netlify versions this is under "Site settings → General → Identity" — search "OAuth" if the menu differs) and enable the **GitHub** provider by connecting a GitHub OAuth App:
   - In GitHub: **Settings → Developer settings → OAuth Apps → New OAuth App**
   - Homepage URL: your Netlify site URL
   - Authorization callback URL: `https://api.netlify.com/auth/done`
   - Copy the generated **Client ID** and **Client Secret** into Netlify's GitHub OAuth field.
5. Open `admin/config.yml` in your repo and change this line to your real GitHub username and repo name:
   ```
   repo: YOUR-GITHUB-USERNAME/creovix-site
   ```
   Commit the change.

## Part 3 — Log in and edit your site
1. Visit `https://YOUR-GITHUB-USERNAME.github.io/creovix-site/admin/`
2. Click **Login with GitHub**, authorize the app.
3. You'll see the Admin Panel with 4 sections:
   - **Portfolio** — add/remove logo & poster designs, upload images directly
   - **Pricing** — edit your packages and prices
   - **Design Tips (Articles)** — write new blog posts
   - **Site Settings** — change your tagline, about text, email, phone, WhatsApp link
4. Click **Publish** after any change — it updates your live site within a minute or two.

## Notes
- Replace the images in `images/portfolio/` (or upload new ones through the Admin Panel — they'll be saved into that same folder automatically).
- Your contact info is already set: shuvozit1234@gmail.com / 01308951671
- If Part 2 feels confusing, you can skip it for now — the website works perfectly without the Admin Panel. You can also just ask me to walk through any single step in more detail, or to make the content edits directly by editing these files myself, whenever you need a change.
