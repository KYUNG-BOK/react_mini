import React from "react";
import { useFetchMovies } from "../hooks/useFetchMovies";
import MovieSection from "../components/MovieSection";

export default function App() {
  const recommended = useFetchMovies("upcoming");
  const movies = useFetchMovies("popular");

  return (
    <div className="p-4">
      <MovieSection title="개봉 영화" movies={recommended} slider />


      <MovieSection title="추천 영화" movies={movies} grid="lg" />
    </div>

  );
}
