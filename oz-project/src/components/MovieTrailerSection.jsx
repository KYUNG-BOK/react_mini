import React from 'react';

export default function MovieTrailerSection({ trailers, showTrailer, setShowTrailer }) {
  if (trailers.length === 0) {
    return (
      <div className="relative z-10 mx-auto px-4 py-10 max-w-6xl">
        <h2 className="text-2xl font-bold mb-4 text-white">예고편</h2>
        <p className="text-white text-lg">해당 영화는 트레일러 영상이 제공되지 않습니다.</p>
      </div>
    );
  }

  return (
    <div className="relative z-10 mx-auto px-4 py-10 max-w-6xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">트레일러 예고편</h2>
        <button
          onClick={() => setShowTrailer(!showTrailer)}
          className="px-4 py-2 bg-black hover:bg-gray-700 rounded-md transition"
        >
          {showTrailer ? '트레일러 숨기기' : '트레일러 영상 보기'}
        </button>
      </div>

      {/* showTrailer가 true일 때만 iframe 보여주기 */}
      {showTrailer && (
        <div className="w-full h-[450px]">
          <iframe
            src={`https://www.youtube.com/embed/${trailers[0].key}`}
            title="Trailer"
            allowFullScreen
            className="w-full h-full rounded-lg shadow-lg"
          />
        </div>
      )}
    </div>
  );
}
