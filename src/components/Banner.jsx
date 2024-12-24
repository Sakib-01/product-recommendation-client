import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import banner1 from "../assets/img/banner5.jpg";
import banner2 from "../assets/img/banner6.jpg";
import banner3 from "../assets/img/banner1.jpg";

const Banner = () => {
  const slides = [
    {
      id: 1,
      title: "Discover Your Perfect Match",
      subtitle: "Personalized recommendations tailored to your unique needs.",

      image: banner1,
    },
    {
      id: 2,
      title: "Save Time, Shop Smarter",
      subtitle: "Effortless shopping with expertly curated suggestions.",
      image: banner2,
    },
    {
      id: 3,
      title: "Your Voice Matters!",
      subtitle: "Share your thoughts, shape the future of recommendations.",
      image: banner3,
    },
  ];
  return (
    <div className="w-full h-[600px]">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative">
            <img
              src={slide.image} // Correct usage
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end items-center text-white text-center px-4">
              <h1 className="text-3xl lg:text-5xl font-bold mb-4">
                {slide.title}
              </h1>
              <p className="text-lg lg:text-2xl mb-6 bg-slate-50 rounded-full text-blue-700 p-3">
                {slide.subtitle}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
