import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import RecommendationSlider from '../components/RecommendationSlider';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function App() {
  const [movies, setMovies] = useState([]);       // 추천 영화
  const [recommended, setRecommended] = useState([]);   // 개봉예정영화

  /*
  영상을 불러오는도중, adult 등록은 안되었는데 보기 민망할 정도의
  영상이 있어서, 추가로 필터링할 단어들을 등록하였습니다. 
  단어조차 적는것도 별로라서 별도의 파일에 넣어놓고 임포트해서 사용하였습니다.
  */

  const bannedKeywords = (import.meta.env.VITE_BANNED_KEYWORDS || "")
    .split(",")
    .map(word => word.trim().toLowerCase())
    .filter(Boolean);

  const bannedPairs = (import.meta.env.VITE_BANNED_KEYWORD_PAIRS || "")
    .split(",")
    .map(pair => pair.trim().toLowerCase().split("|"))
    .filter(pair => pair.length === 2);

  const containsBannedPair = (text) => {
    return bannedPairs.some(([a, b]) => text.includes(a) && text.includes(b));
  };

  /*
    필터링
    기본기능 -> 속성이 adult인 영화만
    추가기능 -> 블록키워드와 함께 합산하여 필터링
  */
  const filterMovies = (movies) =>
  (movies || []).filter((movie) => {
    const title = movie.title.toLowerCase();    // title을 모두 소문자로 변경, 금칙단어 검사 시 대소문자 구분없이 비교 가능하게
    // bannerKeywords 리스트 중 하나라도 제목에 포함되면 true
    const hasBannedKeyword = bannedKeywords.some(keyword => title.includes(keyword));
    // 특정 단어 쌍이 동시에 포함되어 있을 경우 필터링, 두 개의 단어조합도 같이 걸러냅니다. 
    const hasBannedPair = bannedPairs.some(([a, b]) => title.includes(a) && title.includes(b));
      //movie.adult가 true면 제외, 금칙단어 / 쌍이 포함되어 제외. 모두 아닌 경우에만 반환함.
      return !movie.adult && !hasBannedKeyword && !hasBannedPair;
  });

    // 추천 영화
    // useEffect로 fetch불러오기.
    useEffect(() => {
    async function fetchPopularMovies() {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`);
        const data = await res.json();
        setMovies(filterMovies(data.results));
      } catch (err) {
        console.error('인기 영화 가져오기 실패:', err);
      }
    }
    fetchPopularMovies();
  }, []);
    // 개봉예정영화 (한국기준)
    useEffect(() => {
    async function fetchUpcomingMovies() {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=ko-KR&region=KR&page=1`);
        const data = await res.json();
        setRecommended(filterMovies(data.results));
      } catch (err) {
        console.error('개봉 예정 영화 가져오기 실패:', err);
      }
    }
    fetchUpcomingMovies();
  }, []);


  return (
    <div className="p-4">
      {/* swiper */}
      <h2 className="text-white text-2xl mb-4">개봉 예정 영화</h2>
      <RecommendationSlider movies={recommended.slice(0, 10)} />

      {/* moviecard */}
      <h2 className="text-white text-2xl mt-10 mb-4">추천 영화</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
