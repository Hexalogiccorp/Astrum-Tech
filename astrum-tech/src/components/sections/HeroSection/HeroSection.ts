const frame = document.getElementById("photo-frame");

if (frame) {
  const slides = Array.from(
    frame.querySelectorAll<HTMLElement>(".hero-photo-slide")
  );

  const numberValue = document.querySelector<HTMLElement>(
    "#badge-number .hero-badge-number-value"
  );

  function updateBadgeNumber(index: number) {
    if (!numberValue) {
      return;
    }

    numberValue.classList.remove("is-animating");
    void numberValue.offsetWidth;
    numberValue.textContent = String(index + 1).padStart(2, "0");
    numberValue.classList.add("is-animating");
  }

  let currentIndex = 0;
  let isAnimating = false;
  const autoAdvanceDelay = 5000;
  const leaveAnimationDuration = 1400;

  function goToSlide(nextIndex: number) {
    if (nextIndex === currentIndex || isAnimating) {
      return;
    }

    isAnimating = true;

    const current = slides[currentIndex];
    const next = slides[nextIndex];

    next.classList.add("is-active");
    current.classList.add("is-leaving");
    updateBadgeNumber(nextIndex);

    let fallbackTimer: ReturnType<typeof setTimeout>;

    function finishLeave() {
      current.removeEventListener("animationend", onLeaveEnd);
      clearTimeout(fallbackTimer);
      current.classList.remove("is-leaving", "is-active");
      isAnimating = false;
    }

    function onLeaveEnd(event: AnimationEvent) {
      if (event.target !== current) {
        return;
      }
      finishLeave();
    }

    current.addEventListener("animationend", onLeaveEnd);
    fallbackTimer = setTimeout(finishLeave, leaveAnimationDuration + 300);

    currentIndex = nextIndex;
  }

  function nextSlide() {
    goToSlide((currentIndex + 1) % slides.length);
  }

  if (slides.length > 1) {
    setInterval(nextSlide, autoAdvanceDelay);
  }
}
