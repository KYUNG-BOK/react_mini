import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';

export default function SignupModal({ onClose, openLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // 이메일 유효성체크
  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrorMsg('');
    setSuccessMsg('');

    // 유효성 체크
    if (!name.trim()) {
      setErrorMsg('이름을 입력해주세요.');
      return;
    }

    if (!isValidEmail(email)) {
      setErrorMsg('유효한 이메일 주소를 입력해주세요.');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('비밀번호는 최소 6자리 이상이어야 합니다.');
      return;
    }

    if (password !== confirm) {
      setErrorMsg('비밀번호가 일치하지 않습니다.');
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setErrorMsg(`회원가입에 실패했습니다: ${error.message}`);
      setLoading(false);
      return;
    }

    const userId = data.user?.id;
    if (userId) {
      const { error: profileError } = await supabase.from('profiles').insert([
        { id: userId, name },
      ]);
      if (profileError) {
        setErrorMsg('프로필 저장 중 오류가 발생했습니다: ' + profileError.message);
        setLoading(false);
        return;
      }
    }

    setLoading(false);
    setSuccessMsg('회원가입이 완료되었습니다! 3초 후 자동으로 닫힙니다.');

    setTimeout(() => {
      onClose();
    }, 3000);
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
    >
      <div className="bg-gray-900 p-8 rounded-xl w-full max-w-md space-y-6 shadow-xl text-white relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-white text-xl"
        >
          ✕
        </button>

        <h2 className="text-3xl font-bold text-center">OZFlix 회원가입</h2>

        {errorMsg && (
          <div className="text-center text-red-400 text-sm mb-4">{errorMsg}</div>
        )}

        {successMsg && (
          <div className="text-center text-green-400 text-sm mb-4">{successMsg}</div>
        )}

        {!successMsg && (
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label className="block text-sm mb-1">이름</label>
              <input
                type="text"
                className="w-full p-3 bg-gray-800 rounded-lg outline-none"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="name"
                placeholder="실명을 입력하세요"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">이메일</label>
              <input
                type="email"
                className="w-full p-3 bg-gray-800 rounded-lg outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                placeholder="example@example.com"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">비밀번호</label>
              <input
                type="password"
                className="w-full p-3 bg-gray-800 rounded-lg outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
                placeholder='비밀번호를 입력해주세요.'
              />
            </div>

            <div>
              <label className="block text-sm mb-1">비밀번호 확인</label>
              <input
                type="password"
                className="w-full p-3 bg-gray-800 rounded-lg outline-none"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                autoComplete="new-password"
                placeholder='비밀번호 확인을 위해 한번 더 입력해주세요.'
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 transition p-3 rounded-lg font-semibold"
              disabled={loading}
            >
              {loading ? '가입 중...' : '가입하기'}
            </button>
          </form>
        )}

        {!successMsg && (
          <p className="text-sm text-center text-gray-400">
            이미 계정이 있으신가요?{' '}
            <button
              onClick={openLogin}
              className="text-red-500 hover:underline"
              type="button"
            >
              로그인
            </button>
          </p>
        )}
      </div>
    </div>
  );
}
