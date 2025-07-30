import React from "react";
import { useFetchMovies } from "../hooks/useFetchMovies";
import MovieSection from "../components/MovieSection";
import { useInfiniteMovies } from "../hooks/useInfiniteMovies";

export default function App() {
  const recommended = useFetchMovies("upcoming");
  const { movies, loading } = useInfiniteMovies("popular");

  // 환경 변수에서 금지 키워드 및 키워드 쌍 불러오기
  const bannedKeywords = (import.meta.env.VITE_BANNED_KEYWORDS || "")
    .split(",")
    .map(word => word.trim().toLowerCase())
    .filter(Boolean);

  const bannedPairs = (import.meta.env.VITE_BANNED_KEYWORD_PAIRS || "")
    .split(",")
    .map(pair => pair.trim().toLowerCase().split("|"))
    .filter(pair => pair.length === 2);

  // 금지 키워드 쌍이 포함되어 있는지 확인
  const containsBannedPair = (text) => {
    return bannedPairs.some(([a, b]) => text.includes(a) && text.includes(b));
  };

  // 성인 영화, 금지 키워드, 키워드 쌍이 포함된 영화는 필터링
  const filteredMovies = (movies || []).filter((movie) => {
    const title = movie.title?.toLowerCase() || "";
    const hasBannedKeyword = bannedKeywords.some(keyword => title.includes(keyword));
    const hasBannedPair = containsBannedPair(title);
    return !movie.adult && !hasBannedKeyword && !hasBannedPair;
  });

  return (
    <div className="p-4">
      {/* 슬라이더로 보여줄 추천 영화 */}
      <MovieSection title="개봉 영화" movies={recommended} slider />

      {/* 필터링된 인기 영화 */}
      <MovieSection title="추천 영화" movies={filteredMovies} grid="lg" />

      {/* 로딩 표시 */}
      {loading && (
        <p className="text-center text-gray-400 mt-4">로딩 중 . . .</p>
      )}
    </div>
  );
}
