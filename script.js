const currentPage = document.body.dataset.page || "home";
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const navGroups = [
  {
    id: "research",
    label: "Research",
    href: "research.html",
    links: [
      ["All Research Hubs", "research.html"],
      ["Critical Infrastructure", "research.html#critical-infrastructure"],
      ["Drones and Robotics", "research.html#drones"],
      ["AI Governance and Defense", "research.html#ai-governance"],
      ["Cryptocurrencies", "research.html#cryptocurrencies"],
      ["Geopolitics and Technology", "research.html#geopolitics"]
    ]
  },
  {
    id: "people",
    label: "People",
    href: "people.html",
    links: [
      ["Full Directory", "people.html"],
      ["Leadership", "people.html#leadership"],
      ["Staff", "people.html#staff"],
      ["Senior Fellows", "people.html#senior-fellows"],
      ["Fellows", "people.html#fellows"],
      ["Junior Fellows", "people.html#junior-fellows"],
      ["Alumni", "people.html#alumni"]
    ]
  },
  {
    id: "publications",
    label: "Publications",
    href: "publications.html",
    links: [
      ["All Publications", "publications.html"]
    ]
  },
  {
    id: "news",
    label: "News",
    href: "news.html",
    links: [
      ["All News", "news.html"],
      ["Events and Seminars", "news.html#events"],
      ["Newsletter", "news.html#newsletter"]
    ]
  },
  {
    id: "about",
    label: "About",
    href: "about.html",
    links: [
      ["About the Institute", "about.html"],
      ["Mission", "about.html#mission"],
      ["Vision", "about.html#vision"],
      ["Courses", "courses.html"],
      ["Annual Reports", "about.html#annual-reports"],
      ["Grants", "about.html#grants"],
      ["Job Opportunities", "about.html#jobs"],
      ["Contact", "about.html#contact"]
    ]
  }
];

function pageToNavGroup(page) {
  if (page === "home") return "";
  return page;
}

function transitionAccentFor(page) {
  const accents = {
    home: "#b31b1b",
    about: "#b31b1b",
    people: "#b31b1b",
    research: "#b31b1b",
    projects: "#b31b1b",
    news: "#b31b1b",
    publications: "#b31b1b",
    events: "#b31b1b",
    media: "#c49a2c"
  };
  return accents[page] || "#9f2f23";
}

function ensureTransitionLayer() {
  let layer = document.querySelector(".page-transition");
  if (layer) return layer;
  layer = document.createElement("div");
  layer.className = "page-transition";
  layer.setAttribute("aria-hidden", "true");
  layer.innerHTML = "<span></span><span></span>";
  document.body.append(layer);
  return layer;
}

function hydrateHeaderNavigation() {
  const html = navGroups
    .map(
      (group) => `
        <details class="nav-group" data-nav="${group.id}">
          <summary><a class="nav-top-link" href="${localPath(group.href)}">${group.label}</a><span aria-hidden="true" class="nav-caret"></span></summary>
          <div class="dropdown-menu">
            ${group.links.map(([label, href]) => `<a href="${localPath(href)}">${label}</a>`).join("")}
          </div>
        </details>
      `
    )
    .join("");

  document.querySelectorAll(".primary-nav").forEach((nav) => {
    nav.innerHTML = html;
    nav.classList.add("is-hydrated");
  });

  document.querySelectorAll(".nav-group summary").forEach((summary) => {
    summary.addEventListener("click", (event) => {
      const link = event.target.closest(".nav-top-link");
      if (!link) return;
      event.preventDefault();
      event.stopPropagation();
      window.location.href = link.getAttribute("href");
    });
  });

  document.querySelectorAll(".nav-group").forEach((group) => {
    group.addEventListener("toggle", () => {
      if (!group.open) return;
      document.querySelectorAll(".nav-group[open]").forEach((otherGroup) => {
        if (otherGroup !== group) otherGroup.open = false;
      });
    });
  });

  document.addEventListener("click", (event) => {
    if (event.target.closest(".primary-nav")) return;
    document.querySelectorAll(".nav-group[open]").forEach((group) => {
      group.open = false;
    });
  });
}

hydrateHeaderNavigation();

const searchToggle = document.querySelector("#searchToggle");
const searchPanel = document.querySelector("#searchPanel");
const siteSearch = document.querySelector("#siteSearch");
const searchResults = document.querySelector("#searchResults");

