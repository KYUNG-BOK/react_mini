import MovieBackdrop from '../components/MovieBackdrop';
import MoviePosterSection from '../components/MoviePosterSection';
import MovieTrailerSection from '../components/MovieTrailerSection';
import MovieDirectorSection from '../components/MovieDirectorSection';
import MovieCastSection from '../components/MovieCastSection';

{
  /* 디테일페이지 컴포넌트별 분리 완료 */
}
<>
  {/* 뒷배경영역 */}
  <MovieBackdrop
    imageUrl={`${baseUrl}${movie.backdrop_path || movie.poster_path}`}
  />

  <div className="relative z-10 max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-10 items-center">
    <div className="w-full md:w-1/3 max-w-xs shadow-xl rounded-xl overflow-hidden">
      <img
        src={`${baseUrl}${movie.poster_path}`}
        alt={movie.title}
        className="w-full object-cover"
      />
    </div>
    {/* 포스터/세부 영역 */}
    <MoviePosterSection movie={movie} />
  </div>
  {/* 트레일러/영화미리보기 영역 */}
  <MovieTrailerSection trailers={trailers} />
  {/* 영화 감독소개 영역 */}
  <MovieDirectorSection director={director} />
  {/* 영화 출연진소개 영역 */}
  <MovieCastSection cast={cast} baseUrl={baseUrl} />
</>;
