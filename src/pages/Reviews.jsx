import React from "react";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { FaGoogle } from "react-icons/fa";

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      name: "Alice Johnson",
      role: "Tech Enthusiast",
      review:
        "This website is incredibly user-friendly! The layout is clean, and I could easily find the products I was looking for. Highly recommended for online shoppers.",
      image: "https://i.ibb.co.com/Q97TCY9/review1.jpg",
    },
    {
      id: 2,
      name: "Bob Smith",
      role: "Digital Marketer",
      review:
        "The product recommendations are spot on! I love how the website tailors suggestions based on my browsing history. Great experience overall.",
      image: "https://i.ibb.co.com/8sR07h5/review2.jpg",
    },
    {
      id: 3,
      name: "Charlie Davis",
      role: "Frequent Shopper",
      review:
        "The checkout process was smooth and intuitive. I appreciate the multiple payment options and quick confirmation emails. Kudos to the team!",
      image: "https://i.ibb.co.com/cJ8wMnH/review3.jpg",
    },
    {
      id: 4,
      name: "Diana Moore",
      role: "Blogger",
      review:
        "The design is aesthetically pleasing and responsive. I accessed the website on my phone, and it worked flawlessly. A great platform for buying sports accessories.",
      image: "https://i.ibb.co.com/JCNFv7t/review4.jpg",
    },
    {
      id: 5,
      name: "Michael Johnson",
      role: "Fitness Trainer",
      review:
        "Fantastic website for finding high-quality sports gear! The detailed product descriptions and customer reviews were very helpful. Keep up the great work!",
      image: "https://i.ibb.co.com/ZcnMB1M/review5.jpg",
    },
  ];

  return (
    <div className="container mx-auto py-16 px-6 ">
      <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-8">
        What Our Clients Say
      </h2>

      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
      >
        {reviews.map((review) => (
          <SwiperSlide key={review.id}>
            <div className="text-center p-8 border rounded-lg shadow-lg flex flex-col items-center max-w-xs mx-auto h-96">
              <img
                src={review.image}
                alt={review.name}
                className="w-28 h-28 rounded-full mb-4 object-cover"
              />
              <h3 className="text-lg font-semibold text-gray-800">
                {review.name}
              </h3>
              <p className="text-gray-500 mb-1">{review.role}</p>
              <p className="text-gray-600 mt-2 mb-4 text-sm">{review.review}</p>
              <FaGoogle className="text-2xl text-blue-500" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Reviews;
