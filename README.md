# Jishnu & Vinduja — Wedding Reception Invitation

A pastel, architectural digital invitation. Plain entry screen with a hand-drawn sketch, tap to reveal scrolling sections with the couple's photo, an architectural blueprint of "the beginning", a live countdown, venue details, and a closing message. Music plays softly throughout.

**Reception:** Monday, 1 June 2026 · 6:00 PM – 9:00 PM
**Venue:** River Banks, Madaparambil Resorts, Thodupuzha, Idukki

---

## 🚨 IMPORTANT: Fix your current GitHub setup

Your live site is missing images and music because the files are in the wrong place. The code expects this structure:

```
your-repo/
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/           ← This folder is missing!
    ├── couple.jpg
    ├── preview.jpg
    └── music.mp3
```

But on GitHub right now, you have `music.mp3` sitting in the root (next to `index.html`) and no `couple.jpg` / `preview.jpg` at all.

### How to fix it (easiest way — delete and re-upload)

**Step 1: Delete the broken files from GitHub**
1. Go to `https://github.com/WeddingInvitationPaulRoshin/jishnu-vinduja-wedding`
2. Click `music.mp3` → trash can icon (top right) → **Commit changes**
3. Click `index.html` → trash icon → **Commit changes**
4. Repeat for `style.css`, `script.js`, `README.md`
5. Your repo should now be empty.

**Step 2: Upload the new package**
1. On the empty repo page, click **uploading an existing file**
2. Unzip the new package on your computer
3. Open the unzipped folder. You'll see: `index.html`, `style.css`, `script.js`, `README.md`, and an `assets` folder.
4. **Select all 4 files + the `assets` folder** (Ctrl+A / Cmd+A inside the folder)
5. **Drag them all** into the GitHub upload area at once. *Wait for the `assets` folder to fully upload — it should show with 3 files inside (couple.jpg, preview.jpg, music.mp3).*
6. Scroll down → **Commit changes**

**Step 3: Wait & test**
- Wait 1–2 minutes for GitHub Pages to rebuild
- Open `https://weddinginvitationpaulroshin.github.io/jishnu-vinduja-wedding/`
- Hit Ctrl+F5 (or Cmd+Shift+R on Mac) to force-refresh
- You should now see the photo, hear music after tapping, and scroll through all sections

---

## What's in the invitation

1. **Entry screen** — Hand-drawn architectural sketch (archway + bride & groom figures) draws itself behind your names, on a soft blueprint grid.
2. **Hero section** — Couple's photo in a framed card with the title "Our Wedding Reception".
3. **Drawing No. 01** — An architectural sketch of a house with a heart, "drawn" line-by-line as you scroll into view. Marked SCALE 1:∞, DATE 01.06.2026, SHEET 01 like a real architect's drawing.
4. **Save the Date** — Big "01 June 2026" with a live countdown ticking down (Days · Hours · Mins · Secs).
5. **The Venue** — River Banks, Madaparambil Resorts with Get Directions button to Google Maps.
6. **Closing message** — "Your presence means everything to us" with signature.

Each card has architectural corner brackets for the "drafted" look. Soft pastel flowers and leaves fall in the background throughout. Background music plays from the moment a guest taps "Open" and can be muted via the speaker button. Side progress dots show which section you're on (desktop only).

---

## Files

```
.
├── index.html          # The invitation page
├── style.css           # All styling
├── script.js           # Open animation, scroll reveal, countdown, petals, music
├── README.md           # This file
└── assets/
    ├── couple.jpg      # Couple photo
    ├── preview.jpg     # 1200×630 preview for WhatsApp/social
    └── music.mp3       # Background music (compressed for mobile)
```

---

## Sharing on WhatsApp

Once the site is working, paste the URL into any chat. WhatsApp will auto-generate a preview card showing the couple's photo, names, and date.

**For a shorter link:** use bit.ly → paste your URL → customize back-half to something like `bit.ly/jishnu-vinduja`.

---

## Editing later

Just open the file on GitHub → click pencil icon → edit → Commit changes. Live in ~1 minute.

Common edits:
- **Couple photo:** replace `assets/couple.jpg`
- **Music:** replace `assets/music.mp3`
- **Colors:** edit the `:root` block at the top of `style.css`
- **Date/venue text:** edit `index.html`

---

Made with care for Jishnu & Vinduja 💛
