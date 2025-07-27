import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MovieBackdrop from '../components/MovieBackdrop';
import MoviePosterSection from '../components/MoviePosterSection';
import MovieSummarySection from '../components/MovieSummarySection';
import MovieTrailerSection from '../components/MovieTrailerSection';
import MovieDirectorSection from '../components/MovieDirectorSection';
import MovieCastSection from '../components/MovieCastSection';

const baseUrl = 'https://image.tmdb.org/t/p/original';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [cast, setCast] = useState([]);
  const [director, setDirector] = useState(null);
  const [trailers, setTrailers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const movieRes = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=ko-KR`
        );
        const movieData = await movieRes.json();
        setMovie(movieData);

        const creditsRes = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=ko-KR`
        );
        const creditsData = await creditsRes.json();
        setCast(creditsData.cast.slice(0, 8));
        const foundDirector = creditsData.crew.find(
          (member) => member.job === 'Director'
        );
        setDirector(foundDirector);

        const videosRes = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}&language=ko-KR`
        );
        const videosData = await videosRes.json();
        const trailers = videosData.results.filter(
          (v) => v.type === 'Trailer' && v.site === 'YouTube'
        );
        setTrailers(trailers);
      } catch (error) {
        console.error('데이터 불러오기 실패:', error);
      }
    }
    fetchData();
    window.scrollTo(0, 0);
  }, [id]);

  if (!movie) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-lg">영화 정보를 불러오는 중입니다...</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen text-white">
      <MovieBackdrop imageUrl={`${baseUrl}${movie.backdrop_path || movie.poster_path}`} />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-10 items-start">
        <MoviePosterSection movie={movie} baseUrl={baseUrl} />
        <MovieSummarySection movie={movie} />
      </div>

      <MovieTrailerSection trailers={trailers} />
      <MovieDirectorSection director={director} />
      <MovieCastSection cast={cast} baseUrl={baseUrl} />
    </div>
  );
}
