# The TPI website guide

Everything you change on this site is plain text. You do not need to know how to
code. This guide assumes you know nothing about it and walks through each job
step by step.

If you only read one thing, read this:

> **One file makes one thing. The `category:` line inside it decides where it
> appears on the site. There is never a second place to edit.**

No list to add yourself to, no menu to update, no index to maintain. Write the
file, commit, push. The site rebuilds itself in about a minute.

---

# Part 1. How the site works

## The eight pages

| File | Page |
|---|---|
| `index.html` | Homepage |
| `about.html` | About |
| `people.html` | People |
| `research.html` | Research Hubs |
| `publications.html` | Publications |
| `interviews.html` | Interviews |
| `news.html` | News and Policy |
| `courses.html` | Courses |

Each research hub also has its own page, built automatically from
`_data/hubs.json`. You do not edit those pages directly.

## Where files live

| Folder | What goes in it |
|---|---|
| `articles/` | Every news item, event, publication, and interview. One `.md` file each |
| `people/` | Profiles. One `.md` file each |
| `newsletters/` | One `.md` file per issue, named `YYYY-MM.md` |
| `files/` | PDFs, and nothing else |
| `pictures/news/` | Article and event photos |
| `pictures/publications/` | Report and brief covers |
| `pictures/people/` | Headshots |
| `pictures/home/` | Homepage imagery |
| `pictures/logos/` | Brand marks |
| `_data/hubs.json` | The six research hub descriptions |

**`.md` files always go in `articles/`.** `files/` is for PDFs only. Getting
these two mixed up is the single most common mistake, and the symptom is that
nothing appears on the site and no error is shown.

## What a `.md` file looks like

Every file has two parts. The bit between the `---` fences is called the front
matter, and it is a list of labels. Everything below the closing `---` is the
text of the page.

    ---
    title: "The headline"
    date: 2026-09-14
    category: News
    summary: One or two sentences shown in lists.
    ---

    The article text goes here.

    Blank line between paragraphs.

## The categories

The `category:` line is the only thing that decides where an item appears.

| `category:` | Appears on |
|---|---|
| `News` | news.html, under News |
| `Policy analysis` | news.html, under News |
| `Event` | news.html, under Events |
| `Interview` | interviews.html |
| `Report` | publications.html |
| `Op-ed` | publications.html |
| `Policy brief` | publications.html |
| `Policy infographic` | publications.html |

Capital letters matter. `report` will not work, `Report` will.

---

# Part 2. The routine

Do this every time, for every job in Part 3.

1. Open the repository folder on your Mac like any normal folder.
2. Add or edit the files you need. Save them.
3. Open **GitHub Desktop**.
4. Look at the list of changed files on the left. **Check that every file you
   expect is there and ticked.** Slow down for this step. Nearly every problem
   this site has had was a file that was written but never committed.
5. Type a short summary in the box at the bottom left, for example
   "Add quantum supply chains report".
6. Click **Commit to main**.
7. Click **Push origin** at the top.
8. Wait about a minute, then open the repository on github.com and click the
   **Actions** tab.
   - **Green tick** means it is live. Go and look at the site.
   - **Red cross** means a check caught a problem. Click into it, scroll to the
     bottom of the log, and it will name the file and the fix. The live site
     keeps showing the previous version until you sort it, so nothing is broken
     for visitors in the meantime.

---

# Part 3. Step by step

## Publishing a news item

**1.** Create a new file in `articles/`. Name it lowercase with dashes, ending
in `.md`, for example `articles/quantum-funding-award.md`.

