export const DATA_URL = "https://pm-random.github.io/data";

export async function getJson<T>(path: string): Promise<T> {
  const r = await fetch(`${DATA_URL}/json/${path}.json`, { cache: "no-cache" });
  return await r.json();
}

export async function JSONFetch<T>(path: string): Promise<T> {
  const r = await fetch(`${DATA_URL}/json/${path}.json`, { cache: "no-cache" });
  return await r.json();
}
