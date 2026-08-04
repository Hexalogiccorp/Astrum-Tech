export interface ScrollRevealOptions {
  threshold?: number;
  className?: string;
  onEnter?: () => void;
}

export function observeInView(
  element: Element | null,
  { threshold = 0.3, className = "in-view", onEnter }: ScrollRevealOptions = {}
): void {
  if (!element) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        element.classList.add(className);
        onEnter?.();
        observer.unobserve(element);
      });
    },
    { threshold }
  );

  observer.observe(element);
}
