export const DATA_URL = "https://pm-random.github.io/data";

export async function getJson<T>(path: string): Promise<T> {
  const r = await fetch(`${DATA_URL}/json/${path}.json`, { cache: "no-cache" });
  return await r.json();
}

export function mascotPath(): string {
  if (Date.now() < Date.parse("2022-06-02"))
    return "/src/assets/mascot-special.png";
  return "/src/assets/mascot.png";
}
