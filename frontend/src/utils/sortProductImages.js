/**
 * Sort image list so front appears first, then back (for product galleries).
 * Uses filename keywords: front → 1, back → 2.
 */
export function getImageSortPriority(path) {
  const lower = (path || '').toLowerCase();
  if (lower.includes('front')) return 1;
  if (lower.includes('back')) return 2;
  return 3;
}

export function sortProductImages(images) {
  if (!Array.isArray(images) || images.length === 0) return images;
  return [...images].sort((a, b) => getImageSortPriority(a) - getImageSortPriority(b));
}
