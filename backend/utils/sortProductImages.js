/**
 * Sort product image paths so front always appears first, then back.
 * Keywords: front → priority 1, back → priority 2, others after.
 */
function getImageSortPriority(path) {
  const lower = (path || '').toLowerCase();
  if (lower.includes('front')) return 1;
  if (lower.includes('back')) return 2;
  return 3;
}

function sortProductImages(images) {
  if (!Array.isArray(images) || images.length === 0) return images;
  return [...images].sort((a, b) => getImageSortPriority(a) - getImageSortPriority(b));
}

module.exports = { sortProductImages, getImageSortPriority };
