const frame = document.getElementById("hero-photo-frame");

if (frame) {
  const slides = Array.from(
    frame.querySelectorAll<HTMLElement>(".hero-photo-slide")
  );

  let currentIndex = 0;
  const autoAdvanceDelay = 4000;

  function nextSlide() {
    const next = (currentIndex + 1) % slides.length;
    slides[currentIndex].classList.remove("is-active");
    slides[next].classList.add("is-active");
    currentIndex = next;
  }

  if (slides.length > 1) {
    setInterval(nextSlide, autoAdvanceDelay);
  }
}
