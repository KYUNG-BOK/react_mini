import React from 'react';

export default function MovieBackdrop({ imageUrl }) {
  return (
    <>
      {/* 뒷배경영역 */}
      <div
        className="absolute inset-0 z-0 bg-contain bg-full blur-xs brightness-80 bg-no-repeat"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-black via-transparent to-black opacity-50" />
    </>
  );
}
