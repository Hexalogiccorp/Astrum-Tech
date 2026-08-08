import { observeInView } from "../../scripts/scrollReveal";

document.addEventListener("DOMContentLoaded", () => {
  const bg = document.querySelector<HTMLElement>(".certifications-bg");
  const card = document.querySelector<HTMLElement>(".certifications-card");
  const badges = document.querySelector<HTMLElement>(".certifications-badges");

  observeInView(bg, { threshold: 0 });
  observeInView(card);
  observeInView(badges);
});
