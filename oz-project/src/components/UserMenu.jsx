import React from 'react';
import { FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

export default function UserMenu({
  isLoggedIn,
  user,
  onLogout,
  isUserMenuOpenDesktop,
  setIsUserMenuOpenDesktop,
  userMenuRefDesktop,
  dropdownRefDesktop,
  buttonBgClass,
  onLoginClick,
  onSignupClick,
}) {
  return (
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
                  onLogout();
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
            onClick={onSignupClick}
            className={`${buttonBgClass} bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg text-white text-[18px] font-semibold cursor-pointer`}
          >
            회원가입
          </button>
          <button
            onClick={onLoginClick}
            className={`${buttonBgClass} px-6 py-3 text-lg rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors cursor-pointer`}
          >
            로그인
          </button>
          <ThemeToggle />
        </>
      )}
    </div>
  );
}
