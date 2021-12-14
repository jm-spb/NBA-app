import React from 'react';

import './MainCarousel.scss';
import 'swiper/swiper.scss';
import 'swiper/modules/pagination/pagination.scss';

import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import SwiperCore, { Pagination, Autoplay } from 'swiper';

SwiperCore.use([Pagination, Autoplay]);

// This info should be from backend, but API doesn't provide such info
const CarouselTextContent = [
  'This is the NBA 75th Anniversary Team',
  'text 2',
  'text 3',
  'text 4',
  'text 5',
];

const MainCarousel = (): JSX.Element => {
  const pagination = {
    clickable: true,
    renderBullet: function (index: any, className: any) {
      return `<span class=${className}><p>${CarouselTextContent[index]}</p></span>`;
    },
  };

  return (
    <div className="main">
      <Swiper
        pagination={pagination}
        autoplay={{ delay: 2800 }}
        // watchSlidesProgress={true}
        className="main-content"
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
      </Swiper>
    </div>
  );
};

export default MainCarousel;
