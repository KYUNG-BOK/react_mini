import { createContext, useContext, useEffect, useState } from "react";

// 1. ThemeContext 생성 (전역 테마 상태 공유용 컨텍스트)
const ThemeContext = createContext();

// 2. ThemeProvider 컴포넌트: 하위 컴포넌트에 테마 상태와 토글 함수 제공함
export const ThemeProvider = ({ children }) => {
  // 3. 초기 테마 상태 설정: localStorage에 저장된 값이 있으면 사용, 없으면 기본값 'dark'
  const [theme, setTheme] = useState(() =>
    localStorage.getItem("theme") || "dark"
  );

  // 4. theme 상태가 변경될 때마다 실행되는 사이드 이펙트
  useEffect(() => {
    const root = window.document.documentElement; // html 루트 요소 선택

    if (theme === "dark") {
      // 5-1. 다크 테마면 html에 'dark' 클래스 추가, 'light' 클래스 제거
      root.classList.add("dark");
      root.classList.remove("light");
    } else {
      // 5-2. 라이트 테마면 html에 'light' 클래스 추가, 'dark' 클래스 제거
      root.classList.remove("dark");
      root.classList.add("light");
    }

    // 6. 현재 테마 상태를 localStorage에 저장하여 새로고침 후에도 유지하도록 함
    localStorage.setItem("theme", theme);
  }, [theme]);

  // 7. 테마 토글 함수: 현재 상태가 'dark'이면 'light'로, 아니면 'dark'로 변경
  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  // 8. 하위 컴포넌트에게 theme와 toggleTheme 함수를 context로 제공
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 9. useTheme 훅: context 값을 편리하게 사용하기 위한 커스텀 훅
export const useTheme = () => useContext(ThemeContext);
