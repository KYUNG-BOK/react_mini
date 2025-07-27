import React from 'react';

export default function MovieTrailerSection({ trailers }) {
  return trailers.length > 0 ? (
    <div className="relative z-10 mx-auto px-4 py-10 max-w-6xl">
      <h2 className="text-2xl font-bold mb-4 text-white">트레일러 예고편</h2>
      <div className="w-full h-[450px]">
        <iframe
          src={`https://www.youtube.com/embed/${trailers[0].key}`}
          title="Trailer"
          allowFullScreen
          className="w-full h-full rounded-lg shadow-lg"
        />
      </div>
    </div>
  ) : (
    <div className="relative z-10 mx-auto px-4 py-10 max-w-6xl">
      <h2 className="text-2xl font-bold mb-4 text-white">예고편</h2>
      <p className="text-white text-lg">해당 영화는 트레일러 영상이 제공되지 않습니다.</p>
    </div>
  );
}