**2.** Paste this in and edit it.

    ---
    title: "Institute wins funding for quantum security research"
    date: 2026-09-14
    category: News
    author: "Fiona Neibart"
    summary: One or two sentences. This is what shows in the news list.
    hubs: ["critical-infrastructure"]
    ---

    Write the item here. Leave a blank line between paragraphs.

    ## A subheading if you want one

    More text, and a [link like this](https://example.com).

**3.** Follow the routine in Part 2.

`author` and `hubs` can be left out. Use `Policy analysis` instead of `News` for
an argued piece rather than an announcement.

---

## Publishing an event

Exactly the same as a news item, with `category: Event`. It then appears under
the Events filter on the news page.

    ---
    title: "Institute hosts panel on quantum and national security"
    date: 2026-09-20
    category: Event
    summary: What happened and who spoke.
    hubs: ["critical-infrastructure"]
    ---

Write events in the past tense after they have happened. The site is a record of
what the institute has done, not a calendar of what is coming.

---

## Publishing a publication

A publication is **three files**. The PDF, the page that presents it, and a short
news item announcing it.

**1. The PDF.** Put it in `files/`, named lowercase with dashes.

    files/quantum-supply-chains.pdf

Keep it under about 25 MB. If Canva gives you something enormous, say so and it
can be compressed. The 2024-25 annual report came out at 36 MB and compressed to
7 MB with no visible loss.

**2. The publication page.** Create `articles/quantum-supply-chains.md`.

    ---
    title: "Quantum Supply Chains: Securing the Next Frontier"
    date: 2026-09-14
    category: Report
    author: "Jane Doe and John Smith"
    summary: One or two sentences for the publications list.
    image: /pictures/publications/quantum-supply-chains.jpg
    imageAlt: Cover of the report
    pdf: /files/quantum-supply-chains.pdf
    pdfPages: 24
    pdfSize: 3.1 MB
    hubs: ["critical-infrastructure"]
    ---

    Roughly 80 to 120 words. What the report argues and who it is for.

**Do not paste the whole report here.** The PDF is the document, and it is
embedded on the page directly below this text. Every publication on the site sits
between 54 and 146 words.

**3. The announcement.** Create `articles/new-report-quantum-supply-chains.md`.

    ---
    title: "New report on securing quantum supply chains"
    date: 2026-09-14
    category: News
    summary: A sentence for the news feed.
    hubs: ["critical-infrastructure"]
    ---

    About 150 words on what it says and why it matters now.

    [Read the full report]({{ "/articles/quantum-supply-chains.html" | url }})

Without that third file the publication only appears on the publications page and
never in the news.

**4.** Follow the routine in Part 2.

---

## Publishing an interview

Two files.

**1. The transcript.** Create `articles/interview-jane-doe.md`.

    ---
    title: "Interview with Jane Doe"
    date: 2026-09-14
    category: Interview
    interviewer: "Basim Ali"
    summary: Who she is and what the conversation covers.
    hubs: ["critical-infrastructure"]
    ---

    A short intro paragraph.

    **Basim:** The first question.

    **Jane Doe:** Her answer.

Put each speaker's name in bold with the colon **inside** the asterisks, exactly
as shown. That is what makes a long transcript readable.

**2. The feed entry.** Create `articles/new-interview-jane-doe.md`.

    ---
    title: "In conversation with Jane Doe"
    date: 2026-09-14
    category: News
    interviewLink: "/articles/interview-jane-doe.html"
    summary: Basim Ali sat down with Jane Doe, a such and such, to discuss whatever.
    permalink: false
    ---

Nothing goes below the closing `---` on that second file. `interviewLink` puts it
in the Interviews filter on the news page and sends the click straight to the
transcript. `permalink: false` stops a near-empty page being created for it.

If it is easier to write interviews in Word, that works too. They can be
converted in bulk.

---

## Linking to coverage someone else wrote

Cornell Chronicle articles and similar are not ours to republish. They get a row
in the news feed that links out, and no page of their own.

    ---
    title: "Cornell team wins quantum research award"
    date: 2026-09-14
    category: News
    summary: One sentence describing the coverage.
    externalUrl: https://news.cornell.edu/stories/2026/09/example
    sourceName: Cornell Chronicle
    permalink: false
    ---

Nothing below the closing `---`. The row shows "News · Cornell Chronicle" so a
reader knows they are leaving before they click.

---

## Adding an image

Most items currently show a grey labelled box instead of a photo. That is
deliberate rather than broken. Replacing one is two lines.

**1.** Put the image in the right folder, named lowercase with dashes.

    pictures/news/          article and event photos
    pictures/publications/  report and brief covers
    pictures/people/        headshots

Match the article's filename where you can. For
`articles/newmark-cyber-test-range.md` use
`pictures/news/newmark-cyber-test-range.jpg`.

**2.** Add two lines inside the article's front matter.

    image: /pictures/news/newmark-cyber-test-range.jpg
    imageAlt: Researchers at the Cyber Test Range examining hardware

The placeholder disappears and the photo appears everywhere that item shows up.

**Things worth knowing.**

The leading slash matters. `/pictures/news/photo.jpg`, not
`pictures/news/photo.jpg`. Without it the image breaks on the live site while
looking fine on your own machine.

`imageAlt` is what a screen reader announces. Describe what is in the photo, not
the article title. "Paul Lushenko speaking to congressional staffers" rather than
"Arctic security simulation". Leave out "photo of", it is implied.

JPG for photographs, PNG for anything with text or flat colour. Around 1200px on
the long edge and under about 500 KB.

Thumbnails are square and article headers are wide, both cropped from the centre,
so keep the subject centred rather than at an edge.

There is no rush. A neutral box looks considered. A stretched or irrelevant stock
photo looks worse than no photo. Start with whatever sits on the first page of
the news feed.

---

## Adding a person

**1.** Put the headshot in `pictures/people/`, named after the person.

    pictures/people/jane-doe.jpg

**2.** Create `people/jane-doe.md`.

    ---
    name: "Dr. Jane Doe"
    role: "Senior Fellow"
    group: "Senior Fellows"
    order: 12
    photo: /pictures/people/jane-doe.jpg
    ---

    A paragraph or two of biography.

`group` must be exactly one of these six:

    Leadership
    Staff
    Senior Fellows
    Fellows
    Junior Fellows
    Alumni

`order` sets the position within that group. Lower numbers come first. Look at
the neighbouring profiles and pick a number that slots in.

The filename becomes their web address, so `jane-doe.md` can be linked to as
`people.html#jane-doe`. Names written in newsletters link to profiles
automatically, so spelling the filename sensibly matters.

---

## Adding a newsletter issue

**1.** Create `newsletters/2026-09.md`, named for the year and month.

    ---
    title: September 2026
    date: 2026-09-28
    intro: An overview of the team's updates and accomplishments in September.

    sections:
      - heading: Feature
        items:
          - title: The headline of the item
            text: >-
              The paragraph. Keep it indented like this. The >- means the text
              can wrap across several lines and will be joined back together.
            link: https://example.com
            linkLabel: Read more

      - heading: Community updates
        updates:
          - Dr. Jane Doe spoke at the Aspen Security Forum.
          - Basim Ali published in Foreign Affairs.
    ---

Sections are optional, so a month with no events simply leaves that block out. A
section uses either `items` or `updates`, never both.

Names in `updates` link to profiles automatically. Write the name naturally and
the link appears if that person has a profile.

**2.** The archive grid on the news page updates by itself.

---

## Tagging to research hubs

### Articles

Add a `hubs:` line. An item can belong to more than one hub.

    hubs: ["drones", "geopolitics"]

Leave it out entirely for anything institution-wide, like an annual report or a
staff announcement.

### People

Add one or two lines to their profile.

    hubs: ["drones", "critical-infrastructure"]
    hubLead: ["drones"]

They appear in the team strip on each hub listed in `hubs`. On any hub listed in
`hubLead` they appear first and are labelled **Hub Lead** instead of their usual
role. A lead must also be listed in `hubs`.

Order is automatic. Leads first, then everyone else by seniority using the same
order as the People page. Once a hub passes five people the strip becomes a
horizontal slider on its own.

### The six hub names

    critical-infrastructure
    drones
    ai-governance
    cryptocurrencies
    geopolitics
    space

Spelling must match exactly.

---

# Part 4. When something goes wrong

A failed build is the system working. It means the mistake never reached the live
site. Open the **Actions** tab, click the red cross, and scroll to the bottom of
the log. Each of these names the file and the fix.

## "bad indentation of a mapping entry"

A colon in a title that is not wrapped in quotes. This is the most common one.

    title: Quantum: The Next Frontier      ← breaks
    title: "Quantum: The Next Frontier"    ← correct

Quoting a title that does not need it is harmless, so quote them all if that is
easier to remember.

## "category: X is not valid"

Check the spelling and the capital letters against the table in Part 1.

## "is not a hub"

A misspelled hub name. The message lists the six valid ones.

## "Missing files referenced by content"

An `image:` or `pdf:` path pointing at a file that is not there. Usually a typo,
or the file was not committed. The message gives the exact path it looked for.

## "link(s) point at a page or file that does not exist"

Usually a `.md` file that was written but never committed. Check the file list in
GitHub Desktop.

## "has hubLead but no hubs line"

A person set as a hub lead but not listed as a member of that hub.

## The build is green but nothing appeared

Almost always a `.md` file that ended up in `files/` instead of `articles/`.
Nothing looks at `files/` for pages, so no error is raised. Move it across.

## The build is green but a link goes to the wrong place

Check the leading slash on the path. `/articles/thing.html`, not
`articles/thing.html`.

---

# Part 5. Reference

## Every label you can use in an article

| Label | What it does |
|---|---|
| `title` | The headline. Quote it if it contains a colon |
| `date` | `YYYY-MM-DD`. Sets its position in the list |
| `category` | Decides which page it appears on |
| `summary` | One or two sentences shown in lists |
| `author` | Optional byline |
| `image` | Path to the photo, starting with a slash |
| `imageAlt` | Description of the photo for screen readers |
| `pdf` | Path to the PDF, starting with a slash |
| `pdfPages` | Page count, shown next to the download |
| `pdfSize` | For example `3.1 MB` |
| `hubs` | Which research hubs it belongs to |
| `interviewer` | Who conducted the interview |
| `interviewLink` | Points a feed entry at a transcript |
| `externalUrl` | Makes the row link out to someone else's site |
| `sourceName` | For example `Cornell Chronicle` |
| `permalink: false` | Stops a page being generated |
| `dateApprox: true` | Marks a date as month-accurate only |
| `pullQuote` | A large pulled quotation |
| `pullQuoteBy` | Who said it |

## Files you should not need to touch

    _includes/base.njk    the header and footer
    hub.njk               the research hub page template
    styles.css            all colours, fonts, and layout
    script.js             the menu and search
    check-links.mjs       the checks that catch mistakes
    eleventy.config.js    build settings

To change a menu item, edit the `navGroups` list near the top of `script.js`.
That is the only place the menu exists.

To change a research hub's description, edit `_data/hubs.json`. That is the only
place hub text exists.

## Previewing before you publish

If you have Node installed, open the project folder in Terminal and run:

    npm start

Open the address it prints. The page reloads as you save, so you can see an
article before anyone else does.

To run every check without previewing:

    npm run build

That prints any problem and publishes nothing.

## Large files

Keep PDFs under about 25 MB. GitHub refuses anything over 100 MB. For anything
larger, upload it to Cornell Box and link to it instead.
