import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface ImageDetails {
  src: string;
  alt: string;
  caption?: string;
}

interface GalleryCarouselProps {
  images: ImageDetails[];
  onImageClick: (image: ImageDetails) => void;
}

const GalleryCarousel: React.FC<GalleryCarouselProps> = ({ images, onImageClick }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        }
      }
    ]
  };

  return (
    <div className="relative px-2 sm:px-4">
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="px-2 sm:px-4">
            <div 
              className="flex flex-col cursor-pointer group"
              onClick={() => onImageClick(image)}
            >
              <div className="relative overflow-hidden rounded-xl shadow-md">
                <img 
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-48 sm:h-64 md:h-80 object-cover transform transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-lg sm:text-xl font-semibold mb-1">{image.alt}</h3>
                    {image.caption && (
                      <p className="text-sm sm:text-base text-white/90">{image.caption}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default GalleryCarousel; 