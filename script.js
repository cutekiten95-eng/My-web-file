document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const languageSelect = document.getElementById("languageSelect");
  const projectSearch = document.getElementById("projectSearch");
  const projectGrid = document.getElementById("projectGrid");
  const noResults = document.getElementById("noResults");
  const currentYear = document.getElementById("currentYear");

  // =========================================
  // 1. YOUR ARCHIVE CONTENT
  // =========================================

  // Creative work only: designs, drawings and GIFs.
  // Do not add personal photos.
  const creativeItems = [
    // {
    //   title: "My Design",
    //   type: "Design",
    //   image: "assets/my-design.png",
    //   description: "A creative experiment."
    // }
  ];

  // Books you have finished reading.
  // This is a reading list, NOT a PDF library.
  const booksRead = [
    {
      title: "Atomic Habits",
      author: "James Clear",
      language: "Arabic edition",
      dateRead: "",
      rating: "",
      thoughts: ""
    }

    // Add another finished book like this:
    // {
    //   title: "Book Title",
    //   author: "Author Name",
    //   language: "English",
    //   dateRead: "October 2026",
    //   rating: "5/5",
    //   thoughts: "My opinion of the book."
    // }
  ];

  // Certificates and achievements.
  const certificateItems = [
    // {
    //   title: "Certificate Title",
    //   issuer: "Organization",
    //   date: "2026",
    //   file: "assets/certificate.pdf"
    // }
  ];

  // =========================================
  // 2. TRANSLATIONS
  // =========================================

  const translations = {
    en: {
      gallery: "Creative Gallery",
      galleryDescription:
        "A collection of designs, drawings, visual experiments, and GIFs. No personal photos.",
      galleryEmpty:
        "Your creative gallery is ready for your first design, drawing, or GIF.",

      books: "Books I've Read",
      booksDescription:
        "A personal reading list of books I've finished, with optional ratings and thoughts.",
      booksEmpty:
        "Your reading journey continues here. Add the books you have finished reading.",

      certificates: "Certificates",
      certificatesDescription:
        "A growing archive of certificates and achievements.",
      certificatesEmpty:
        "Your certificates will appear here when you add them.",

      author: "Author",
      language: "Edition / language",
      dateRead: "Date read",
      rating: "Rating",
      thoughts: "My thoughts",
      viewCertificate: "View certificate",

      navGallery: "Creative Gallery",
      navBooks: "Books I've Read",
      navCertificates: "Certificates"
    },

    fr: {
      gallery: "Galerie créative",
      galleryDescription:
        "Une collection de créations, dessins, expériences visuelles et GIF. Sans photos personnelles.",
      galleryEmpty:
        "La galerie est prête pour ton premier dessin, design ou GIF.",

      books: "Livres lus",
      booksDescription:
        "Une liste personnelle des livres terminés, avec des évaluations et impressions facultatives.",
      booksEmpty:
        "Ajoute ici les livres que tu as terminés de lire.",

      certificates: "Certificats",
      certificatesDescription:
        "Une archive de tes certificats et réussites.",
      certificatesEmpty:
        "Tes certificats apparaîtront ici lorsque tu les ajouteras.",

      author: "Auteur",
      language: "Édition / langue",
      dateRead: "Date de lecture",
      rating: "Note",
      thoughts: "Mon avis",
      viewCertificate: "Voir le certificat",

      navGallery: "Galerie créative",
      navBooks: "Livres lus",
      navCertificates: "Certificats"
    },

    ar: {
      gallery: "معرض إبداعي",
      galleryDescription:
        "مجموعة من التصاميم والرسومات والتجارب البصرية وملفات GIF، دون صور شخصية.",
      galleryEmpty:
        "المعرض جاهز لإضافة أول تصميم أو رسم أو ملف GIF.",

      books: "الكتب التي قرأتها",
      booksDescription:
        "قائمة شخصية بالكتب التي أنهيت قراءتها، مع إمكانية إضافة رأيك وتقييمك.",
      booksEmpty:
        "أضيفي هنا الكتب التي أنهيت قراءتها.",

      certificates: "الشهادات",
      certificatesDescription:
        "أرشيف متجدد للشهادات والإنجازات.",
      certificatesEmpty:
        "ستظهر شهاداتك هنا عندما تضيفينها.",

      author: "المؤلف",
      language: "النسخة / اللغة",
      dateRead: "تاريخ القراءة",
      rating: "التقييم",
      thoughts: "رأيي",
      viewCertificate: "عرض الشهادة",

      navGallery: "معرض إبداعي",
      navBooks: "الكتب التي قرأتها",
      navCertificates: "الشهادات"
    }
  };

  let currentLanguage =
    languageSelect?.value in translations
      ? languageSelect.value
      : "en";

  function t(key) {
    return translations[currentLanguage]?.[key] ||
      translations.en[key] ||
      key;
  }

  function escapeHTML(value = "") {
    return String(value).replace(/[&<>"']/g, (character) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[character]);
  }

  // =========================================
  // 3. CREATE THE NEW WEBSITE SECTIONS
  // =========================================

  function addArchiveSections() {
    const main = document.querySelector("main");

    if (!main || document.getElementById("books-read")) {
      return;
    }

    const sections = document.createElement("div");

    sections.id = "novaArchiveSections";

    sections.innerHTML = `
      <section class="section container archive-section"
               id="creative-gallery">
        <div class="section-heading">
          <p class="eyebrow">MAKE & EXPLORE</p>
          <h2 data-archive-text="gallery"></h2>
          <p class="section-description"
             data-archive-text="galleryDescription"></p>
        </div>
        <div id="creativeGalleryContent"></div>
      </section>

      <section class="section container archive-section"
               id="books-read">
        <div class="section-heading">
          <p class="eyebrow">READ & REFLECT</p>
          <h2 data-archive-text="books"></h2>
          <p class="section-description"
             data-archive-text="booksDescription"></p>
        </div>
        <div id="booksReadContent"></div>
      </section>

      <section class="section container archive-section"
               id="certificates">
        <div class="section-heading">
          <p class="eyebrow">MILESTONES</p>
          <h2 data-archive-text="certificates"></h2>
          <p class="section-description"
             data-archive-text="certificatesDescription"></p>
        </div>
        <div id="certificatesContent"></div>
      </section>
    `;

    const anchor =
      main.querySelector("#ideas") ||
      main.querySelector("#vision");

    if (anchor) {
      anchor.before(sections);
    } else {
      main.appendChild(sections);
    }

    // Add the archive links to the existing navigation.
    if (navLinks) {
      const links = [
        ["#creative-gallery", "navGallery"],
        ["#books-read", "navBooks"],
        ["#certificates", "navCertificates"]
      ];

      links.forEach(([href, labelKey]) => {
        if (!navLinks.querySelector(`a[href="${href}"]`)) {
          const link = document.createElement("a");

          link.href = href;
          link.dataset.archiveNav = labelKey;
          link.textContent = t(labelKey);

          navLinks.appendChild(link);
        }
      });
    }

    renderArchive();
  }

  // =========================================
  // 4. RENDER THE CREATIVE GALLERY
  // =========================================

  function renderGallery() {
    const container =
      document.getElementById("creativeGalleryContent");

    if (!container) return;

    if (creativeItems.length === 0) {
      container.innerHTML =
        `<p class="archive-empty">${t("galleryEmpty")}</p>`;
      return;
    }

    container.innerHTML = `
      <div class="archive-grid">
        ${creativeItems.map((item) => `
          <article class="archive-card">
            ${
              item.image
                ? `<img class="archive-image"
                        src="${escapeHTML(item.image)}"
                        alt="${escapeHTML(item.title || "Creative work")}"
                        loading="lazy">`
                : ""
            }
            <h3>${escapeHTML(item.title || "Untitled work")}</h3>
            ${
              item.description
                ? `<p>${escapeHTML(item.description)}</p>`
                : ""
            }
            ${
              item.type
                ? `<p class="archive-meta">${escapeHTML(item.type)}</p>`
                : ""
            }
          </article>
        `).join("")}
      </div>
    `;
  }

  // =========================================
  // 5. RENDER BOOKS I'VE READ
  // =========================================

  function renderBooks() {
    const container = document.getElementById("booksReadContent");

    if (!container) return;

    if (booksRead.length === 0) {
      container.innerHTML =
        `<p class="archive-empty">${t("booksEmpty")}</p>`;
      return;
    }

    container.innerHTML = `
      <div class="archive-grid">
        ${booksRead.map((book) => `
          <article class="archive-card book-card">
            <div class="book-icon" aria-hidden="true">BOOK</div>

            <h3>${escapeHTML(book.title)}</h3>

            ${
              book.author
                ? `<p><strong>${t("author")}:</strong>
                    ${escapeHTML(book.author)}</p>`
                : ""
            }

            ${
              book.language
                ? `<p><strong>${t("language")}:</strong>
                    ${escapeHTML(book.language)}</p>`
                : ""
            }

            ${
              book.dateRead
                ? `<p><strong>${t("dateRead")}:</strong>
                    ${escapeHTML(book.dateRead)}</p>`
                : ""
            }

            ${
              book.rating
                ? `<p><strong>${t("rating")}:</strong>
                    ${escapeHTML(book.rating)}</p>`
                : ""
            }

            ${
              book.thoughts
                ? `<p><strong>${t("thoughts")}:</strong>
                    ${escapeHTML(book.thoughts)}</p>`
                : ""
            }
          </article>
        `).join("")}
      </div>
    `;
  }

  // =========================================
  // 6. RENDER CERTIFICATES
  // =========================================

  function renderCertificates() {
    const container =
      document.getElementById("certificatesContent");

    if (!container) return;

    if (certificateItems.length === 0) {
      container.innerHTML =
        `<p class="archive-empty">${t("certificatesEmpty")}</p>`;
      return;
    }

    container.innerHTML = `
      <div class="archive-grid">
        ${certificateItems.map((item) => `
          <article class="archive-card">
            <h3>${escapeHTML(item.title)}</h3>

            ${
              item.issuer
                ? `<p>${escapeHTML(item.issuer)}</p>`
                : ""
            }

            ${
              item.date
                ? `<p>${escapeHTML(item.date)}</p>`
                : ""
            }

            ${
              item.file
                ? `<a class="archive-link"
                      href="${escapeHTML(item.file)}"
                      target="_blank"
                      rel="noopener">
                      ${t("viewCertificate")}
                    </a>`
                : ""
            }
          </article>
        `).join("")}
      </div>
    `;
  }

  // =========================================
  // 7. UPDATE ARCHIVE TEXT WHEN LANGUAGE CHANGES
  // =========================================

  function renderArchive() {
    document.querySelectorAll("[data-archive-text]").forEach(
      (element) => {
        element.textContent = t(element.dataset.archiveText);
      }
    );

    document.querySelectorAll("[data-archive-nav]").forEach(
      (element) => {
        element.textContent = t(element.dataset.archiveNav);
      }
    );

    renderGallery();
    renderBooks();
    renderCertificates();
  }

  addArchiveSections();

  // =========================================
  // 8. CURRENT YEAR
  // =========================================

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  // =========================================
  // 9. MOBILE NAVIGATION
  // =========================================

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

  // =========================================
  // 10. PROJECT SEARCH
  // =========================================

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

        if (matches) visibleCount++;
      });

      if (noResults) {
        noResults.hidden = visibleCount !== 0;
      }
    };

    projectSearch.addEventListener("input", filterProjects);
  }

  // =========================================
  // 11. LANGUAGE AND TEXT DIRECTION
  // =========================================

  function updateLanguageDirection() {
    currentLanguage =
      languageSelect?.value in translations
        ? languageSelect.value
        : "en";

    document.documentElement.lang = currentLanguage;
    document.documentElement.dir =
      currentLanguage === "ar" ? "rtl" : "ltr";

    renderArchive();
  }

  if (languageSelect) {
    languageSelect.addEventListener(
      "change",
      updateLanguageDirection
    );

    updateLanguageDirection();
  }
});
