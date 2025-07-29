import React from 'react';
import { supabase } from '../../supabaseClient';

export default function SocialLoginButtons() {
  return (
    <div className="space-y-3 mt-3">
      <button
        onClick={() => supabase.auth.signInWithOAuth({ provider: 'kakao' })}
        className="flex items-center justify-center w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded-lg gap-2"
      >
        {/* 카카오톡 로고 */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle cx="12" cy="12" r="12" fill="#FFEB00" />
          <path d="M6 7h12v10H6z" fill="black" />
        </svg>
        카카오로 로그인
      </button>

      <button
        onClick={() => supabase.auth.signInWithOAuth({ provider: 'google' })}
        className="flex items-center justify-center w-full bg-white hover:bg-gray-300 text-black font-bold py-3 rounded-lg gap-2"
      >
        {/* 구글 로고 */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          width="24px"
          height="24px"
        >
          <path
            fill="#4285F4"
            d="M24 9.5c3.54 0 6.71 1.22 9.16 3.6l6.84-6.84C34.79 2.79 29.83 1 24 1 14.58 1 6.37 6.89 2.5 14.66l7.95 6.17C12.2 15.43 17.69 9.5 24 9.5z"
          />
          <path
            fill="#34A853"
            d="M46.5 24c0-1.75-.14-3.43-.42-5.07H24v9.59h12.83c-.55 2.95-2.22 5.44-4.75 7.11l7.32 5.68C44.32 34.1 46.5 29.48 46.5 24z"
          />
          <path
            fill="#FBBC05"
            d="M10.45 28.83l-7.95 6.17C6.37 41.11 14.58 47 24 47c6.56 0 12.4-2.16 16.49-5.86l-7.99-6.2c-2.07 1.39-4.68 2.19-7.5 2.19-6.36 0-11.7-4.3-13.55-10.3z"
          />
          <path
            fill="#EA4335"
            d="M24 9.5c3.54 0 6.71 1.22 9.16 3.6l6.84-6.84C34.79 2.79 29.83 1 24 1 14.58 1 6.37 6.89 2.5 14.66l7.95 6.17C12.2 15.43 17.69 9.5 24 9.5z"
          />
        </svg>
        GOOGLE 로그인
      </button>
    </div>
  );
}
