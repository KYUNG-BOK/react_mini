import { useState, useEffect } from "react";
import { filterMovies, parseEnvKeywords, parseEnvKeywordPairs } from "../utils/filterMovies";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export function useFetchMovies(endpoint) {
  const [movies, setMovies] = useState([]);

   /*
  영상을 불러오는도중, adult 등록은 안되었는데 보기 민망할 정도의
  영상이 있어서, 추가로 필터링할 단어들을 등록하였습니다. 
  단어조차 적는것도 별로라서 별도의 파일에 넣어놓고 임포트해서 사용하였습니다.
  */
  const bannedKeywords = parseEnvKeywords(import.meta.env.VITE_BANNED_KEYWORDS);
  const bannedPairs = parseEnvKeywordPairs(import.meta.env.VITE_BANNED_KEYWORD_PAIRS);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${endpoint}?api_key=${API_KEY}&language=ko-KR&page=1`);
        const data = await res.json();
        setMovies(filterMovies(data.results, bannedKeywords, bannedPairs));
      } catch (err) {
        console.error(`${endpoint} 영화 가져오기 실패:`, err);
      }
    }
    fetchData();
  }, [endpoint]);

  return movies;
}
