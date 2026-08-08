document.addEventListener("DOMContentLoaded", () => {
  const observeInView = (el: HTMLElement | null) => {
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          el.classList.add("in-view");
          observer.unobserve(el);
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
  };

  observeInView(document.querySelector<HTMLElement>(".gallery-header"));
  observeInView(document.querySelector<HTMLElement>(".gallery"));

  document
    .querySelectorAll<HTMLElement>(".gallery-item")
    .forEach((item) => observeInView(item));
});
