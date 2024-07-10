import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import Message from './Message';
import { useGetTopProductsQuery } from '../slices/productsApiSlice';

const sampleProducts = [
  {
    _id: 1,
    name: 'Fruits',
    image: 'https://img.freepik.com/free-photo/vibrant-collection-healthy-fruit-vegetables-generated-by-ai_24640-80425.jpg'
  },
  {
    _id: 2,
    name: 'vegetables',
    image: 'https://watermark.lovepik.com/photo/20211208/large/lovepik-fruits-and-vegetables-poster-picture_501615020.jpg'
  },
  {
    _id: 3,
    name: 'Dairy Products',
    image: 'https://www.shutterstock.com/image-photo/various-dairy-products-600nw-627224804.jpg'
  },
  {
    _id: 4,
    name: 'Product 4',
    image: 'https://t4.ftcdn.net/jpg/02/44/16/79/360_F_244167973_E7aRgY9NHX9qW0QWOaZNwmG8NBJaa1rf.jpg'
  }
];

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) =>
        prevIndex === sampleProducts.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return isLoading ? null : error ? (
    <Message variant='danger'>{error?.data?.message || error.error}</Message>
  ) : (
    <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
      <Carousel
        activeIndex={index}
        onSelect={() => {}}
        pause={false}
        className='bg-primary mb-4'
      >
        {sampleProducts.map((product) => (
          <Carousel.Item key={product._id}>
            <Link to={`/product/${product._id}`} onClick={(e) => e.preventDefault()}>
              <Image
                src={product.image}
                alt={product.name}
                fluid
                style={{ width: '1200px', height: '500px' }}
              />
              <Carousel.Caption className='carousel-caption'>
                <h2 className='text-white text-right'>
                  {product.name}
                </h2>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default ProductCarousel;
