export default function MovieBackdrop({ imageUrl }) {
  return (
    <>
      <div
        className="absolute inset-0 z-0 bg-cover bg-center blur-sm brightness-50"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-black via-transparent to-black opacity-80" />
    </>
  );
}
