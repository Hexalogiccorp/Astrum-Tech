import { observeInView } from "../../scripts/scrollReveal";

document.addEventListener("DOMContentLoaded", () => {
  const section = document.querySelector<HTMLElement>(".testimonial-section");
  const wrapper = document.querySelector<HTMLElement>(".card-wrapper");
  const dotsContainer = document.querySelector(".slider-dots");

  if (!section || !wrapper || !dotsContainer) return;

  const slides = wrapper.querySelectorAll<HTMLElement>(".card-container");
  const dots = dotsContainer.querySelectorAll<HTMLButtonElement>(".slide");
  const totalSlides = slides.length;

  let currentIndex = 0;

  const replayLines = () => {
    wrapper.classList.remove("replay-lines");
    void wrapper.offsetWidth;
    wrapper.classList.add("replay-lines");
  };

  const goToSlide = (index: number) => {
    currentIndex = (index + totalSlides) % totalSlides;
    slides.forEach((slide) => {
      slide.classList.toggle(
        "active",
        slide.dataset.slide === String(currentIndex)
      );
    });
    dots.forEach((dot) => {
      const isActive = dot.dataset.slide === String(currentIndex);
      dot.classList.toggle("active", isActive);
      if (isActive) {
        dot.setAttribute("aria-current", "true");
      } else {
        dot.removeAttribute("aria-current");
      }
    });
    replayLines();
  };

  const BG_ANIMATION_DURATION = 800;

  observeInView(section, {
    onEnter: () => {
      setTimeout(() => {
        section.classList.add("cards-in-view");
        replayLines();
      }, BG_ANIMATION_DURATION);
    },
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const index = Number(dot.dataset.slide);
      goToSlide(index);
    });
  });

  const SWIPE_THRESHOLD = 50;
  let startX = 0;
  let isDragging = false;

  wrapper.addEventListener("pointerdown", (event) => {
    isDragging = true;
    startX = event.clientX;
  });

  wrapper.addEventListener("pointerup", (event) => {
    if (!isDragging) return;
    isDragging = false;

    const deltaX = event.clientX - startX;
    if (Math.abs(deltaX) < SWIPE_THRESHOLD) return;

    if (deltaX < 0) {
      goToSlide(currentIndex + 1);
    } else {
      goToSlide(currentIndex - 1);
    }
  });

  wrapper.addEventListener("pointercancel", () => {
    isDragging = false;
  });
});
