import React, { useState } from "react"; // React 및 useState 훅을 import
import { supabase } from "../../supabaseClient"; // Supabase 클라이언트 import

// SignupModal 컴포넌트 정의 - props로 onClose 함수를 받음
export default function SignupModal({ onClose }) {
  // 상태 정의: 이메일, 비밀번호, 비밀번호 확인, 로딩 상태
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  // 폼 제출하기
  const handleSubmit = async (e) => {
    e.preventDefault(); // 기본 폼 제출 이벤트 방지

    // 비밀번호와 확인 비밀번호가 일치하지 않으면 경고 후 리턴
    if (password !== confirm) {
      alert("비밀번호가 일치하지 않습니다!");
      return;
    }

    setLoading(true); // 로딩 시작

    // Supabase를 이용한 회원가입 요청
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false); // 로딩 종료

    // 오류 발생 시 알림, 없으면 성공 메시지 후 모달 닫기
    if (error) {
      alert(`회원가입 실패되었습니다. 실패 사유 : ${error.message}`);
    } else {
      alert("회원가입이 완료되었습니다.");
      onClose(); // 모달 닫기
    }
  };

  // 모달 UI 반환
  return (
    // 모달 오버레이 (화면 전체를 덮음)
    <div className="fixed inset-0 flex items-center justify-center z-50"
         style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
      
      {/* 모달 콘텐츠 박스 */}
      <div className="bg-gray-900 p-8 rounded-xl w-full max-w-md space-y-6 shadow-xl text-white relative">
        
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-white text-xl"
        >
          ✕
        </button>

        {/* 제목 */}
        <h2 className="text-3xl font-bold text-center">OZFlix 회원가입</h2>

        {/* 회원가입 폼 */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 이메일 입력 */}
          <div>
            <label className="block text-sm mb-1">이메일</label>
            <input
              type="email"
              className="w-full p-3 bg-gray-800 rounded-lg outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // 입력값 상태 업데이트
              required
            />
          </div>

          {/* 비밀번호 입력 */}
          <div>
            <label className="block text-sm mb-1">비밀번호</label>
            <input
              type="password"
              className="w-full p-3 bg-gray-800 rounded-lg outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* 비밀번호 확인 입력 */}
          <div>
            <label className="block text-sm mb-1">비밀번호 확인</label>
            <input
              type="password"
              className="w-full p-3 bg-gray-800 rounded-lg outline-none"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
            />
          </div>

          {/* 제출 버튼 */}
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 transition p-3 rounded-lg font-semibold"
            disabled={loading}
          >
            {loading ? "가입 중..." : "가입하기"} {/* 로딩 상태에 따라 텍스트 변경 */}
          </button>
        </form>

        {/* 로그인 페이지로 이동하는 링크 */}
        <p className="text-sm text-center text-gray-400">
          이미 계정이 있으신가요?{" "}
          <a href="/login" className="text-red-500 hover:underline">
            로그인
          </a>
        </p>
      </div>
    </div>
  );
}
