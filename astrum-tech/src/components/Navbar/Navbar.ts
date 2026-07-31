document.addEventListener("DOMContentLoaded", function () {
    const mobileMenuButton = document.getElementById("mobile-menu-button");
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileCloseBtn = document.querySelector("#mobile-close");

    if (mobileMenuButton && mobileMenu) {
      mobileMenuButton.addEventListener("click", () => {
        mobileMenu.classList.toggle("open");
      });

      const mobileLinks = mobileMenu.querySelectorAll("a");
      mobileLinks.forEach((link) => {
        link.addEventListener("click", () => {
          mobileMenu.classList.toggle("open");
        });
      });
    }

    mobileCloseBtn?.addEventListener("click", () => {
      mobileMenu?.classList.toggle("open");
    });

    const navbar = document.querySelector(".navbar");
    const handleNavbarScroll = () => {
      if (!navbar) return;

      if (window.scrollY > 0) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleNavbarScroll);
    window.addEventListener("load", handleNavbarScroll);

    const langSelectors = document.querySelectorAll<HTMLElement>(
      ".lang-selector"
    );
    const storedLang = localStorage.getItem("lang") || "es";

    const closeAllLangSelectors = () => {
      langSelectors.forEach((selector) => {
        selector.classList.remove("open");
        selector
          .querySelector(".lang-toggle")
          ?.setAttribute("aria-expanded", "false");
      });
    };

    const setActiveLang = (lang: string) => {
      langSelectors.forEach((selector) => {
        selector.querySelectorAll(".lang-option").forEach((option) => {
          option.classList.toggle(
            "active",
            option.getAttribute("data-lang") === lang
          );
        });
      });
    };

    setActiveLang(storedLang);

    langSelectors.forEach((selector) => {
      const toggle = selector.querySelector(".lang-toggle");

      toggle?.addEventListener("click", (event) => {
        event.stopPropagation();
        const isOpen = selector.classList.contains("open");
        closeAllLangSelectors();
        if (!isOpen) {
          selector.classList.add("open");
          toggle.setAttribute("aria-expanded", "true");
        }
      });

      selector.querySelectorAll(".lang-option").forEach((option) => {
        option.addEventListener("click", () => {
          const lang = option.getAttribute("data-lang");
          if (!lang) return;

          localStorage.setItem("lang", lang);
          document.documentElement.setAttribute("lang", lang);
          setActiveLang(lang);
          closeAllLangSelectors();

          window.dispatchEvent(
            new CustomEvent("langchange", { detail: { lang } })
          );
        });
      });
    });

    document.addEventListener("click", closeAllLangSelectors);
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeAllLangSelectors();
    });
  });