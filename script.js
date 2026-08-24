document.addEventListener("DOMContentLoaded", () => {
  /* ─── Modal ─── */
  const FOCUSABLE = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
  let lastFocused = null;

  function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    lastFocused = document.activeElement;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
    const closeBtn = modal.querySelector(".modal-close");
    if (closeBtn) closeBtn.focus();
  }

  function closeModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
    if (lastFocused) lastFocused.focus();
  }

  function trapFocus(modal, e) {
    const content = modal.querySelector(".modal-content");
    if (!content) return;
    const focusable = content.querySelectorAll(FOCUSABLE);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.key === "Tab") {
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-modal-trigger]");
    if (trigger) {
      openModal(trigger.dataset.modalTrigger);
      return;
    }
    const closeBtn = e.target.closest("[data-modal-close]");
    if (closeBtn) {
      closeModal(closeBtn.dataset.modalClose);
      return;
    }
    if (e.target.classList.contains("modal") && e.target.classList.contains("is-open")) {
      closeModal(e.target.id);
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal.is-open").forEach((m) =>
        closeModal(m.id)
      );
    }
    const openModal = document.querySelector(".modal.is-open");
    if (openModal && e.key === "Tab") {
      trapFocus(openModal, e);
    }
  });

  /* ─── Hamburger Menu ─── */
  const hamburger = document.getElementById("hamburger-btn");
  const navLinks = document.getElementById("nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      const isOpen = hamburger.classList.toggle("is-open");
      navLinks.classList.toggle("is-open");
      hamburger.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("is-open");
        navLinks.classList.remove("is-open");
        hamburger.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ─── Project Search & Filter ─── */
  const searchInput = document.getElementById("project-search");
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectGrid = document.getElementById("project-grid");
  const cards = projectGrid ? Array.from(projectGrid.querySelectorAll(".project-card")) : [];
  let activeFilter = "all";

  function applyFilters() {
    const query = searchInput ? searchInput.value.toLowerCase().trim() : "";
    let visibleCount = 0;

    cards.forEach((card) => {
      const name = (card.dataset.name || "").toLowerCase();
      const category = card.dataset.category || "";
      const textContent = card.textContent.toLowerCase();

      const matchesFilter = activeFilter === "all" || category === activeFilter;
      const matchesSearch = !query || name.includes(query) || textContent.includes(query);

      if (matchesFilter && matchesSearch) {
        card.classList.remove("hidden");
        visibleCount++;
      } else {
        card.classList.add("hidden");
      }
    });

    let noResults = projectGrid.querySelector(".no-results");
    if (visibleCount === 0) {
      if (!noResults) {
        noResults = document.createElement("div");
        noResults.className = "no-results";
        noResults.setAttribute("role", "status");
        noResults.setAttribute("aria-live", "polite");
        noResults.textContent = "No projects match your search.";
        projectGrid.appendChild(noResults);
      }
    } else if (noResults) {
      noResults.remove();
    }
  }

  if (searchInput) {
    searchInput.addEventListener("input", applyFilters);
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => {
        b.classList.remove("active");
        b.setAttribute("aria-pressed", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-pressed", "true");
      activeFilter = btn.dataset.filter;
      applyFilters();
    });
  });

  /* ─── Scroll Reveal (Intersection Observer) ─── */
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && revealElements.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add("is-visible"));
  }

  /* ─── Back to Top Button ─── */
  const backToTop = document.getElementById("back-to-top");

  if (backToTop) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        backToTop.classList.add("is-visible");
      } else {
        backToTop.classList.remove("is-visible");
      }
    }, { passive: true });
  }

  /* ─── Scroll Progress Indicator ─── */
  const scrollProgress = document.getElementById("scroll-progress");

  if (scrollProgress) {
    window.addEventListener("scroll", () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        scrollProgress.style.width = "0%";
        return;
      }
      const scrollPercent = (scrollTop / docHeight) * 100;
      scrollProgress.style.width = scrollPercent + "%";
    }, { passive: true });
  }
});
