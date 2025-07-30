import { Outlet, NavLink } from 'react-router-dom';
import useAuthStore from '../store/zustand'; // user정보 불러오기
import LoginModal from './LoginModal'; // login모달
import { useState } from 'react';

function MyPageLayout() {
  const { user, isLoggedIn } = useAuthStore();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
// 로그인이 아닐 경우에는 로그인 필요하다는 페이지가 렌더링
  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
        <p className="mb-4 text-lg">
          해당 페이지는 로그인이 필요합니다.
        </p>
        <button
          onClick={() => setIsLoginOpen(true)}
          className="px-4 py-2 bg-red-500 rounded hover:bg-red-600"
        >
          로그인 하기
        </button>

        {isLoginOpen && (
          <LoginModal
            openSignup={() => {
              setIsLoginOpen(false);
            }}
            onClose={() => setIsLoginOpen(false)}
          />
        )}
      </div>
    );
  }
// 로그인이 되어있을 경우 mypage가 렌더링됨.
  return (
    <div className="flex max-w-8xl mx-auto min-h-screen px-4 py-8 bg-black text-white">
      {/* Sidebar */}
      <aside className="w-1/6 pr-4 border-r border-gray-700">
        {/* 유저 정보 영역 */}
        <div className="flex flex-col items-center mb-8">
          {user?.avatar_url ? (
            <img
              src={user.avatar_url}
              alt="User Avatar"
              className="w-24 h-24 rounded-full object-cover mb-3 shadow-lg"
            />
          ) : (
            <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mb-3">
              <span className="text-gray-400 text-3xl">👤</span>
            </div>
          )}
          <p className="font-semibold text-lg text-center">{user?.name} 님</p>
        </div>

        {/* 메뉴 */}
        <nav className="flex flex-col space-y-3 pl-2">
          {[
            { to: '/mypage', label: '회원정보', exact: true },
            { to: 'reviews', label: '나의 리뷰' },
            { to: 'wishlist', label: '위시리스트' },
            { to: 'support', label: '고객센터' },
          ].map(({ to, label, exact }) => (
            <NavLink
              key={to}
              to={to}
              end={exact}
              className={({ isActive }) =>
                `text-lg transition-colors px-1 py-1 rounded-md ${
                  isActive
                    ? 'text-red-400 font-bold bg-white/10'
                    : 'text-gray-300 hover:text-red-400'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="grow pl-8">
        <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl shadow-xl p-1 min-h-[500px]">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default MyPageLayout;
