/**
 * Magyar számformátumok
 * Ezres elválasztó: pont (.)
 * Tizedes elválasztó: vessző (,)
 * Példa: 5.827.289 Ft | 7,90% | 1.721
 */

/** Számot formáz ezres pontokkal: 5827289 → "5.827.289" */
export function formatSzam(ertek: number): string {
  return new Intl.NumberFormat('de-DE', { maximumFractionDigits: 0 }).format(ertek)
}

/** Számot formáz Ft végzettel: 5827289 → "5.827.289 Ft" */
export function formatFt(ertek: number): string {
  return `${formatSzam(ertek)} Ft`
}

/** Százalékot formáz vesszővel: 7.9 → "7,90%" */
export function formatSzazalek(ertek: number, tizedesek = 2): string {
  return `${ertek.toFixed(tizedesek).replace('.', ',')}%`
}

/** Nagy számot rövidít: 1200000 → "1,2M" | 5800 → "5,8K" */
export function formatRovid(ertek: number): string {
  if (ertek >= 1_000_000) return `${(ertek / 1_000_000).toFixed(1).replace('.', ',')}M`
  if (ertek >= 1_000) return `${(ertek / 1_000).toFixed(1).replace('.', ',')}K`
  return String(ertek)
}
