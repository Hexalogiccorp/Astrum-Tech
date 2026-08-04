document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.querySelector<HTMLElement>(".gallery");
  if (!gallery) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        gallery.classList.add("in-view");
        observer.unobserve(gallery);
      });
    },
    { threshold: 0.3 }
  );

  observer.observe(gallery);
});
