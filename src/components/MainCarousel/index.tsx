import React from 'react';
import { Button } from 'antd';
import SwiperCore, { Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { v4 as uuidv4 } from 'uuid';
import 'swiper/modules/pagination/pagination.scss';

import './MainCarousel.scss';
import mainCarouselContent from '../../content/mainCarouselContent';

SwiperCore.use([Pagination, Autoplay]);

const MainCarousel = (): JSX.Element => {
  const pagination = {
    clickable: true,
    renderBullet(index: number, className: string) {
      return `<span class=${className}><p class="swiper-pagination-paragraph">${mainCarouselContent[index].paginationText}</p></span>`;
    },
  };

  const renderMainCarouselSlides = mainCarouselContent.map(
    ({ heading, paragraph_1, paragraph_2, link, image, paginationText }) => (
      <SwiperSlide key={uuidv4()}>
        <div className="carousel-slide">
          <div className="carousel-slide-content">
            <h1 className="carousel-slide-heading">{heading}</h1>
            <p className="carousel-slide-paragraph">{paragraph_1}</p>
            <p className="carousel-slide-paragraph">{paragraph_2}</p>
            <Button
              className="carousel-slide-button"
              type="link"
              href={link}
              target="_blank"
              rel="noreferrer"
              size="large"
              shape="round"
            >
              Read More
            </Button>
          </div>
          <div className="carousel-slide-animation">
            <img
              className="carousel-slide-image"
              src={image}
              alt={paginationText}
              loading="lazy"
            />
          </div>
        </div>
      </SwiperSlide>
    ),
  );

  return (
    <div className="carousel">
      <Swiper
        pagination={pagination}
        autoplay={{ delay: 6800 }}
        className="carousel-content"
      >
        {renderMainCarouselSlides}
      </Swiper>
    </div>
  );
};

export default MainCarousel;
