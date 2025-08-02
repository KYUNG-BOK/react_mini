import { createContext, useContext, useEffect, useState } from "react";

// 1. ThemeContext 생성: 전역에서 테마 정보를 공유하기 위한 컨텍스트 객체
const ThemeContext = createContext();

// 2. ThemeProvider 컴포넌트: 하위 컴포넌트에 theme 상태와 toggle 함수 제공
export const ThemeProvider = ({ children }) => {
  // 3. theme 상태: localStorage에 저장된 값 사용 (기본값은 'dark')
  const [theme, setTheme] = useState(() =>
    localStorage.getItem("theme") || "dark"
  );

  // 4. 테마 상태가 변경될 때마다 HTML 루트에 클래스 적용 + localStorage 저장
  useEffect(() => {
    const root = document.documentElement; // <html> 요소
    root.classList.remove("light", "dark"); // 기존 클래스 제거
    root.classList.add(theme);              // 현재 테마 클래스 추가
    localStorage.setItem("theme", theme);   // 현재 테마 상태를 localStorage에 저장
  }, [theme]);

  // 5. 테마 토글 함수: 'dark' <-> 'light' 전환
  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  // 6. context value로 theme 값과 toggle 함수 제공
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 7. useTheme 커스텀 훅: ThemeContext를 간편하게 사용하기 위한 헬퍼
export const useTheme = () => useContext(ThemeContext);
