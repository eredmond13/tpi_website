# Publishing on the TPI website

This picks up where `EDITING-GUIDE.md` leaves off. That one still covers the
basics correctly. This one covers everything added since, and is the one to
follow for anything you publish now.

The rule that matters most, and the only one you really have to remember:

> **One file per thing, in `articles/`. The `category:` line decides where it
> appears. There is never a second place to edit.**

No index to update, no list to add yourself to, no menu to touch. Write the file,
commit, push. The site rebuilds in about a minute.

---

## The seven categories

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

Capital letters matter. Type `report` instead of `Report` and the build stops
and tells you which file and what the valid values are.

---

## Publishing a new publication

A publication is two files, because the PDF is the document and the article is
the page that presents it. Plus, usually, a third file announcing it in the news.

### Step 1. The PDF

Put it in **`files/`**, named lowercase with dashes.

    files/quantum-supply-chains.pdf

Keep it under about 25 MB. If Canva gives you something enormous, tell me and
I'll compress it. The 2024-25 annual report came out of Canva at 36 MB and
compressed to 7 MB with no visible loss.

### Step 2. The publication page

Create **`articles/quantum-supply-chains.md`**.

    ---
    title: "Quantum Supply Chains: Securing the Next Frontier"
    date: 2026-09-14
    category: Report
    author: "Jane Doe and John Smith"
    summary: One or two sentences. This shows on the publications list.
    image: /pictures/publications/quantum-supply-chains.jpg
    imageAlt: Cover of the report
    pdf: /files/quantum-supply-chains.pdf
    pdfPages: 24
    pdfSize: 3.1 MB
    hubs: ["critical-infrastructure"]
    ---

    Roughly 80 to 120 words. What the report argues and who it is for.

    Do not paste the whole report here. The PDF is the document and it is
    embedded directly below this text on the page. Every publication on the
    site sits between 54 and 146 words.

`image`, `imageAlt`, and `author` can be left out. Without an image the page
shows a neutral labelled placeholder rather than breaking.

### Step 3. The news announcement

Create **`articles/new-report-quantum-supply-chains.md`**.

    ---
    title: "New report on securing quantum supply chains"
    date: 2026-09-14
    category: News
    summary: A sentence for the news feed.
    hubs: ["critical-infrastructure"]
    ---

    About 150 words. What it says and why it matters now.

    [Read the full report]({{ "/articles/quantum-supply-chains.html" | url }})

That third file is what puts it in the news feed. Without it the publication is
only reachable from the publications page.

---

## Publishing a news item

