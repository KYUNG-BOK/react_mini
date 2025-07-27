import React from 'react';

export default function MovieSummarySection({ movie }) {
  return (
    <div className="flex-1 text-white space-y-6">
      <h1 className="text-4xl font-extrabold">{movie.title}</h1>

      <p className="text-yellow-400 text-lg font-semibold">
        ⭐ {movie.vote_average} / 10 ({movie.vote_count.toLocaleString()}명)
      </p>

      <div className="flex flex-wrap gap-2">
        {movie.genres.map((g) => (
          <span
            key={g.id}
            className="bg-red-600/80 px-3 py-1 rounded-full text-sm font-medium"
          >
            {g.name}
          </span>
        ))}
      </div>

      <p className="text-gray-300 leading-relaxed text-base">
        {movie.overview || '등록된 시놉시스가 없습니다.'}
      </p>

      <div className="flex gap-4">
        <button className="bg-white text-black font-semibold px-5 py-2 rounded-lg hover:bg-gray-200 transition">
          ▶ 재생
        </button>
        <button className="bg-gray-700/60 px-5 py-2 rounded-lg hover:bg-gray-600 transition">
          + 찜하기
        </button>
      </div>
    </div>
  );
}
