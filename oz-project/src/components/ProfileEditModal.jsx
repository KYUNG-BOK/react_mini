import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';

export default function ProfileEditModal({ user, onClose, onProfileUpdated }) {
  const [profiles, setProfiles] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [name, setName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // 1. 이메일 기준으로 프로필들 불러오기
  useEffect(() => {
    async function fetchProfiles() {
      if (!user?.email) return;
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('email', user.email);

      if (error) {
        setError('프로필 목록을 불러오는 중 오류가 발생했습니다.');
        return;
      }
      setProfiles(data);
      // 대표 프로필이 있으면 선택, 없으면 첫 번째 프로필 선택
      const primary = data.find((p) => p.is_primary) || data[0];
      if (primary) {
        setSelectedId(primary.id);
        setName(primary.name || '');
        setAvatarUrl(primary.avatar_url || '');
      }
    }
    fetchProfiles();
  }, [user?.email]);

  // 2. 선택한 프로필 바뀔 때 이름, 아바타 동기화
  useEffect(() => {
    const selectedProfile = profiles.find((p) => p.id === selectedId);
    if (selectedProfile) {
      setName(selectedProfile.name || '');
      setAvatarUrl(selectedProfile.avatar_url || '');
    }
  }, [selectedId, profiles]);

  // 3. 대표 프로필 변경 + 이름/아바타 수정 한번에 처리
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // (1) 모든 프로필 is_primary = false 처리 (동일 이메일 대상)
      const { error: resetError } = await supabase
        .from('profiles')
        .update({ is_primary: false })
        .eq('email', user.email);

      if (resetError) throw resetError;

      // (2) 선택된 프로필만 is_primary = true + 이름, 아바타 업데이트
      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          is_primary: true,
          name,
          avatar_url: avatarUrl,
        })
        .eq('id', selectedId);

      if (updateError) throw updateError;

      // 로컬 상태도 업데이트
      onProfileUpdated &&
        onProfileUpdated({ id: selectedId, name, avatar_url: avatarUrl });

      onClose();
    } catch (err) {
      setError('프로필 업데이트 실패: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  // 근데 안된다네~~~~ 스트레스 ㅠㅠ

  if (!profiles.length)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
        <div className="bg-gray-900 p-6 rounded-lg w-full max-w-md text-white">
          <p>프로필을 찾을 수 없습니다.</p>
          <button
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-red-600 rounded"
          >
            닫기
          </button>
        </div>
      </div>
    );

  return (
    <div  className="fixed inset-0 flex items-center justify-center z-50"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
      <div className="bg-gray-900 p-6 rounded-lg w-full max-w-md text-white max-h-[90vh] overflow-auto">
        <h2 className="text-2xl mb-4 font-semibold">
          프로필 변경 및 대표 프로필 선택
        </h2>
        {error && <div className="mb-2 text-red-500">{error}</div>}

        {/* 프로필 목록 */}
        <div className="mb-4 max-h-40 overflow-y-auto">
          {profiles.map((profile) => (
            <div
              key={profile.id}
              className={`flex items-center gap-3 p-2 mb-2 rounded cursor-pointer border ${
                profile.id === selectedId
                  ? 'border-red-500 bg-white/10'
                  : 'border-transparent'
              }`}
              onClick={() => setSelectedId(profile.id)}
            >
              <img
                src={profile.avatar_url || '/default-avatar.png'}
                alt="avatar"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold">{profile.name || '이름 없음'}</p>
                <p className="text-xs text-gray-400">
                  {profile.provider || '기본'}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 선택한 프로필 수정 폼 */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">이름</label>
            <input
              type="text"
              className="w-full p-2 rounded bg-gray-800 outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="flex gap-4">
            {profiles.map((profile) => (
              <div
                key={profile.id}
                className="border rounded p-4 flex flex-col items-center shadow hover:ring-2 hover:ring-blue-400 cursor-pointer"
                onClick={() => handleSelect(profile.id)}
              >
                <img
                  src={profile.avatar_url}
                  alt={`${profile.name} 아바타`}
                  className="w-16 h-16 rounded-full mb-2 object-cover"
                />
                <p className="font-semibold">{profile.name}</p>
                <p className="text-sm text-gray-500">{profile.provider}</p>
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
              onClick={onClose}
              disabled={loading}
            >
              취소
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 rounded hover:bg-red-700"
              disabled={loading}
            >
              {loading ? '저장 중...' : '저장'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
