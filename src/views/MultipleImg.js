import React from 'react';
import { Carousel } from 'react-bootstrap';
import { BASE_URL } from '../services/baseurl';
 // Import the custom CSS file
 import './Buttonstyle.css'

const ImageCarousel = ({ image }) => {
  return (
    <Carousel>
      {image.map((img, index) => (
        <Carousel.Item key={index}>
          <img
            className="d-block w-100"
            src={`${BASE_URL}/uploads/${img}`}
            alt={`Slide ${index}`}
            style={{ height: '200px', objectFit: 'cover' }}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ImageCarousel;
