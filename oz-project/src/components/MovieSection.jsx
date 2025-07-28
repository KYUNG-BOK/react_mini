import React from "react";
import MovieCard from "./MovieCard";
import RecommendationSlider from "./RecommendationSlider";

// 영화 섹션 컴포넌트: 섹션 제목, 슬라이더와 그리드로 영화 목록을 출력
export default function MovieSection({ title, movies, slider, grid }) {
  return (
    <section className="mb-10">
      {/* 섹션 제목 */}
      <h2 className="text-white text-2xl mb-4">{title}</h2>

      {/* slider prop이 true이면 추천 슬라이더 형태로 출력 , App.jsx에서 불러오기*/}
      {slider ? (
        // 슬라이더는 영화 목록 중 앞의 10개만 사용
        <RecommendationSlider movies={movies.slice(0, 10)} />
      ) : (
        // slider가 false인 경우, 그리드 형태로 영화 출력
        <div
          className={`grid gap-4 ${
            grid === 'lg' ? 'grid-cols-5' : grid === 'md' ? 'grid-cols-3' : 'grid-cols-2'
          }`}
        >
          {/* map(): 배열을 순회하며 각 요소를 변환하여 새로운 배열로 렌더링 */}
          {/* 여기서는 각 영화(movie)를 MovieCard 컴포넌트로 변환 */}
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />      // movie props는 detail페이지에서 받아옴.
          ))}
        </div>
      )}
    </section>
  );
}
