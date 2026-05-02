import { API_BASE_URL, API_ENDPOINTS } from './config';

export type SchemaObject = Record<string, unknown>;
export type SchemaPageType =
  | 'blog'
  | 'news'
  | 'grade'
  | 'webpage'
  | 'landing'
  | 'custom';

/**
 * Fetches all applicable JSON-LD schemas for a page from the backend.
 * Returns the merged result of Layer 1 (site-wide) + Layer 2 (section global)
 * + Layer 3 (page-specific).
 *
 * Always returns [] on any error — schemas are non-critical and must never
 * break a page render.
 *
 * ISR cached for 1 hour (next.revalidate = 3600).
 */
export async function getPageSchemas(
  pageType: SchemaPageType,
  identifier: string
): Promise<SchemaObject[]> {
  try {
    const res = await fetch(
      `${API_BASE_URL}${API_ENDPOINTS.GET_PAGE_SCHEMA}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pageType, identifier }),
        next: { revalidate: 3600 },
      }
    );
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data?.schemas) ? data.schemas : [];
  } catch (error) {
    // console.error('[SchemaApi] Error fetching schemas:', error);
    return [];
  }
}
