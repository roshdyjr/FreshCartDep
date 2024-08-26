import React from 'react'
import Slider from "react-slick";
export default function ProductImageSlider({ images }) {
    

    var settings = {
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 600,
                settings: {
                    dots: false,
                }
            }
        ]
    };


    return (
        <Slider {...settings}>
            {images?.map((img, index) => {
                return <img key={index} className="rounded-md w-full object-contain mx-auto" src={img} alt={images.title} />
            })}
        </Slider>
    )
}
