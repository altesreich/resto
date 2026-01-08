// lib/api.ts - helpers para Strapi
export const STRAPI_URL: string = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
export const STRAPI_API_TOKEN: string | undefined = process.env.STRAPI_API_TOKEN;

// Helper para construir URLs completas (ej: media)
export function getStrapiURL(path: string = ""): string {
  return `${STRAPI_URL}${path}`;
}

// Devuelve la URL completa de un media o null si no hay URL
export function getStrapiMedia(url?: string | null): string | null {
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return getStrapiURL(url);
}

// Función fetch reutilizable y tipada
export async function fetchAPI<T = any>(path: string, options: RequestInit = {}): Promise<T> {
  const defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (STRAPI_API_TOKEN) {
    defaultHeaders["Authorization"] = `Bearer ${STRAPI_API_TOKEN}`;
  }

  const mergedOptions: RequestInit = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...(options.headers as Record<string, string> | undefined),
    },
  };

  const requestUrl = getStrapiURL(path);

  try {
    const response = await fetch(requestUrl, mergedOptions);
    if (!response.ok) {
      const text = await response.text().catch(() => "");
      console.error("API Error:", response.status, response.statusText, text);
      throw new Error(`API error: ${response.status}`);
    }
    const contentType = response.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      return (await response.json()) as T;
    }
    // Si no es JSON, devolver texto crudo
    return (await response.text()) as unknown as T;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
