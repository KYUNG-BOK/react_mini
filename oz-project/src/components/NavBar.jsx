import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/zustand';
import { supabase } from '../../supabaseClient';
import LogoSection from './LogoSection';
import SearchBar from './SearchBar';
import UserMenu from './UserMenu';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import useDebounce from '../hooks/useDebounce';
import { useTheme } from '../context/ThemeContext';

function NavBar() {
  const navigate = useNavigate();
  const { user, isLoggedIn, logout, login } = useAuthStore();
  const [search, setSearch] = useState('');
  const [searchType, setSearchType] = useState('title');
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const [isUserMenuOpenMobile, setIsUserMenuOpenMobile] = useState(false);
  const [isUserMenuOpenDesktop, setIsUserMenuOpenDesktop] = useState(false);

  const userMenuRefMobile = useRef(null);
  const dropdownRefMobile = useRef(null);
  const userMenuRefDesktop = useRef(null);
  const dropdownRefDesktop = useRef(null);
  const debounceSearch = useDebounce(search, 500);

  // 다크/라이트 모드 클래스
  const { theme } = useTheme();     // 앗.. 헷가리다니
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

  // 로그인 상태 유저 정보 불러오기
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

  // 외부 클릭 감지 (모바일)
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

  // 외부 클릭 감지 (데스크탑)
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

  // 검색어 변경 핸들러
  const handleSearchChange = (e) => setSearch(e.target.value);

  // 검색 폼 제출 핸들러
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(
        `/search?query=${encodeURIComponent(search.trim())}&type=${searchType}`
      );
      setSearch('');
    }
  };

  return (
    <nav
      className={`${navBgClass} px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center sm:justify-between gap-4 sm:gap-0`}
    >
      <LogoSection
        isLoggedIn={isLoggedIn}
        user={user}
        onLogout={logout}
        onUserMenuToggle={() => setIsUserMenuOpenMobile((prev) => !prev)}
        isUserMenuOpenMobile={isUserMenuOpenMobile}
        userMenuRefMobile={userMenuRefMobile}
        dropdownRefMobile={dropdownRefMobile}
      />

      <SearchBar
        search={search}
        onSearchChange={handleSearchChange}
        onSearchSubmit={handleSearchSubmit}
        searchType={searchType}
        onSearchTypeChange={(e) => setSearchType(e.target.value)}
        inputBgClass={inputBgClass}
        selectBgClass={selectBgClass}
      />

      <UserMenu
        isLoggedIn={isLoggedIn}
        user={user}
        onLogout={logout}
        isUserMenuOpenDesktop={isUserMenuOpenDesktop}
        setIsUserMenuOpenDesktop={setIsUserMenuOpenDesktop}
        userMenuRefDesktop={userMenuRefDesktop}
        dropdownRefDesktop={dropdownRefDesktop}
        buttonBgClass={buttonBgClass}
        onLoginClick={() => setIsLoginOpen(true)}
        onSignupClick={() => setIsSignupOpen(true)}
      />

     
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
