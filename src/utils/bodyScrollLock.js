/**
 * Lock page scroll while preserving layout width when the notification drawer opens.
 * Uses scrollbar-gutter: stable (CSS) on html — do not pad body or header, which reflows layout.
 */
export const SCROLL_LOCK_CLASS = 'lw-scroll-locked';

export function lockBodyScroll() {
  if (typeof document === 'undefined') {
    return () => {};
  }

  const html = document.documentElement;
  const { body } = document;

  const previousHtmlOverflow = html.style.overflow;
  const previousBodyOverflow = body.style.overflow;

  html.classList.add(SCROLL_LOCK_CLASS);
  html.style.overflow = 'hidden';
  body.style.overflow = 'hidden';

  return () => {
    html.classList.remove(SCROLL_LOCK_CLASS);
    html.style.overflow = previousHtmlOverflow;
    body.style.overflow = previousBodyOverflow;
  };
}
