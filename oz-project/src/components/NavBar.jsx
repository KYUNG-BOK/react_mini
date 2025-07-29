import React, { useState, useEffect, useRef } from 'react';
import { FiSearch, FiUser } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import SignupModal from './SignupModal';
import LoginModal from './LoginModal';
import useAuthStore from '../store/zustand';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';
import useDebounce from '../hooks/useDebounce';
import { supabase } from '../../supabaseClient'; // 카카오 연동 시작

function NavBar() {
  const navigate = useNavigate();
  const { user, isLoggedIn, logout } = useAuthStore();
  const [search, setSearch] = useState('');
  const [searchType, setSearchType] = useState('title');
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { theme } = useTheme();
  const { login } = useAuthStore(); // 유저정보 불러오기

  // 유저 메뉴 열림 상태를 모바일, 데스크탑 따로 관리 (권장)
  const [isUserMenuOpenMobile, setIsUserMenuOpenMobile] = useState(false);
  const [isUserMenuOpenDesktop, setIsUserMenuOpenDesktop] = useState(false);

  // ref도 각각 분리
  const userMenuRefMobile = useRef(null);
  const dropdownRefMobile = useRef(null);
  const userMenuRefDesktop = useRef(null);
  const dropdownRefDesktop = useRef(null);

  const debounceSearch = useDebounce(search, 500);
  // 카카오 로그인정보 불러오기

  useEffect(() => {
    const fetchUserInfo = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { user_metadata } = user;

        login({
          id: user.id,
          name: user_metadata?.name || user_metadata?.full_name || '사용자',
          email: user.email,
        });
      }
    };

    fetchUserInfo();
  }, [login]);

  // 검색어 변경에 따른 네비게이션
  useEffect(() => {
    if (debounceSearch.trim() === '') return;

    navigate(
      `/search?query=${encodeURIComponent(
        debounceSearch.trim()
      )}&type=${searchType}`,
      { replace: true }
    );

    setSearch('');
  }, [debounceSearch, searchType, navigate]);

  // 모바일 메뉴 외부 클릭 감지해서 닫기
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        userMenuRefMobile.current &&
        !userMenuRefMobile.current.contains(event.target) &&
        dropdownRefMobile.current &&
        !dropdownRefMobile.current.contains(event.target)
      ) {
        setIsUserMenuOpenMobile(false);
      }
    }

    if (isUserMenuOpenMobile) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isUserMenuOpenMobile]);

  // 데스크탑 메뉴 외부 클릭 감지해서 닫기
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        userMenuRefDesktop.current &&
        !userMenuRefDesktop.current.contains(event.target) &&
        dropdownRefDesktop.current &&
        !dropdownRefDesktop.current.contains(event.target)
      ) {
        setIsUserMenuOpenDesktop(false);
      }
    }

    if (isUserMenuOpenDesktop) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isUserMenuOpenDesktop]);

  const handleSearchChange = (e) => setSearch(e.target.value);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(
        `/search?query=${encodeURIComponent(search.trim())}&type=${searchType}`
      );
      setSearch('');
    }
  };

  // 다크/라이트모드 클래스
  const navBgClass =
    theme === 'light' ? 'bg-white text-black' : 'bg-black text-white';
  const inputBgClass =
    theme === 'light' ? 'bg-gray-200 text-black' : 'bg-gray-500 text-white';
  const selectBgClass =
    theme === 'light' ? 'bg-gray-300 text-black' : 'bg-gray-600 text-white';
  const buttonBgClass =
    theme === 'light'
      ? 'bg-gray-300 text-black hover:bg-gray-400'
      : 'bg-gray-600 text-white hover:bg-gray-700';

  return (
    <nav
      className={`${navBgClass} px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center sm:justify-between gap-4 sm:gap-0`}
    >
      {/* 로고 + 모바일 메뉴 영역 */}
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

        {/* 모바일 로그인 상태에서 썸네일 + 테마 토글 */}
        {isLoggedIn && (
          <div className="sm:hidden flex items-center gap-2 relative">
            <button
              ref={userMenuRefMobile}
              onClick={() => setIsUserMenuOpenMobile((prev) => !prev)}
              className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-300 hover:bg-opacity-20 focus:outline-none"
              aria-haspopup="true"
              aria-expanded={isUserMenuOpenMobile}
              aria-label="사용자 메뉴 열기"
              type="button"
            >
              <FiUser size={24} />
            </button>

            {isUserMenuOpenMobile && (
              <div
                ref={dropdownRefMobile}
                className="absolute right-0 top-full mt-2 w-40 bg-white text-black rounded-md shadow-lg py-2 z-50"
              >
                <div className="px-4 py-2 border-b">{user?.name}님</div>
                <Link
                  to="/mypage"
                  className="block px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => setIsUserMenuOpenMobile(false)}
                >
                  마이 페이지
                </Link>
                <button
                  onClick={() => {
                    console.log('로그아웃 클릭 (모바일)');
                    logout();
                    setIsUserMenuOpenMobile(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200 cursor-pointer"
                >
                  로그아웃
                </button>
              </div>
            )}

            <ThemeToggle />
          </div>
        )}

        {/* 모바일 비로그인 상태에서 회원가입, 로그인 버튼 + 토글 */}
        {!isLoggedIn && (
          <div className="sm:hidden flex gap-2 items-center">
            <button
              onClick={() => setIsSignupOpen(true)}
              className={`${buttonBgClass} px-4 py-2 rounded-md text-sm font-semibold`}
            >
              회원가입
            </button>
            <button
              onClick={() => setIsLoginOpen(true)}
              className={`${buttonBgClass} px-4 py-2 rounded-md text-sm`}
            >
              로그인
            </button>
            <ThemeToggle />
          </div>
        )}
      </div>

      {/* 검색창 */}
      <form
        onSubmit={handleSearchSubmit}
        className="w-full sm:flex-grow sm:mx-6"
      >
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
            <FiSearch
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder={
                searchType === 'title'
                  ? '영화명을 입력하세요.'
                  : '출연 배우를 입력하세요.'
              }
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

      {/* 데스크탑 로그인 상태 + 토글 */}
      <div className="hidden sm:flex flex-shrink-0 gap-4 items-center relative">
        {isLoggedIn ? (
          <>
            <button
              ref={userMenuRefDesktop}
              onClick={() => setIsUserMenuOpenDesktop((prev) => !prev)}
              className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-300 hover:bg-opacity-20 focus:outline-none"
              aria-haspopup="true"
              aria-expanded={isUserMenuOpenDesktop}
              aria-label="사용자 메뉴 열기"
              type="button"
            >
              <FiUser size={24} />
            </button>

            {isUserMenuOpenDesktop && (
              <div
                ref={dropdownRefDesktop}
                className="absolute right-0 top-full mt-2 w-40 bg-white text-black rounded-md shadow-lg py-2 z-50"
              >
                <div className="px-4 py-2 border-b">{user?.name}님</div>
                <Link
                  to="/mypage"
                  className="block px-4 py-2 hover:bg-gray-200 cursor-pointer"
                  onClick={() => setIsUserMenuOpenDesktop(false)}
                >
                  마이 페이지
                </Link>
                <button
                  onClick={() => {
                    console.log('로그아웃 클릭 (데스크탑)');
                    logout();
                    setIsUserMenuOpenDesktop(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-200 cursor-pointer"
                >
                  로그아웃
                </button>
              </div>
            )}

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

      {/* 모달 -> login 및 signup모달에 props 내려주기*/}
      {isSignupOpen && (
        <SignupModal
          onClose={() => setIsSignupOpen(false)}
          openLogin={() => {
            setIsLoginOpen(true);
            setIsSignupOpen(false);
          }}
        />
      )}
      {isLoginOpen && (
        <LoginModal
          onClose={() => setIsLoginOpen(false)}
          openSignup={() => {
            setIsSignupOpen(true);
            setIsLoginOpen(false);
          }}
        />
      )}
    </nav>
  );
}

export default NavBar;
