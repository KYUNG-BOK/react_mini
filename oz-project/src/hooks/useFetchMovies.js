import { useState, useEffect } from "react";
import { filterMovies, parseEnvKeywords, parseEnvKeywordPairs } from "../utils/filterMovies";

// TMDB API 키를 .env에서 불러옴
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// 커스텀 훅: popular, upcoming 영화 데이터를 불러오고 필터링
export function useFetchMovies(endpoint) {
  // 상태 변수: 필터링된 영화 목록을 저장
  const [movies, setMovies] = useState([]);
  

  /*
  영상을 불러오는도중, adult 등록은 안되었는데 보기 민망할 정도의
  영상이 있어서, 추가로 필터링할 단어들을 등록하였습니다. 
  단어조차 적는것도 별로라서 별도의 파일에 넣어놓고 임포트해서 사용하였습니다.
  */

  // 금지 키워드를 환경 변수에서 불러와 파싱 (단어 단위 필터링)
  const bannedKeywords = parseEnvKeywords(import.meta.env.VITE_BANNED_KEYWORDS);

  // 금지 키워드 쌍을 환경 변수에서 불러와 파싱 (단어 조합 필터링)
  const bannedPairs = parseEnvKeywordPairs(import.meta.env.VITE_BANNED_KEYWORD_PAIRS);

  useEffect(() => {
    // 비동기 함수: 영화 데이터를 API로부터 가져옴
    async function fetchData() {
      try {
        // TMDB API 요청: 지정된 endpoint의 한국어 영화 데이터를 가져옴 (1페이지 기준)
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${endpoint}?api_key=${API_KEY}&language=ko-KR&page=1`
        );

        // 응답을 JSON 형식으로 파싱
        const data = await res.json();

        // 필터링 함수 적용: 금지된 키워드와 키워드 쌍이 포함되지 않은 영화만 저장
        setMovies(filterMovies(data.results, bannedKeywords, bannedPairs));
      } catch (err) {
        // 에러 발생 시 콘솔에 출력
        console.error(`${endpoint} 영화 가져오기 실패:`, err);
      }
    }

    // 컴포넌트가 마운트되거나 endpoint가 변경될 때마다 fetch 실행
    fetchData();
  }, [endpoint]); // 의존성 배열: endpoint가 바뀌면 다시 실행됨

  // 필터링된 영화 목록 반환
  return movies;
}
