import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';
import useAuthStore from '../store/zustand';
import SocialLoginButtons from './SocialLoginButtons';

export default function LoginModal({ onClose, openSignup }) {
  const login = useAuthStore((state) => state.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(''); // error메세지 관리

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    // 유효성 체크하기
    if (!email.trim()) {
      setLoading(false);
      setErrorMsg('이메일을 입력해주세요.');
      return;
    }
    if (!password) {
      setLoading(false);
      setErrorMsg('비밀번호를 입력해주세요.');
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setLoading(false);
      // 에러메세지 한글패치
      let msg = '';
      switch (error.message) {
        case 'Invalid login credentials':
          msg = '이메일 또는 비밀번호가 올바르지 않습니다.';
          break;
        case 'Email not confirmed':
          msg = '이메일 인증이 완료되지 않았습니다.';
          break;
        default:
          msg = `로그인 실패: ${error.message}`;
      }
      setErrorMsg(msg);
      return;
    }

    // profiles 테이블에서 이름 가져오기
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('name')
      .eq('id', data.user.id)
      .single();

    setLoading(false);

    if (profileError) {
      setErrorMsg('프로필 정보를 불러오는데 실패했습니다.');
      return;
    }
    // 구조분해할당
    login({
      id: data.user.id,
      email: data.user.email,
      name: profileData?.name || '', // 프로필 테이블에서 가져온 이름 넣기
    });

    onClose();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 "
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
    >
      <div className="bg-gray-900 p-8 rounded-xl w-full max-w-md shadow-xl text-white relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-white text-xl"
        >
          ✕
        </button>
        <h2 className="text-3xl font-bold text-center mb-6">로그인</h2>

        {errorMsg && (
          <div className="mb-4 text-red-400 text-sm text-center">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">이메일</label>
            <input
              type="email"
              className="w-full p-3 bg-gray-800 rounded-lg outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="이메일을 입력해주세요."
            />
          </div>

          <div>
            <label className="block text-sm mb-1">패스워드</label>
            <input
              type="password"
              className="w-full p-3 bg-gray-800 rounded-lg outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="패스워드를 입력해주세요."
            />
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 transition p-3 rounded-lg font-semibold"
            disabled={loading}
          >
            {loading ? '로그인 중...' : '로그인'}
          </button>
        </form>
        
        {/* 소셜 로그인버튼 분리, 구글 & 카카오 */}
        <div className="mt-3">
          <SocialLoginButtons />
        </div>

        {/* 회원가입 링크 */}
        <p className="mt-4 text-center text-gray-400 text-sm">
          아직 회원이 아니신가요?{' '}
          <button
            type="button"
            onClick={() => {
              openSignup(); // 회원가입 모달 열기
              onClose(); // 로그인 모달 닫기
            }}
            className="text-red-500 hover:underline"
          >
            회원가입하기
          </button>
        </p>
      </div>
    </div>
  );
}
