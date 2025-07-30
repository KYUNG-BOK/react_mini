import { useEffect, useState } from 'react';

// TMDB API 키를 환경 변수에서 갖고오기
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// 원하는 영화의 타입을 지정합니다.
export function useInfiniteMovies(type = 'popular') {
  // 영화 목록 상태
  const [movies, setMovies] = useState([]);

  // 현재 페이지 상태 (1페이지부터 시작)
  const [page, setPage] = useState(1);

  // 로딩 여부 상태 (중복 요청 방지용)
  const [loading, setLoading] = useState(false);

  // 더 가져올 데이터가 있는지 여부
  const [hasMore, setHasMore] = useState(true);

  // 영화 데이터를 API로부터 비동기로 가져오는 함수
  const fetchMovies = async () => {
    // 이미 로딩 중이거나 더 가져올 데이터가 없으면 요청 중지
    if (loading || !hasMore) return;

    // 로딩 상태 true로 설정
    setLoading(true);
    try {
      // API 호출
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${type}?api_key=${API_KEY}&language=ko&page=${page}`
      );

      // 응답 데이터를 JSON 형태로 변환
      const data = await res.json();

      // 받아온 결과가 없다면 더 이상 불러올 데이터 없음
      if (data.results.length === 0) {
        setHasMore(false);
      } else {
        // 기존 영화 목록에 새로 받아온 영화들을 추가
        setMovies((prev) => [...prev, ...data.results]);

        // 페이지 번호를 증가시켜 다음 요청 준비
        setPage((prev) => prev + 1);
      }
    } catch (err) {
      // 에러 발생 시 콘솔에 출력
      console.error(err);
    } finally {
      // 요청 종료 후 로딩 상태 false로 변경
      setLoading(false);
    }
  };

  // 스크롤 이벤트 핸들러 (화면 하단 근처에 도달하면 fetchMovies 실행)
  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

      // 사용자가 페이지 하단 300px 이내로 스크롤하면 다음 페이지 요청
      if (scrollTop + clientHeight >= scrollHeight - 300) {
        fetchMovies();
      }
    };

    // throttle: 일정 시간 간격으로만 함수 실행되도록 제한 (스크롤 이벤트 과도한 실행 방지)
    const throttle = (func, delay) => {
      let inThrottle;
      return () => {
        if (!inThrottle) {
          func();
          inThrottle = true;
          setTimeout(() => (inThrottle = false), delay);
        }
      };
    };

    // 전 300ms 간격으로 실행되게 할게요.
    const throttled = throttle(handleScroll, 300);

    // 스크롤 이벤트 리스너 등록
    window.addEventListener('scroll', throttled);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => window.removeEventListener('scroll', throttled);
  }, [page, loading, hasMore]);

  // 최초 마운트 시 1페이지 로딩 실행
  useEffect(() => {
    fetchMovies();
  }, []);

  // 외부에서 사용할 수 있도록 movies, loading 상태 반환
  return { movies, loading };
}
