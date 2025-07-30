import React from 'react';
import useAuthStore from '../store/zustand';
import useFavoriteStore from '../store/favoriteStore';
import { FaUser, FaEnvelope, FaStar } from 'react-icons/fa';

function UserInfo() {
  const { user } = useAuthStore();
  const favorites = useFavoriteStore((state) => state.favorites);

  return (
    <div className="text-white rounded-2xl shadow-md p-8">
      <h2 className="text-3xl font-bold mb-6">"{user?.name}" 님의 마이페이지</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex items-center p-5 bg-gray-800 rounded-xl shadow-sm">
          <FaUser className="text-2xl text-blue-400 mr-4" />
          <div>
            <p className="text-gray-400 text-sm">이름</p>
            <p className="text-lg font-semibold">{user?.name}</p>
          </div>
        </div>

        <div className="flex items-center p-5 bg-gray-800 rounded-xl shadow-sm">
          <FaEnvelope className="text-2xl text-green-400 mr-4" />
          <div>
            <p className="text-gray-400 text-sm">이메일</p>
            <p className="text-lg font-semibold">{user?.email}</p>
          </div>
        </div>

        <div className="flex items-center p-5 bg-gray-800 rounded-xl shadow-sm sm:col-span-2">
          <FaStar className="text-2xl text-yellow-400 mr-4" />
          <div>
            <p className="text-gray-400 text-sm">찜한 영화 수</p>
            <p className="text-lg font-semibold">{favorites.length}편</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
