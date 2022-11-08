import React from "react";
import Slider from "react-slick";
import { Photo, User } from "../types";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./PhotoSlider.css";


interface IProps {
  user: User;
  photos: Photo[];
}

export default function PhotoSlider({
  user,
  photos,
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
      {user.photos.map((p, index) =>
        <img
          key={index}
          src={photos.find((photo) => photo.key === p)?.path}
          alt={String(photos.find((photo) => photo.key === p)?.index)}
          className={"object-cover h-[100vw]"}
        />
      )}
    </Slider>
  );
}
