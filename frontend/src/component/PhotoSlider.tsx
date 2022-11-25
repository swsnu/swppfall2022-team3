import React from "react";
import Slider from "react-slick";
import { User } from "../types";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./PhotoSlider.css";


interface IProps {
  user: User;
}

export default function PhotoSlider({
  user,
}: IProps) {
  return (
    <Slider
      slidesToShow={1}
      slidesToScroll={1}
      arrows={false}
      infinite={true}
      swipeToSlide={true}
      dots={true}
      dotsClass={"dots"}
    >
      {user.photos.map((photoPath, index) =>
        <img
          key={index}
          src={photoPath}
          alt={photoPath}
          className={"object-cover h-[100vw]"}
        />
      )}
    </Slider>
  );
}
