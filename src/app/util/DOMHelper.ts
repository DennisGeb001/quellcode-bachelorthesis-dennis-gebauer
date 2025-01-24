export class DOMHelper {
  static elementDoesNotHaveScroll(element: HTMLElement): boolean {
    const hasScrollWidth = element.scrollWidth > element.clientWidth;
    const hasScrollHeight = element.scrollHeight > element.clientHeight;

    if (!hasScrollWidth && !hasScrollHeight) return true;

    const effectiveOverflowX = DOMHelper.getEffectiveOverflowForDirection(element, true);
    if (hasScrollWidth && (effectiveOverflowX === 'scroll' || effectiveOverflowX === 'auto')) return false;

    const effectiveOverflowY = DOMHelper.getEffectiveOverflowForDirection(element, false);
    return !(hasScrollHeight && (effectiveOverflowY === 'scroll' || effectiveOverflowY === 'auto'));
  }

  static elementDoesNotHaveHorizontalScroll(element: HTMLElement): boolean {
    const hasScrollWidth = element.scrollWidth > element.clientWidth;

    if (!hasScrollWidth) return true;

    const effectiveOverflowX = DOMHelper.getEffectiveOverflowForDirection(element, true);
    const hasHorizontalOverflow = effectiveOverflowX === 'scroll' || effectiveOverflowX === 'auto';

    return !hasHorizontalOverflow;
  }

  static getEffectiveOverflowForDirection(element: HTMLElement, isXDirection: boolean): string {
    let directionOverflow = isXDirection ? window.getComputedStyle(element).overflowX : window.getComputedStyle(element).overflowY;
    let overflow = window.getComputedStyle(element).overflow;

    if (!directionOverflow) {
      directionOverflow = overflow;
    }

    while ((directionOverflow === 'inherit' || directionOverflow === 'unset') && element.parentElement) {
      element = element.parentElement;
      directionOverflow = isXDirection ? window.getComputedStyle(element).overflowX : window.getComputedStyle(element).overflowY;
      overflow = window.getComputedStyle(element).overflow;

      if (!directionOverflow) {
        directionOverflow = overflow;
      }
    }

    if (directionOverflow === 'unset' || directionOverflow === 'initial') {
      directionOverflow = 'visible'; // standard value if no parent has set any value
    }

    return directionOverflow;
  }

}
