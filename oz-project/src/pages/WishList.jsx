import React, { useEffect } from 'react';
import useAuthStore from '../store/zustand';
import useFavoriteStore from '../store/favoriteStore';
import MovieCard from '../components/MovieCard';

function WishList() {
  const { user } = useAuthStore();
  const { favorites, loadFavorites, removeFavorite } = useFavoriteStore();

  useEffect(() => {
    if (user) {
      loadFavorites(user.id);
    }
  }, [user]);

  return (
    <div className="max-w-6xl mx-auto py-8">
      <h2 className="text-3xl font-bold mb-6">
        👤 {user?.name}님의 위시리스트
      </h2>

      {favorites.length === 0 ? (
        <p className="text-gray-500">찜한 영화가 없습니다.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {favorites.map((movie) => (
            <div key={movie.id} className="relative group">
                {/* 카드 재활용하기 */}
              <MovieCard movie={movie} />
              <button
                onClick={() => removeFavorite(user.id, movie.id)}
                className="absolute top-2 right-2 z-10 bg-black bg-opacity-60 rounded-full p-1 text-red-400 hover:text-red-600 transition-opacity opacity-0 group-hover:opacity-100"
                aria-label="찜 해제"
                type="button"
              >
                💔
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default WishList;
