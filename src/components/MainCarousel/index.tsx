import React from 'react';

import './MainCarousel.scss';
// import 'swiper/swiper.scss';
import 'swiper/modules/pagination/pagination.scss';

import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import SwiperCore, { Pagination, Autoplay } from 'swiper';

import nba_75 from '../../assets/nba_75.webp';
import nba_league_pass from '../../assets/nba_league_pass.webp';
import nba_store from '../../assets/nba_store.webp';
import nba_tickets from '../../assets/nba_tickets.webp';
import nba_cares from '../../assets/nba_cares.webp';

SwiperCore.use([Pagination, Autoplay]);

// This info should be from backend, but API doesn't provide such info
const CarouselTextContent = [
  'This is the NBA 75th Anniversary Team',
  'Explore the World of NBA with League Pass',
  'Checkout the Official NBA Store',
  'Official Source of Authentic NBA Tickets',
  'NBA Cares - the League’s Global Social Responsibility Program',
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
        autoplay={{ delay: 6800 }}
        // watchSlidesProgress={true}
        className="main-content"
      >
        <SwiperSlide>
          <div className="main-slide">
            <div className="main-slide-content">
              <h1>head head head head head head head head head</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
                adipisci perferendis unde praesentium mollitia obcaecati, rerum vitae
                nihil veniam, aperiam maxime iusto. Officiis nostrum voluptatum mollitia,
                error id fuga minus.
              </p>
              <button>Button</button>
            </div>
            <div className="main-slide-image">
              <img src={nba_75} alt="nba_75" loading="lazy" />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="main-slide">
            <div className="main-slide-content">
              <h1>head head head head head head head head head</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
                adipisci perferendis unde praesentium mollitia obcaecati, rerum vitae
                nihil veniam, aperiam maxime iusto. Officiis nostrum voluptatum mollitia,
                error id fuga minus.
              </p>
              <button>Button</button>
            </div>
            <div className="main-slide-image">
              <img src={nba_league_pass} alt="nba_league_pass" loading="lazy" />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="main-slide">
            <div className="main-slide-content">
              <h1>head head head head head head head head head</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
                adipisci perferendis unde praesentium mollitia obcaecati, rerum vitae
                nihil veniam, aperiam maxime iusto. Officiis nostrum voluptatum mollitia,
                error id fuga minus.
              </p>
              <button>Button</button>
            </div>
            <div className="main-slide-image">
              <img src={nba_store} alt="nba_store" loading="lazy" />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="main-slide">
            <div className="main-slide-content">
              <h1>head head head head head head head head head</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
                adipisci perferendis unde praesentium mollitia obcaecati, rerum vitae
                nihil veniam, aperiam maxime iusto. Officiis nostrum voluptatum mollitia,
                error id fuga minus.
              </p>
              <button>Button</button>
            </div>
            <div className="main-slide-image">
              <img src={nba_tickets} alt="nba_tickets" loading="lazy" />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="main-slide">
            <div className="main-slide-content">
              <h1>head head head head head head head head head</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus
                adipisci perferendis unde praesentium mollitia obcaecati, rerum vitae
                nihil veniam, aperiam maxime iusto. Officiis nostrum voluptatum mollitia,
                error id fuga minus.
              </p>
              <button>Button</button>
            </div>
            <div className="main-slide-image">
              <img src={nba_cares} alt="nba_cares" loading="lazy" />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default MainCarousel;