One file. This is the simplest case.

    ---
    title: "Institute wins funding for quantum security research"
    date: 2026-09-14
    category: News
    author: "Fiona Neibart"
    summary: One or two sentences for the news list.
    image: /pictures/news/quantum.jpg
    imageAlt: Description of the photo
    hubs: ["critical-infrastructure"]
    ---

    Write the item here. Blank line between paragraphs.

    ## A subheading if you want one

    More text, and a [link like this](https://example.com).

Use `Policy analysis` instead of `News` for an argued piece rather than an
announcement.

---

## Publishing an event

Identical to a news item, with `category: Event`. It then appears under the
Events filter on the news page rather than News.

    ---
    title: "Institute hosts panel on quantum and national security"
    date: 2026-09-20
    category: Event
    summary: What happened and who spoke.
    hubs: ["critical-infrastructure"]
    ---

Write events in the past tense after they happen. The site is an archive of what
the institute has done, not a calendar of what is coming.

---

## Publishing an interview

Two files, same shape as a publication.

**`articles/interview-jane-doe.md`** holds the transcript.

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

Put the speaker's name in bold with the colon inside the asterisks, exactly as
above, and the page formats it like the existing eight.

**`articles/new-interview-jane-doe.md`** puts it in the news feed.

    ---
    title: "In conversation with Jane Doe"
    date: 2026-09-14
    category: News
    interviewLink: "/articles/interview-jane-doe.html"
    summary: Basim Ali sat down with Jane Doe, a such and such, to discuss whatever.
    permalink: false
    ---

Nothing goes below the closing `---` on that second file. `interviewLink` puts it
in the Interviews filter and sends the click straight to the transcript.
`permalink: false` stops a near-empty page being generated for it.

---

## Linking to coverage written by someone else

Cornell Chronicle pieces and similar are not ours to republish. They get a row in
the news feed that links out, and no page of their own.

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

Most items on the site currently show a grey labelled box instead of a photo.
That is deliberate rather than broken, and replacing one is two lines.

### Step 1. Put the file in the right folder

    pictures/news/          article and event photos
    pictures/publications/  report and brief covers
    pictures/people/        headshots

Name it lowercase with dashes, matching the article's filename where you can.
For `articles/newmark-cyber-test-range.md` use
`pictures/news/newmark-cyber-test-range.jpg`. Nothing enforces that, it just
makes them easy to pair up a year from now.

### Step 2. Add two lines to the article

Anywhere inside the front matter, between the `---` fences:

    image: /pictures/news/newmark-cyber-test-range.jpg
    imageAlt: Researchers at the Cyber Test Range examining hardware

That is all. The placeholder disappears and the photo appears everywhere the
item shows up, the news list, the hub pages, the homepage, and its own page.

### Things worth knowing

**The leading slash matters.** `/pictures/news/photo.jpg`, not
`pictures/news/photo.jpg`. Without it the image breaks on the live site while
looking correct on your own machine, which is a horrible way to find out.

**A wrong path stops the build.** It names the article and the path it could not
find, so a broken image never reaches the live site. Expect a complaint if you
rename a photo and forget to update the article.

**`imageAlt` is what a screen reader announces.** Describe what is in the photo,
not the article title. "Paul Lushenko speaking to congressional staffers" rather
than "Arctic security simulation". Leave out "photo of", it is implied.

**Format and size.** JPG for photographs, PNG for anything with text or flat
colour. Around 1200px on the long edge and under about 500 KB. Anything larger
only slows the page down, since it is displayed small anyway.

**Cropping.** Thumbnails are square and article headers are wide, both cropped
from the centre. Keep the subject centred rather than at an edge.

**There is no rush.** A neutral labelled box looks considered. A stretched or
irrelevant stock photo looks worse than no photo at all. The ones worth doing
first are whatever sits on the first page of the news feed.

---

## Tagging to research hubs

Add a `hubs:` line to any article and it appears on those hub pages
automatically. An item can belong to more than one.

    hubs: ["drones", "geopolitics"]

The six names, which must match exactly:

    critical-infrastructure
    drones
    ai-governance
    cryptocurrencies
    geopolitics
    space

Leave `hubs:` out entirely for anything institution-wide, like an annual report
or a staff announcement. About twenty articles have no hub, which is correct.

For tagging **people** to hubs, see `HOW-TO-TAG-PEOPLE.md`.

---

## Things that will stop the build

The build failing is good. It means the mistake never reaches the live site, and
the old version keeps serving until you fix it. Each of these prints the filename
and what to do.

**A colon in a title that is not quoted.** This is the most common one.

    title: Quantum: The Next Frontier      ← breaks
    title: "Quantum: The Next Frontier"    ← correct

Quote any title containing a colon. Quoting a title that does not need it is
harmless, so quote them all if it is easier to remember.

**A category that is not one of the seven.** Check the capital letters.

**A hub name that is misspelled.** It lists the six valid ones.

**An image or PDF path pointing at a file that is not there.** Usually a typo, or
the file was not committed.

**A link to a page that does not exist.** Usually a `.md` file that was written
but not committed.

**A person with `hubLead` but no `hubs` line.**

---

## Where files go

    articles/     every .md that becomes a page
    people/       one .md per person
    newsletters/  one .md per issue, named YYYY-MM.md
    files/        PDFs only
    pictures/
      news/         article photos
      publications/ covers
      people/       headshots
    _data/hubs.json   the six hub descriptions

The `.md` files always go in `articles/`, never in `files/`. `files/` is PDFs
only.

---

## The publishing routine

1. Write the file in a normal Mac folder.
2. Open GitHub Desktop. The changed files appear in a list on the left.
3. **Check every file you expect is listed and ticked.** This is the step worth
   slowing down for. Most problems on this site have been a file that was written
   but never committed.
4. Write a short summary and click Commit to main.
5. Click Push origin.
6. Wait about a minute, then check the Actions tab. Green tick means live. Red
   cross means the build caught something, and clicking into it tells you what.

---

## Checking your work before you push

If you have Node installed, in the project folder:

    npm start

Then open the address it prints. The page reloads as you save, so you can see
the article before anyone else does.

To check without previewing:

    npm run build

That runs every check and prints any problem, without publishing anything.
