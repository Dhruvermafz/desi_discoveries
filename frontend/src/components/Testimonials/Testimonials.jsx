import React from "react";
import Slider from "react-slick";
import testimonials from "./testimonialsData";
const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    swipeToSlide: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,

    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slideToScroll: 1,
          dots: true,
          infinite: true,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slideToScroll: 2,
        },
      },
    ],
  };

  return (
    <Slider {...settings}>
      {testimonials.map((testimonial) => (
        <div className="testimonials py-4 px-3" key={testimonial.id}>
          <p>{testimonial.text}</p>
          <div className="d-flex align-items-center gap-4 mt-3">
            <img src={testimonial.img} className="w-25 h-25 rounded-2" alt="" />
            <div>
              <h6 className="mb-0 mt-3">{testimonial.name}</h6>
              <p>{testimonial.role}</p>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default Testimonials;
