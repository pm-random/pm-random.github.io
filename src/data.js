export const DATA_URL = "https://pm-random.github.io/data"

export function JSONFetch(path) {
  return fetch(`${DATA_URL}/json/${path}.json`, {cache: "no-cache"}).then(r => r.json())
}
