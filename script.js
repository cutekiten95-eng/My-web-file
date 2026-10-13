
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const languageSelect = document.getElementById("languageSelect");
  const projectSearch = document.getElementById("projectSearch");
  const projectGrid = document.getElementById("projectGrid");
  const noResults = document.getElementById("noResults");
  const currentYear = document.getElementById("currentYear");

  // Current year in the footer
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  // Mobile navigation
  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // Search projects by their title, description, or keywords
  if (projectSearch && projectGrid) {
    const cards = Array.from(
      projectGrid.querySelectorAll(".project-card")
    );

    const filterProjects = () => {
      const query = projectSearch.value
        .trim()
        .toLocaleLowerCase();

      let visibleCount = 0;

      cards.forEach((card) => {
        const searchableText = (
          card.innerText + " " + (card.dataset.search || "")
        ).toLocaleLowerCase();

        const matches = searchableText.includes(query);

        card.hidden = !matches;

        if (matches) {
          visibleCount++;
        }
      });

      if (noResults) {
        noResults.hidden = visibleCount !== 0;
      }
    };

    projectSearch.addEventListener("input", filterProjects);
  }

  // Language direction
  // Full French and Arabic text translations can be added later.
  if (languageSelect) {
    const updateLanguageDirection = () => {
      const language = languageSelect.value;

      document.documentElement.lang = language;
      document.documentElement.dir =
        language === "ar" ? "rtl" : "ltr";
    };

    languageSelect.addEventListener(
      "change",
      updateLanguageDirection
    );

    updateLanguageDirection();
  }
});