const archiveEntries = [
  {
    title: "Critical Infrastructure",
    type: "Research hub",
    summary: "Secure supply chains, data centers, digital systems, and national resilience.",
    href: "research.html#critical-infrastructure"
  },
  {
    title: "DoD Semiconductor Project",
    type: "Research project",
    summary: "A $3 million Department of Defense project on semiconductor supply-chain resilience.",
    href: "research.html#critical-infrastructure"
  },
  {
    title: "AI Governance and Defense",
    type: "Research hub",
    summary: "Governance research supported by Microsoft AI and the Jain Family Institute.",
    href: "research.html#ai-governance"
  },
  {
    title: "Kimi K3 and the New Terms of AI Competition",
    type: "Policy analysis",
    summary: "Sarah Kreps on open-weight models, AI safety, resilience, and American technological leadership.",
    href: "articles/kimi-k3-ai-competition.html"
  },
  {
    title: "TPI helps to secure NATO allies from the threat of drones",
    type: "News",
    summary: "NATO-relevant research on drone threats and allied security.",
    href: "articles/nato-drone-threat.html"
  },
  {
    title: "Former Iceland president Jóhannesson visits Cornell",
    type: "News",
    summary: "Messenger lectures and Cornell public engagement.",
    href: "articles/iceland-president-visit.html"
  },
  {
    title: "The Weaponization of Technology Standards",
    type: "Policy analysis",
    summary: "The 2025 U.S. National Security Strategy and great-power competition.",
    href: "articles/technology-standards.html"
  },
  {
    title: "Sarah Kreps",
    type: "People",
    summary: "Founder and Institute Leader at the Cornell Brooks School Tech Policy Institute.",
    href: "people.html#leadership"
  },
  {
    title: "Elizabeth H. Redmond",
    type: "People",
    summary: "Lead Research Associate supporting semiconductor, cybersecurity, drone, and space research.",
    href: "people.html#research"
  },
  {
    title: "Grants",
    type: "About",
    summary: "New Frontier, How2Green, Atkinson, CCSS, NSF, GA-ASI, Planetary Defense, and Jain Family Institute.",
    href: "about.html#grants"
  },
  {
    title: "Courses",
    type: "Teaching",
    summary: "Contemporary Security Policy, AI Law Ethics and Policy, and Global Policy Challenges.",
    href: "courses.html"
  }
];

function setActiveNavigation() {
  const activeGroup = pageToNavGroup(currentPage);
  document.querySelectorAll(".nav-group[data-nav]").forEach((group) => {
    if (group.dataset.nav === activeGroup) {
      group.classList.add("is-current");
      group.querySelector("summary")?.setAttribute("aria-current", "page");
    }
  });
}

function normalizeHref(href) {
  try {
    return new URL(href, window.location.href);
  } catch {
    return null;
  }
}

function pageFromHref(href) {
  const url = normalizeHref(href);
  if (!url) return "home";
  const name = url.pathname.split("/").pop() || "index.html";
  if (name === "index.html") return "home";
  if (name.startsWith("report-")) return "publications";
  if (url.pathname.includes("/articles/")) return "news";
  return name.replace(".html", "");
}

function setSearchResults(query = "") {
  if (!searchResults) return;
  const normalizedQuery = query.trim().toLowerCase();
  const matches = archiveEntries
    .filter((entry) => {
      const haystack = `${entry.title} ${entry.type} ${entry.summary}`.toLowerCase();
      return !normalizedQuery || haystack.includes(normalizedQuery);
    })
    .slice(0, 6);

  searchResults.innerHTML = matches
    .map(
      (entry) => `
        <li>
          <a href="${localPath(entry.href)}">
            <strong>${entry.title}</strong>
            <span>${entry.type}</span>
            <p>${entry.summary}</p>
          </a>
        </li>
      `
    )
    .join("");
}

function localPath(path) {
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("#")) return path;
  return window.location.pathname.includes("/articles/") ? `../${path}` : path;
}

function openSearch() {
  if (!searchPanel || !searchToggle || !siteSearch) return;
  searchPanel.removeAttribute("hidden");
  searchToggle.setAttribute("aria-expanded", "true");
  setSearchResults();
  window.requestAnimationFrame(() => siteSearch.focus());
}

function closeSearch() {
  if (!searchPanel || !searchToggle) return;
  searchPanel.setAttribute("hidden", "");
  searchToggle.setAttribute("aria-expanded", "false");
}

searchToggle?.addEventListener("click", () => {
  if (searchPanel.hasAttribute("hidden")) {
    openSearch();
  } else {
    closeSearch();
  }
});

siteSearch?.addEventListener("input", (event) => {
  setSearchResults(event.target.value);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && searchPanel && !searchPanel.hasAttribute("hidden")) {
    closeSearch();
    searchToggle?.focus();
  }
});

document.querySelectorAll(".newsletter").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const status = form.querySelector("#newsletterStatus") || document.querySelector("#newsletterStatus");
    if (status) status.textContent = "Subscribed to the archive dispatch.";
    form.reset();
  });
});

