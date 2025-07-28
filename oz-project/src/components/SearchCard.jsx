import React from 'react';
import { Link } from 'react-router-dom';

function SearchCard({ movie, cardBgClass, textGrayClass }) {
  return (
    <div className={`${cardBgClass} p-4 rounded-lg`}>
      <Link to={`/details/${movie.id}`}>
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
              : '/default-poster.png'
          }
          alt={movie.title || movie.name}
          className="w-full h-[600px] object-cover rounded"
        />
        <h3 className="mt-2 text-xl">{movie.title || movie.name}</h3>
        <p className={`text-sm ${textGrayClass}`}>
          {movie.release_date
            ? movie.release_date.slice(0, 4)
            : movie.first_air_date
            ? movie.first_air_date.slice(0, 4)
            : 'N/A'}
        </p>
      </Link>
    </div>
  );
}

export default SearchCard;
