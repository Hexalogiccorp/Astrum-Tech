import { observeInView } from "../../scripts/scrollReveal";

document.addEventListener("DOMContentLoaded", () => {
  const leftSide = document.querySelector<HTMLElement>(".left-side");
  const title = document.querySelector<HTMLElement>(".rigth-side > .title");
  const aboutTitle = document.querySelector<HTMLElement>(".about-title");
  const aboutContent = document.querySelector<HTMLElement>(".about-content");
  const aboutButton = document.querySelector<HTMLElement>(".about-button");

  observeInView(leftSide);
  observeInView(title);
  observeInView(aboutTitle);
  observeInView(aboutContent);
  observeInView(aboutButton);
});
