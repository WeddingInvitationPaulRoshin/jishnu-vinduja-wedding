# Jishnu & Vinduja — Wedding Reception Invitation

A pastel, architectural-aesthetic digital invitation. Plain entry screen, tap to reveal the full invitation with the couple's photo, event details, and softly falling petals & leaves.

**Reception:** Monday, 1 June 2026 · 6:00 PM – 9:00 PM
**Venue:** River Banks, Madaparambil Resorts, Thodupuzha, Idukki

---

## Files

```
.
├── index.html          # The invitation page
├── style.css           # All styling
├── script.js           # Open animation + falling petals
└── assets/
    ├── couple.jpg      # Couple photo (used inside the card)
    ├── preview.jpg     # 1200×630 preview shown when shared on WhatsApp / social
    └── music.mp3       # Background music (you upload this — exact filename matters)
```

### About the music

- The page expects a file at `assets/music.mp3`. Upload your chosen track with **exactly** that filename and path.
- It starts playing automatically the moment a guest taps "Tap to Open" (this tap counts as user permission, so it works on mobile too).
- It fades in gently to ~55% volume and loops.
- A small speaker button appears at the bottom-left — guests can tap it to mute / unmute anytime.
- If a browser still blocks autoplay (rare, mostly older iOS), the button shows as muted and guests can tap it once to start the music.

**Tips for the file:** Keep it under ~3 MB so it loads fast on mobile data. MP3 at 96–128 kbps is plenty for ambient music. Free editing: https://mp3cut.net to trim a song, or https://online-audio-converter.com to compress.

---

## Deploy to GitHub Pages (free hosting for sharing)

1. **Create a GitHub account** if you don't have one: https://github.com/signup

2. **Create a new repository.**
   - Click the **+** at the top right → **New repository**
   - Repository name suggestion: `jishnu-vinduja-wedding` (short, no underscores or spaces — appears in the URL)
   - Set it to **Public**
   - Click **Create repository**

3. **Upload these files.**
   - On the empty repo page click **uploading an existing file**
   - Drag in **all of these**: `index.html`, `style.css`, `script.js`, **and the entire `assets` folder** (keep the folder structure)
   - Scroll down → **Commit changes**

4. **Turn on GitHub Pages.**
   - Click **Settings** (top tab of the repo)
   - In the left sidebar → **Pages**
   - Under **Source**, pick **Deploy from a branch**
   - Branch: `main`, folder: `/ (root)` → **Save**
   - Wait ~1 minute. Refresh the Pages settings page. You'll see:
     > Your site is live at `https://YOUR-USERNAME.github.io/jishnu-vinduja-wedding/`

That URL is your invitation link.

---

## Sharing on WhatsApp (with hidden / pretty link)

Pasting the GitHub Pages link directly works — WhatsApp will automatically pull the preview image (`preview.jpg`) along with the names, date, and venue. The couple's photo only appears *after* the recipient taps the invitation, keeping it a small surprise.

### Make the link shorter or hide it

GitHub Pages URLs look like `https://username.github.io/jishnu-vinduja-wedding/` which is fine, but if you want it **shorter** or **branded**, use a URL shortener:

| Service | What you get | Notes |
|---|---|---|
| **bitly.com** | `bit.ly/jishnu-vinduja` | Free, custom slug |
| **tinyurl.com** | `tinyurl.com/jishnu-vinduja` | Free, custom alias |
| **short.io** | `your-domain.short.gy/wedding` | Free tier, more control |

Steps to use a shortener (Bitly example):
1. Go to https://bitly.com → sign up free
2. Click **Create new** → paste your GitHub Pages URL
3. Click **Customize back-half** → type `jishnu-vinduja` (or any name available)
4. Copy and share that short URL.

### Hide the link inside text (the "preview card" trick)

When you paste **just the URL** into WhatsApp, it auto-generates a rich preview card showing:
- The preview image (couple photo + names + date)
- "Jishnu & Vinduja · Wedding Reception"
- "Monday, 1 June 2026 · River Banks, Madaparambil Resorts..."

That's already the most invitation-like format. If you want to also hide the raw URL **inside a message**, you can paste it after a line break or after a few invisible characters, and WhatsApp will still show the preview while the URL sits at the bottom:

```
✦ Reception Invitation ✦

Jishnu & Vinduja warmly invite you to celebrate
our wedding reception on
Monday, 1 June 2026 · 6 PM onwards
River Banks, Madaparambil Resorts, Thodupuzha

Tap the preview below to open ↓

https://YOUR-LINK-HERE
```

You can also share it as a **WhatsApp Status / Story** or post just the preview image with the link in the caption.

---

## Editing later

Just open the relevant file on GitHub (or re-upload from your computer). Changes go live automatically within a minute or two.

Common edits:
- **Change date / venue text:** edit `index.html` (look for `event-details` section)
- **Change the couple photo:** replace `assets/couple.jpg` (and re-generate `preview.jpg` if you like)
- **Change colors:** edit the `:root` block at the top of `style.css`
- **Change petal density:** in `script.js`, edit `initialCount` and `intervalMs` inside `startPetals()`

---

## Local preview (optional)

To preview before pushing:

```bash
cd jishnu-vinduja-wedding
python3 -m http.server 8000
```

Then open `http://localhost:8000/` in your browser.

---

Made with care for Jishnu & Vinduja 💛
