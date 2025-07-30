// Zustand에서 상태 저장소를 만들기 위한 create 함수 import
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../../supabaseClient'; // supabase정보 불러오기

// Zustand 저장소 생성 - persist 미들웨어로 상태를 브라우저에 영구 저장
const useAuthStore = create(
  persist(
    (set, get, api) => ({
      user: null,
      isLoggedIn: false,

      login: (userData) =>
        set({ user: userData, isLoggedIn: true }),
      
      // 로그아웃은 되었지만 새로고침했을때 로그인이 유지되는 현상 발견되어, 수정진행
      logout: async () => {
        await supabase.auth.signOut();  // supabase 세션 종료
        set({ user: null, isLoggedIn: false });
        localStorage.removeItem('auth-storage'); // persist된 상태 초기화
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

export default useAuthStore;

