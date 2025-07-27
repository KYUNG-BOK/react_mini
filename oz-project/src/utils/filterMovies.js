export function parseEnvKeywords(envString) {
  return (envString || "")
    .split(",")
    .map(word => word.trim().toLowerCase())
    .filter(Boolean);
}

export function parseEnvKeywordPairs(envString) {
  return (envString || "")
    .split(",")
    .map(pair => pair.trim().toLowerCase().split("|"))
    .filter(pair => pair.length === 2);
}

export function filterMovies(movies, bannedKeywords, bannedPairs) {
  return (movies || []).filter((movie) => {
    const title = movie.title.toLowerCase();
    const hasBannedKeyword = bannedKeywords.some(keyword => title.includes(keyword));
    const hasBannedPair = bannedPairs.some(([a, b]) => title.includes(a) && title.includes(b));
    return !movie.adult && !hasBannedKeyword && !hasBannedPair;
  });
}
