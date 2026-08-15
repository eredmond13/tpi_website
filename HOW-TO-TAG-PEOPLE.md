# Tagging people to research hubs

Open any file in `people/` and add one or two lines to the front matter, the part
between the `---` fences at the top. Nothing else needs changing.

## To put someone in a hub

    hubs: ["drones", "critical-infrastructure", "geopolitics"]

They will appear in the team strip on each of those hub pages, showing their photo,
name, and their usual role.

## To make someone a hub lead

    hubs: ["drones", "critical-infrastructure", "geopolitics"]
    hubLead: ["drones"]

They appear first on that hub's page, labelled **Hub Lead** instead of their usual
role. On the other hubs they appear normally.

A lead must also be listed in `hubs`. If you write `hubLead` on its own the build
stops and tells you.

## The six hub names to use

    critical-infrastructure
    drones
    ai-governance
    cryptocurrencies
    geopolitics
    space

Spelling has to match exactly. A typo stops the build and names the file, rather
than quietly leaving the person off the page.

## A worked example

`people/elizabeth-redmond.md` would start like this.

    ---
    name: "Elizabeth H. Redmond"
    role: "Lead Research Associate"
    group: "Staff"
    order: 4
    photo: /pictures/people/elizabeth-redmond.jpg
    hubs: ["drones", "critical-infrastructure", "geopolitics"]
    hubLead: ["drones"]
    ---

## How the order works

Hub leads come first, in seniority order if there is more than one. Everyone else
follows, in the same seniority order used on the People page.

    Leadership
    Staff
    Senior Fellows
    Fellows
    Junior Fellows
    Alumni

Within a group, people keep the `order:` number already in their profile, so the
sequence matches the People page.

## When a team gets big

Up to five people the strip is a plain row. At six or more it becomes a horizontal
slider with arrows, and you can also swipe or scroll it sideways. That happens on
its own, with nothing to switch on.
