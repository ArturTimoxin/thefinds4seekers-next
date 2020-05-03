import { CarouselProvider, Slider } from "pure-react-carousel";
import React from "react";
import CardSlide from "./CardSlide";
import DotGroup from "./DotGroup";

const PhotoSlider = ({ photos = [], setModalPhoto }) => (
    <CarouselProvider
      naturalSlideWidth={1}
      naturalSlideHeight={1}
      totalSlides={photos.length}
      style={{ width: "300px" }}
    >
      <Slider>
        {photos.map((photoUrl, i) => (
          <CardSlide
              key={photoUrl + i}
              image={photoUrl}
              index={i}
              setModalPhoto={setModalPhoto}
          />
        ))}
      </Slider>
      <DotGroup slides={photos.length} />
    </CarouselProvider>
);

export default PhotoSlider;