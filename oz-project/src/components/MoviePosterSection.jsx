import React from 'react';

export default function MoviePosterSection({ movie, baseUrl }) {
  return (
    <div className="w-full md:w-1/3 max-w-xs shadow-xl rounded-xl overflow-hidden">
      <img
        src={`${baseUrl}${movie.poster_path}`}
        alt={movie.title}
        className="w-full object-cover rounded-xl"
      />
    </div>
  );
}
