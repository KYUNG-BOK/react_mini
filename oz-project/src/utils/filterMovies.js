// 문자열에서 쉼표로 구분된 금지 키워드들을 배열로 파싱하여 소문자 처리 및 공백 제거
export function parseEnvKeywords(envString) {
  return (envString || "") // envString이 없으면 빈 문자열 사용
    .split(",")            // 쉼표 기준으로 나눔
    .map(word => word.trim().toLowerCase()) // 양쪽 공백 제거하고 소문자로 변환
    .filter(Boolean);      // 빈 문자열 제거
}

// 문자열에서 쉼표로 구분된 금지 키워드 쌍을 [a, b] 배열 형태로 파싱
export function parseEnvKeywordPairs(envString) {
  return (envString || "") // envString이 없으면 빈 문자열 사용
    .split(",")            // 쉼표 기준으로 나눔
    .map(pair => pair.trim().toLowerCase().split("|")) // 각 항목을 소문자로 변환 후 '|' 기준으로 나눔
    .filter(pair => pair.length === 2); // 길이가 2인 쌍만 유효한 키워드 쌍으로 간주
}

// 영화 리스트에서 성인 영화, 금지 키워드 또는 금지 키워드 쌍이 포함된 영화 제외
export function filterMovies(movies, bannedKeywords, bannedPairs) {
  return (movies || []).filter((movie) => {
    const title = movie.title.toLowerCase(); // 제목을 소문자로 변환

    // 금지 키워드 중 하나라도 포함되어 있는지 확인
    const hasBannedKeyword = bannedKeywords.some(keyword => title.includes(keyword));

    // 금지 키워드 쌍 중 둘 다 포함되어 있는 쌍이 있는지 확인
    const hasBannedPair = bannedPairs.some(([a, b]) => title.includes(a) && title.includes(b));

    // 성인 영화 또는 금지 키워드 또는 금지 키워드 쌍이 포함된 경우 제외
    return !movie.adult && !hasBannedKeyword && !hasBannedPair;
  });
}
