# Obaatanpa Foundation — website with content manager

Wassa Akropong, Amenfi East Municipality, Western Region, Ghana.

This version replaces hand-edited HTML with an editing panel at
**obaatanpafoundation.org/admin** — forms with photo upload, on your phone.

---

## Part 1 — Putting it live (about 15 minutes, once)

### Step 1. Replace the files in GitHub

Your repo currently holds the old hand-built site. Every file is replaced.

**Easiest, on a laptop:** delete all files in the repo, then upload the contents
of this folder — including the `src` folder, which must stay a folder this time.

**On a phone,** folders can't be uploaded, so use GitHub's **Add file → Create
new file** and type the full path (e.g. `src/index.njk`) for each one. That is
slow. If you can reach a laptop for ten minutes, use it for this step only.

The finished repo should look like this:

```
.eleventy.js      package.json      netlify.toml     .gitignore
src/
  index.njk  about.njk  leadership.njk  events.njk  news.njk
  donate.njk  contact.njk  privacy.njk  safeguarding.njk
  404.njk  sitemap.njk  robots.txt  styles.css  site.js
  _data/       site.json  home.json
  _includes/   base.njk  post.njk
  news/        eggs.md  orientation.md  news.json
  events/      example-event.md  events.json
  executives/  angela-ahimah.md  example-officer.md  executives.json
  admin/       index.html  config.yml
  images/      .gitkeep
```

### Step 2. Change the Netlify build settings

**app.netlify.com → your site → Site configuration → Build & deploy → Build settings**

| Setting | Old value | New value |
|---|---|---|
| Build command | *(empty)* | `npm run build` |
| Publish directory | `.` | `_site` |

This is the step that makes or breaks the deploy. If the site comes back blank
or 404, this is the first thing to check.

### Step 3. Sign in to the content manager

Go to **obaatanpafoundation.org/admin**

Sveltia CMS offers a few sign-in methods. Try in this order:

**A. Personal access token (simplest, one person).** Choose the token option.
On GitHub: **Settings → Developer settings → Personal access tokens → Fine-grained
tokens → Generate new token.** Give it access to only the
`Obaatanpafoundation` repository, with **Contents: Read and write**. Copy the
token and paste it into the CMS. Treat it like a password.

**B. GitHub sign-in.** If offered and it works, use it — nothing to configure.

**C. If you add other editors later,** the tidy option is a free Cloudflare
Worker that handles sign-in for everyone:
https://github.com/sveltia/sveltia-cms-auth

---

## Part 2 — Using it

Everything below happens at **/admin**, on any device. Press **Save** (or
Publish) and the site rebuilds itself in about a minute.

### News stories
Headline, date, category, summary line, cover photo, the story itself, extra
photos, and a video. Photos upload from your camera roll and are shrunk
automatically before saving.

To add a video: on YouTube tap **Share → Embed** and copy the whole `<iframe>`;
on Facebook open the video, tap **...** → **Embed**. Paste it in the video box.

### Events
Same idea, plus a **Still to come?** switch. Leave it on and the event shows
under Upcoming, on the events page and the homepage. Turn it off after the day
and it moves down to Recently, where you can add the photographs.

### Leadership
One entry per person: name, role, photo, description. **Order** decides who
appears first. **Show as the large card** gives one person the big panel at the
top — currently Madam Ahimah.

### Site settings → Contact details
Email, phone, address, all three MoMo numbers, bank details, social links, and
the four homepage numbers. Change once here and it changes on every page. This
is where the phone number placeholder gets fixed.

### Site settings → Homepage
Heading, opening paragraph, hero photo, the quotation and its photo, and the
three programme descriptions.

---

## What is not in the CMS

The About, Give, Contact, Privacy and Safeguarding pages are still edited by
hand, in `src/about.njk` and so on. They change rarely, and putting long legal
text into a CMS form makes it harder to read, not easier. The contact details
inside them come from Site settings, so those stay in sync automatically.

---

## If the first deploy fails

Likely, and fixable. **Netlify → Deploys → click the failed deploy → read the
log.** The error is usually in the last 20 lines.

- **"Page not found" on every page** — publish directory isn't `_site`
- **Site looks unstyled** — `styles.css` didn't copy; check it's at `src/styles.css`
- **Build fails on a template** — the log names the file and line
- **`/admin` is blank** — check `src/admin/config.yml` uploaded intact

Send me the last part of the log and I'll tell you what to change.

---

## Still to do

- [ ] Real phone number and MoMo numbers (Site settings → Contact details)
- [ ] Photographs, starting with the hero and Madam Ahimah's portrait
- [ ] The other executives, or delete the example person
- [ ] A real upcoming event, or delete the example event
- [ ] The four homepage numbers
- [ ] Registration status and number
- [ ] Confirm every name in the two news stories
- [ ] Privacy notice reviewed; Data Protection Commission registration
- [ ] Full safeguarding policy written and approved
- [ ] Rewrite the About page story in your own words
