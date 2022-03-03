import React from 'react';

import './MainCarousel.scss';
import 'swiper/modules/pagination/pagination.scss';

import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import SwiperCore, { Pagination, Autoplay } from 'swiper';
import { Button } from 'antd';

import mainCarouselContent from '../../utils/mainCarouselContent';

SwiperCore.use([Pagination, Autoplay]);

const MainCarousel = (): JSX.Element => {
  const pagination = {
    clickable: true,
    renderBullet(index: number, className: string) {
      return `<span class=${className}><p>${mainCarouselContent[index].paginationText}</p></span>`;
    },
  };

  const renderMainCarouselSlides = mainCarouselContent.map(
    ({ heading, paragraph_1, paragraph_2, link, image, paginationText }) => (
      <SwiperSlide key={heading}>
        <div className="main-slide">
          <div className="main-slide-content">
            <h1>{heading}</h1>
            <p>{paragraph_1}</p>
            <p>{paragraph_2}</p>
            <Button
              className="main-slide-button"
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
          <div className="main-slide-image">
            <img src={image} alt={paginationText} loading="lazy" />
          </div>
        </div>
      </SwiperSlide>
    ),
  );

  return (
    <div className="main">
      <Swiper pagination={pagination} autoplay={{ delay: 6800 }} className="main-content">
        {renderMainCarouselSlides}
      </Swiper>
    </div>
  );
};

export default MainCarousel;
