import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import sliderImage1 from "../../../assets/images/slider_image11.jpg"
import sliderImage2 from "../../../assets/images/slider_image2.jpg"
import sliderImage3 from "../../../assets/images/slider_image3.jpg"
import sliderImage4 from "../../../assets/images/slider_image4.jpg"


export default function HomeSlider() {
  return (
    <>
    <div className='w-full'>

    <Swiper
      spaceBetween={10}
      centeredSlides={true}
      modules={[Autoplay, Pagination, Navigation]}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      slidesPerView={1}
    freeMode={true}
    navigation={false}
    breakpoints={{
        300: { slidesPerView: 1, spaceBetween: 10, },
        640: { slidesPerView: 1, },
        1024: { slidesPerView: 1.1, }
    }}
      className="mySwiper rounded-lg py-3 bg-white h-[180px] md:h-[430px] text-center flex justify-center items-center"
    >
      <SwiperSlide className='bg-neutral-200 rounded-md'><img src={sliderImage1} className='w-full object-contain h-full'></img></SwiperSlide>
      <SwiperSlide className='bg-neutral-200 rounded-md'><img src={sliderImage2}  className='w-full object-cover h-full'></img></SwiperSlide>
      {/* <SwiperSlide className='bg-neutral-200 rounded-md'><img src={sliderImage3} className='w-full object-cover h-full'></img></SwiperSlide>
      <SwiperSlide className='bg-neutral-200 rounded-md'><img src={sliderImage4} className='w-full object-cover h-full'></img></SwiperSlide> */}
      {/* <SwiperSlide className='bg-neutral-200 rounded-md'>Slide 5</SwiperSlide> */}
      {/* <SwiperSlide className='bg-neutral-200 rounded-md'>Slide 6</SwiperSlide>
      <SwiperSlide className='bg-neutral-200 rounded-md'>Slide 7</SwiperSlide>
      <SwiperSlide className='bg-neutral-200 rounded-md'>Slide 8</SwiperSlide>
      <SwiperSlide className='bg-neutral-200 rounded-md'>Slide 9</SwiperSlide> */}
    </Swiper>

    </div>

  </>
  )
}
