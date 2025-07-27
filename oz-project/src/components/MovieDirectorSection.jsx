import React from 'react';

export default function MovieDirectorSection({ director }) {
  if (!director) return null;
  return (
    <div className="relative z-10 max-w-6xl mx-auto px-6 pb-8">
      <h2 className="text-2xl font-bold mb-2 text-white">감독</h2>
      <p className="text-white text-lg">{director.name}</p>
    </div>
  );
}
