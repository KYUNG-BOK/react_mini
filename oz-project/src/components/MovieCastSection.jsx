import React from 'react';

export default function MovieCastSection({ cast, baseUrl }) {
  return (
    <div className="relative z-10 max-w-6xl mx-auto px-6 pb-20">
      <h2 className="text-2xl font-bold mb-4 text-white">출연진</h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {cast.map((actor) => (
          <div key={actor.cast_id} className="text-center text-white">
            <img
              src={
                actor.profile_path
                  ? `${baseUrl}${actor.profile_path}`
                  : 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png'
              }
              alt={actor.name}
              // aspect : 너비에 따라 높이 자동조절됨.
              className="rounded-lg w-full aspect-[3/4] object-cover mb-2" 
            />
            <p className="font-semibold">{actor.name}</p>
            <p className="text-sm text-gray-400">{actor.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
