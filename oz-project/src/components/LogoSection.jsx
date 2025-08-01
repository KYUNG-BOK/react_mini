import React from 'react';
import { Link } from 'react-router-dom';
import { FiUser } from 'react-icons/fi';
import ThemeToggle from './ThemeToggle';

export default function LogoSection({
  isLoggedIn,
  user,
  onLogout,
  onUserMenuToggle,
  isUserMenuOpenMobile,
  userMenuRefMobile,
  dropdownRefMobile,
}) {
  return (
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

      {isLoggedIn ? (
        <div className="sm:hidden flex items-center gap-2 relative">
          <button
            ref={userMenuRefMobile}
            onClick={onUserMenuToggle}
            className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-300 hover:bg-opacity-20 focus:outline-none"
            aria-haspopup="true"
            aria-expanded={isUserMenuOpenMobile}
            aria-label="사용자 메뉴 열기"
            type="button"
          >
                          {user?.avatar_url ? (
                            <img
                              src={user.avatar_url}
                              alt="User Avatar"
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          ) : (
                            <FiUser size={24} />
                          )}
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
                onClick={() => onUserMenuToggle()}
              >
                마이 페이지
              </Link>
              <button
                onClick={() => {
                  onLogout();
                  onUserMenuToggle();
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-200 cursor-pointer"
              >
                로그아웃
              </button>
            </div>
          )}

          <ThemeToggle />
        </div>
      ) : null}
    </div>
  );
}
