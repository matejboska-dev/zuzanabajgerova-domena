import assignments from '@/data/property-categories.json';

export type PropertyCategory = 'investicni' | 'luxusni';

/** Ruční výběr klientky podle ID nabídky. Bez automatického přiřazování. */
export function propertyCategories(id: string): PropertyCategory[] {
  const values = (assignments as Record<string, unknown>)[id];
  return Array.isArray(values)
    ? values.filter((value): value is PropertyCategory => value === 'investicni' || value === 'luxusni')
    : [];
}
