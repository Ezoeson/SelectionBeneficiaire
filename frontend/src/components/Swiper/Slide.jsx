import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import './styles.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import { EffectFade } from 'swiper/modules';
import { TypeAnimation } from 'react-type-animation';

const Slide = () => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        // navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className='mySwiper w-full h-full'
      >
        <SwiperSlide>
          <img
            src='dashboardfimisajpg.jpg'
            alt=''
            className='w-full h-full object-cover'
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src='beneficiaire.jpg'
            alt=''
            className='w-full h-full object-cover'
          />{' '}
        </SwiperSlide>
        <SwiperSlide>
          <img
            src='reponsess.jpg'
            alt=''
            className='w-full h-full object-cover'
          />{' '}
        </SwiperSlide>
        <SwiperSlide>
          <img
            src='reponses.jpg'
            alt=''
            className='w-full h-full object-cover '
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Slide;
