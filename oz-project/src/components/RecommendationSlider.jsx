import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Link } from 'react-router-dom';

export default function RecommendationSlider({ movies }) {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={30}
      navigation={true}
      modules={[Navigation]}
      className="mySwiper"
      breakpoints={{
        0: {
          slidesPerView: 1,
        },
        640: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 3,
        },
        1280: {
          slidesPerView: 4,
        },
      }}
    >
      {movies.map((movie) => (
        <SwiperSlide key={movie.id}>
          <Link to={`/details/${movie.id}`}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="rounded-md"
            />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
