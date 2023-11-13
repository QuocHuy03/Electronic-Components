import React from "react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Slider = ({
  className,
  navigation,
  pagination,
  children,
  spaceBetween,
  breakpoints,
  slidesPerView,
}) => {
  return (
    <Swiper
      loop={true}
      slidesPerView={slidesPerView}
      spaceBetween={spaceBetween}
      pagination={pagination}
      navigation={navigation ? { nextEl: ".slider-next", prevEl: ".slider-prev" } : navigation}
      modules={[Autoplay, Pagination, Navigation]}
      breakpoints={breakpoints}
      className={className + " mySwiper"}
    >
      {children}
    </Swiper>
  );
};
export default Slider;