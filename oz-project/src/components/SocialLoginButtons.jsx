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

      <button
        onClick={() => supabase.auth.signInWithOAuth({ provider: 'github' })}
        className="flex items-center justify-center w-full bg-gray-800 hover:bg-gray-700 text-white font-bold py-3 rounded-lg gap-2"
      >
        {/* GitHub 로고 */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          className="bi bi-github"
          viewBox="0 0 16 16"
        >
          <path
            d=" M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38
                0-.19-.01-.82-.01-1.49-2 .37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28
                -.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28
                -.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02
                .08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04
                2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75
                -3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.001
                8.001 0 0 0 16 8c0-4.42-3.58-8-8-8z"
          />
        </svg>
        GitHub로 로그인
      </button>
    </div>
  );
}
