import React from 'react';

// 디테일페이지에서 제어할 수 있도록
export default function MoviePosterSection({ movie, baseUrl, className = '' }) {
  return (
    <div className={`w-full md:w-1/3 max-w-xs shadow-xl rounded-xl overflow-hidden ${className}`}>
      <img
        src={`${baseUrl}${movie.poster_path}`}
        alt={movie.title}
        className="w-full object-cover rounded-xl"
      />
    </div>
  );
}