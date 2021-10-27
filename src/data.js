export const DATA_URL = "https://pm-random.github.io/data"

export function JSONFetch(path) {
  return fetch(`${DATA_URL}/json/${path}.json`).then(r => r.json())
}

export const GAME_VERSION = "2.14.0"