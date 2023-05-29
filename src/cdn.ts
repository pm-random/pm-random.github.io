export async function fetch_cdn_data<T>(json_name: string): Promise<T> {
  const promise = await fetch(`${import.meta.env.VITE_CDN_BASE_URL}/json/${json_name}.json`, {
    cache: "no-cache"
  });
  return await promise.json();
}

export function cdn_url(resource_path: string) {
  return `${import.meta.env.VITE_CDN_BASE_URL}/${resource_path}`;
}

export interface CharacterCategory {
  title: string;
  characters: Array<Character>;
}

export interface Character {
  name: string;
  date: string;
  images?: Array<string>;
  notes?: Array<string>;
}
