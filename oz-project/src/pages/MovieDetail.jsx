import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// 컴포넌트 구성요소 불러오기
import MovieBackdrop from '../components/MovieBackdrop';
import MoviePosterSection from '../components/MoviePosterSection';
import MovieSummarySection from '../components/MovieSummarySection';
import MovieTrailerSection from '../components/MovieTrailerSection';
import MovieDirectorSection from '../components/MovieDirectorSection';
import MovieCastSection from '../components/MovieCastSection';

// 이미지 출력용 base URL
const baseUrl = 'https://image.tmdb.org/t/p/original';

// 환경변수에서 TMDB API 키 불러오기
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function MovieDetail() {
  // URL 파라미터에서 영화 ID 추출
  const { id } = useParams();

  // 404페이지 이동하기 위해서 navigate 불러오기
  const navigate = useNavigate();

  // 영화 기본 정보
  const [movie, setMovie] = useState(null);
  // 출연 배우 목록
  const [cast, setCast] = useState([]);
  // 감독 정보
  const [director, setDirector] = useState(null);
  // 예고편(트레일러) 영상 목록
  const [trailers, setTrailers] = useState([]);
  // 트레일러 숨기기 토글
  const [showTrailer, setShowTrailer] = useState(false);

  // 컴포넌트 마운트 시 실행
  useEffect(() => {
    async function fetchData() {
      try {
        // 영화 상세 정보 요청
        const movieRes = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=ko-KR`
        );

        if (movieRes.status === 404) {
          //영화가 없으면 404로 이동하기
          navigate('/404');
          return;
        }

        const movieData = await movieRes.json();
        setMovie(movieData); // 상태 저장

        // 출연진 & 제작진 정보 요청
        const creditsRes = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=ko-KR`
        );
        const creditsData = await creditsRes.json();
        setCast(creditsData.cast.slice(0, 8)); // 상위 8명만 저장

        // 감독 찾기
        const foundDirector = creditsData.crew.find(
          (member) => member.job === 'Director'
        );
        setDirector(foundDirector); // 감독 정보 저장

        // 예고편 영상 요청
        const videosRes = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=ko-KR`
        );
        const videosData = await videosRes.json();

        // 유튜브 예고편만 필터링
        const trailers = videosData.results.filter(
          (v) => v.type === 'Trailer' && v.site === 'YouTube'
        );
        setTrailers(trailers); // 예고편 저장
      } catch (error) {
        console.error('데이터 불러오기 실패:', error); // 에러 처리
      }
    }

    fetchData(); // 데이터 요청 시작
    window.scrollTo(0, 0); // 페이지 최상단으로 스크롤 이동
  }, [id]); // 영화 ID가 바뀔 때마다 실행

  // 영화 정보 로딩 중일 때 스켈레톤 UI 왕허접....ㅠㅠ
  if (!movie) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-lg">영화 정보를 불러오는 중입니다...</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-white">
      {/* 영화 배경 이미지 섹션 */}
      <MovieBackdrop
        imageUrl={`${baseUrl}${movie.backdrop_path || movie.poster_path}`}
      />

      {/* 포스터 및 영화 요약 섹션 */}
      <div
        className="
            relative
            max-w-6xl mx-auto px-6 py-10
            flex flex-col md:flex-row gap-10 items-start
            z-0 md:z-10"
      >
        <MoviePosterSection
          movie={movie}
          baseUrl={baseUrl}
          className="hidden md:block"
        />
        <MovieSummarySection
          movie={movie}
          className="relative z-0 md:z-10 mt-[210px] md:mt-0"
        />
      </div>

      {/* 예고편 섹션 */}
      {/* MovieTrailerSection에 showTrailer, setShowTrailer 전달 */}
      <MovieTrailerSection
        trailers={trailers}
        showTrailer={showTrailer}
        setShowTrailer={setShowTrailer}
      />

      {/* 감독 정보 섹션 */}
      <MovieDirectorSection director={director} />

      {/* 출연 배우 섹션 */}
      <MovieCastSection cast={cast} baseUrl={baseUrl} />
    </div>
  );
}
