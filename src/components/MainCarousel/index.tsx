import React from 'react';
import { Button } from 'antd';
import SwiperCore, { Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { v4 as uuidv4 } from 'uuid';
import 'swiper/modules/pagination/pagination.scss';

import styles from './MainCarousel.module.scss';
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
      <SwiperSlide key={uuidv4()} className={styles.slide}>
        <div className={styles.slideContent}>
          <h1 className={styles.heading}>{heading}</h1>
          <p className={styles.paragraph}>{paragraph_1}</p>
          <p className={styles.paragraph}>{paragraph_2}</p>
          <Button
            className={styles.button}
            type="link"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            size="large"
            shape="round"
          >
            Read More
          </Button>
        </div>
        <div className={styles.animation}>
          <img className={styles.image} src={image} alt={paginationText} loading="lazy" />
        </div>
      </SwiperSlide>
    ),
  );

  return (
    <div className={styles.carousel}>
      <Swiper
        className={styles.carouselContent}
        pagination={pagination}
        autoplay={{ delay: 6800 }}
      >
        {renderMainCarouselSlides}
      </Swiper>
    </div>
  );
};

export default MainCarousel;
