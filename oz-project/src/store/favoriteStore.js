import { create } from 'zustand';
import {
  addFavorite as supabaseAddFavorite,   // 찜 추가 api
  removeFavorite as supabaseRemoveFavorite,   // 찜 삭제 api
  getFavorites as supabaseGetFavorites,   // 찜 목록 조회 api
} from '../utils/favorite';

const useFavoriteStore = create((set) => ({
  // 찜한 영화 목록
  favorites: [],

  loadFavorites: async (userId) => {
    try {
      const favorites = await supabaseGetFavorites(userId);
      set({ favorites });
    } catch (error) {
      console.error('찜 목록 불러오기 실패:', error.message);
    }
  },

  addFavorite: async (userId, movie) => {
    try {
      // supabase추가 요청, 유저id(uuid)와 영화정보
      await supabaseAddFavorite(userId, movie);
      set((state) => ({
        favorites: [movie, ...state.favorites], // 추가한 영화가 앞으로 가도록
      }));
    } catch (error) {
      console.error('찜 추가 실패:', error.message);
    }
  },

  removeFavorite: async (userId, movieId) => {
    try {
      // supabase에 제거 요청, 유저id(uuid)와 영화정보
      await supabaseRemoveFavorite(userId, movieId);
      set((state) => ({
        favorites: state.favorites.filter((m) => m.id !== movieId),
      }));
    } catch (error) {
      console.error('찜 제거 실패:', error.message);
    }
  },
}));

export default useFavoriteStore;
