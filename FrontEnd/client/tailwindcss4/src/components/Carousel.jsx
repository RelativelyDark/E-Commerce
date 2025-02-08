import React from "react";
import Slider from "react-slick";
import {HomeCard} from "../components"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = ({ products }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="w-full max-w-6xl mx-auto py-10">
    <Slider {...settings}>
      {products.map((product, index) => (
        <div key={index} className="p-2">
          <HomeCard product={product} />
        </div>
      ))}
    </Slider>
  </div>
  );
};

export default Carousel;
