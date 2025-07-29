import React, { useState, useEffect } from 'react';
import { FiSearch } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import SignupModal from './SignupModal';
import LoginModal from './LoginModal';
import useAuthStore from '../store/zustand';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';
import useDebounce from '../hooks/useDebounce';

function NavBar() {
  const navigate = useNavigate();
  const { user, isLoggedIn, logout } = useAuthStore();
  const [search, setSearch] = useState('');
  const [searchType, setSearchType] = useState('title');
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { theme } = useTheme();

  const debounceSearch = useDebounce(search, 500);

  // 디바운스 완료 후 URL 변경하기
  useEffect(() => {
    if (debounceSearch.trim() === '') return;
    navigate(`/search?query=${encodeURIComponent(debounceSearch.trim())}&type=${searchType}`);
  }, [debounceSearch, searchType, navigate]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // 폼 제출 시 즉시 탐색(엔터, 버튼 클릭)
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search?query=${encodeURIComponent(search.trim())}&type=${searchType}`);
      setSearch('');
    }
  };

  const navBgClass = theme === 'light' ? 'bg-white text-black' : 'bg-black text-white';
  const inputBgClass = theme === 'light' ? 'bg-gray-200 text-black' : 'bg-gray-500 text-white';
  const selectBgClass = theme === 'light' ? 'bg-gray-300 text-black' : 'bg-gray-600 text-white';
  const buttonBgClass =
    theme === 'light' ? 'bg-gray-300 text-black hover:bg-gray-400' : 'bg-gray-600 text-white hover:bg-gray-700';

  return (
    <nav className={`${navBgClass} px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center sm:justify-between gap-4 sm:gap-0`}>
      {/* 로고 */}
      <div className="flex-shrink-0 flex items-center justify-between w-full sm:w-auto">
        <Link to="/">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold cursor-pointer select-none
                      bg-gradient-to-r from-red-500 via-yellow-400 to-pink-500
                      bg-clip-text text-transparent"
          >
            OZFlix
          </h1>
        </Link>

        {/* 모바일 전용: 로그인/회원가입 버튼 + 토글 버튼 옆 배치 */}
        <div className="sm:hidden flex gap-2 items-center">
          {isLoggedIn ? (
            <>
              <button onClick={logout} className={`${buttonBgClass} px-4 py-2 text-sm rounded-md`}>로그아웃</button>
              <ThemeToggle />
            </>
          ) : (
            <>
              <button onClick={() => setIsSignupOpen(true)} className={`${buttonBgClass} px-4 py-2 rounded-md text-sm font-semibold`}>회원가입</button>
              <button onClick={() => setIsLoginOpen(true)} className={`${buttonBgClass} px-4 py-2 rounded-md text-sm`}>로그인</button>
              <ThemeToggle />
            </>
          )}
        </div>
      </div>

      {/* 검색창 */}
      <form onSubmit={handleSearchSubmit} className="w-full sm:flex-grow sm:mx-6">
        <div
          className="
            relative flex 
            flex-col-reverse sm:flex-row 
            items-stretch sm:items-center 
            space-y-4 sm:space-y-0 sm:space-x-3
            sm:gap-0.5
            max-w-full sm:max-w-4xl 
            mx-auto"
        >
          {/* 검색 입력 */}
          <div className="relative flex-grow mb-0">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder={searchType === 'title' ? '영화명을 입력하세요.' : '출연 배우를 입력하세요.'}
              className={`w-full pl-10 pr-4 py-2 text-base sm:text-xl rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 ${inputBgClass}`}
            />
          </div>

          {/* 셀렉트박스 */}
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
            className={`py-2 sm:py-3 px-3 rounded-md text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-red-500 mt-0 sm:mt-auto ${selectBgClass}`}
          >
            <option value="title">영화 제목</option>
            <option value="actor">출연 배우</option>
          </select>
        </div>
      </form>

      {/* 데스크탑 이상 로그인/회원가입 + 토글 */}
      <div className="hidden sm:flex-shrink-0 sm:flex gap-4 items-center">
        {isLoggedIn ? (
          <>
            <span className="text-xl font-semibold">{user?.email}님 환영합니다</span>
            <button onClick={logout} className={`${buttonBgClass} px-6 py-3 text-lg rounded-md`}>로그아웃</button>
            <ThemeToggle />
          </>
        ) : (
          <>
            <button
              onClick={() => setIsSignupOpen(true)}
              className={`${buttonBgClass} bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg text-white text-[18px] font-semibold cursor-pointer`}
            >
              회원가입
            </button>
            <button
              onClick={() => setIsLoginOpen(true)}
              className={`${buttonBgClass} px-6 py-3 text-lg rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors cursor-pointer`}
            >
              로그인
            </button>
            <ThemeToggle />
          </>
        )}
      </div>

      {isSignupOpen && <SignupModal onClose={() => setIsSignupOpen(false)} />}
      {isLoginOpen && <LoginModal onClose={() => setIsLoginOpen(false)} />}
    </nav>
  );
}

export default NavBar;