function shouldIntercept(link) {
  const href = link.getAttribute("href");
  if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return false;
  if (link.target && link.target !== "_self") return false;
  const url = normalizeHref(href);
  if (!url || url.origin !== window.location.origin) return false;
  if (!url.pathname.endsWith(".html") && !url.pathname.endsWith("/")) return false;
  const current = new URL(window.location.href);
  if (url.pathname === current.pathname && url.hash && url.hash !== current.hash) return false;
  return url.href !== current.href;
}

function navigateWithTransition(event) {
  const link = event.currentTarget;
  // The wipe only plays when leaving the home page. Every other
  // navigation on the site is a plain, immediate link.
  if (!shouldIntercept(link) || prefersReducedMotion) return;
  if (currentPage !== "home") return;

  const href = link.href;
  const targetPage = pageFromHref(href);
  event.preventDefault();
  closeSearch();

  document.querySelectorAll(".nav-group[open]").forEach((group) => {
    group.open = false;
  });

  const transitionLayer = ensureTransitionLayer();
  document.documentElement.style.setProperty("--transition-accent", transitionAccentFor(targetPage));
  document.body.dataset.targetPage = targetPage;
  document.body.classList.add("is-leaving", `leave-${targetPage}`);
  transitionLayer.classList.remove("is-returning");
  transitionLayer.classList.add("is-active");

  window.setTimeout(() => {
    sessionStorage.setItem("btpi-transition", `${currentPage}-to-${targetPage}`);
    window.location.href = href;
  }, 320);
}

// Page-transition wipe removed. Links now navigate normally.
// document.querySelectorAll("a[href]").forEach((link) => {
//   link.addEventListener("click", navigateWithTransition);
// });

function applyIncomingTransition() {
  if (prefersReducedMotion) return;
  const transition = sessionStorage.getItem("btpi-transition");
  sessionStorage.removeItem("btpi-transition");
  if (!transition) return;
  const transitionLayer = ensureTransitionLayer();
  document.documentElement.style.setProperty("--transition-accent", transitionAccentFor(currentPage));
  document.body.classList.add("is-entering", `enter-${currentPage}`);
  transitionLayer.classList.add("is-returning");
  window.setTimeout(() => {
    document.body.classList.remove("is-entering", `enter-${currentPage}`);
    transitionLayer.classList.remove("is-returning", "is-active");
  }, 620);
}

const revealObserver = "IntersectionObserver" in window
  ? new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0.12,
        rootMargin: "0px 0px -8% 0px"
      }
    )
  : null;

document.querySelectorAll(".reveal").forEach((element) => {
  if (revealObserver) {
    revealObserver.observe(element);
  } else {
    element.classList.add("in-view");
  }
});

const driftFigures = [...document.querySelectorAll("[data-drift] img")];

function updateImageDrift() {
  const viewportHeight = window.innerHeight || 1;
  driftFigures.forEach((image) => {
    const rect = image.getBoundingClientRect();
    const midpoint = rect.top + rect.height / 2;
    const distance = (midpoint - viewportHeight / 2) / viewportHeight;
    const offset = Math.max(-16, Math.min(16, distance * -22));
    image.style.transform = `translateY(${offset}px) scale(1.035)`;
  });
}

let driftFrame = null;
function scheduleDrift() {
  if (driftFrame) return;
  driftFrame = window.requestAnimationFrame(() => {
    updateImageDrift();
    driftFrame = null;
  });
}

setActiveNavigation();
// applyIncomingTransition();

if (!prefersReducedMotion) {
  updateImageDrift();
  document.addEventListener("scroll", scheduleDrift, { passive: true });
  window.addEventListener("resize", scheduleDrift);
}

/* ---------------------------------------------------------------------------
   Clear the page-transition overlay when arriving via the back or forward
   button. The browser restores a cached copy of the page without re-running
   this script, so the wipe panel would otherwise stay frozen over the page.
   --------------------------------------------------------------------------- */

function resetTransitionState() {
  const layer = document.querySelector(".page-transition");
  if (layer) layer.className = "page-transition";

  document.body.classList.remove("is-leaving", "is-entering");
  Array.from(document.body.classList)
    .filter((name) => name.startsWith("leave-") || name.startsWith("enter-"))
    .forEach((name) => document.body.classList.remove(name));

  delete document.body.dataset.targetPage;
  sessionStorage.removeItem("btpi-transition");
}

// Fired on back/forward. event.persisted is true for a restored page.
window.addEventListener("pageshow", (event) => {
  if (event.persisted) resetTransitionState();
});

window.addEventListener("popstate", resetTransitionState);

// Safety net. If navigation is blocked or slow, never leave the page covered.
window.setInterval(() => {
  const layer = document.querySelector(".page-transition.is-active");
  if (layer && !document.body.classList.contains("is-leaving")) {
    resetTransitionState();
  }
}, 2000);
