export function getVisibleItems<T>(items: T[], active: number, count: number): T[] {
  return Array.from({ length: count }).map(
    (_, offset) => items[wrapIndex(active + offset, items.length)],
  );
}

export function wrapIndex(index: number, total: number): number {
  return ((index % total) + total) % total;
}
