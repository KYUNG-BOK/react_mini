import React from 'react';

export default function MovieBackdrop({ imageUrl }) {
  return (
    <>
    {/* desktop -> blur, mobile -> 선명하게 */}
      <div
        className="
          absolute inset-0 z-0 
          bg-contain bg-full bg-no-repeat 
          brightness-150 md:brightness-90
          blur-none md:blur-xs
        "
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-black via-transparent to-black opacity-50" />
    </>
  );
}
