import { Slide } from "pure-react-carousel";
import React from "react";
import { Card } from "semantic-ui-react";

const CardSlide = ({ index, image, setModalPhoto, ...cardProps }) => (
  <Slide index={index}>
    <div style={{ padding: 10 }}>
      <Card 
        fluid 
        image={image} 
        onClick={() => setModalPhoto(image)}
        {...cardProps}
      />
    </div>
  </Slide>
);

export default CardSlide;
