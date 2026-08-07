import { observeInView } from "../../scripts/scrollReveal";

document.addEventListener("DOMContentLoaded", () => {
  const title = document.querySelector<HTMLElement>(
    ".services-section > .title"
  );
  const top = document.querySelector<HTMLElement>(".services-top");
  const cards = document.querySelectorAll<HTMLElement>(".service-card");
  const images = document.querySelectorAll<HTMLElement>(".service-card-image");

  observeInView(title);
  observeInView(top);
  cards.forEach((card) => observeInView(card));
  images.forEach((image) => observeInView(image));
});
