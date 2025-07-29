// Zustand에서 상태 저장소를 만들기 위한 create 함수 import
import { create } from 'zustand';

// Zustand 미들웨어 중 하나로, 상태를 localStorage 등에 자동 저장해주는 persist 함수 import
import { persist } from 'zustand/middleware';

// Zustand 저장소 생성 - persist 미들웨어로 상태를 브라우저에 영구 저장
const useAuthStore = create(
  persist(
    (set) => ({
      // 상태 정의하기

      user: null,                  // 현재 로그인한 사용자 정보 (null이면 로그인 안 된 상태)
      isLoggedIn: false,           // 로그인 여부 플래그

      // 로그인 함수 - 사용자 정보를 받아 상태 업데이트
      login: (userData) =>
        set({ user: userData, isLoggedIn: true }),

      // 로그아웃 함수 - 사용자 정보 제거 및 로그인 상태 false로 설정
      logout: () =>
        set({ user: null, isLoggedIn: false }),
    }),

    {
      // persist 설정 객체
      name: 'auth-storage', // localStorage에 저장될 key 이름
    }
  )
);

// 생성한 Zustand 스토어를 외부에서 사용할 수 있도록 export하기
export default useAuthStore;
