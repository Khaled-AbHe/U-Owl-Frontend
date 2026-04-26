import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./imgSlider.css";

type ImageSliderProps = {
  imageUrls: string[];
};

export default function ImagesSlider({ imageUrls }: ImageSliderProps) {
  const [imageIndex, setImageIndex] = useState(0);

  function showNextImage() {
    setImageIndex((i) => (i === imageUrls.length - 1 ? 0 : i + 1));
  }

  function showPrevImage() {
    setImageIndex((i) => (i === 0 ? imageUrls.length - 1 : i - 1));
  }

  return (
    <div className="slider-hero">
      {/* Full-bleed image */}
      <img
        src={imageUrls[imageIndex]}
        className="slider-image"
        alt="Slide"
      />

      {/* Prev / Next arrows */}
      <button
        onClick={showPrevImage}
        className="slider-arrow slider-arrow--prev"
        aria-label="Previous image"
      >
        <ChevronLeft size={28} />
      </button>
      <button
        onClick={showNextImage}
        className="slider-arrow slider-arrow--next"
        aria-label="Next image"
      >
        <ChevronRight size={28} />
      </button>
    </div>
  );
}
