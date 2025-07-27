import React from "react";
import MovieCard from "./MovieCard";
import RecommendationSlider from "./RecommendationSlider";

export default function MovieSection({ title, movies, slider, grid }) {
  return (
    <section className="mb-10">
      <h2 className="text-white text-2xl mb-4">{title}</h2>
      {slider ? (
        <RecommendationSlider movies={movies.slice(0, 10)} />
      ) : (
        <div className={`grid gap-4 ${grid === 'lg' ? 'grid-cols-5' : grid === 'md' ? 'grid-cols-3' : 'grid-cols-2'}`}>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </section>
  );
}
