import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 text-center">
      <motion.h1
        initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="text-8xl font-extrabold text-red-600 drop-shadow-lg mb-6"
      >
        404
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="text-2xl text-white mb-6"
      >
        Not Found
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="text-xl max-w-lg mx-auto mb-4 text-gray-300"
      >
        죄송합니다. 요청하신 페이지를 찾을 수 없습니다.
        <br />
        주소가 잘못되었거나, 페이지가 삭제되었을 수 있습니다.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <Link
          to="/"
          className="inline-block mt-4 px-8 py-3 bg-red-600 text-white rounded-full font-semibold shadow-lg
                     hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-opacity-50
                     transition transform hover:scale-105 active:scale-95"
        >
          홈으로 돌아가기
        </Link>
      </motion.div>
    </div>
  );
}
