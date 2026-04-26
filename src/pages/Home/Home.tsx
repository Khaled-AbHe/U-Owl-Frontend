import {
  SLIDER_IMG_1,
  SLIDER_IMG_2,
  SLIDER_IMG_3,
  SLIDER_IMG_4,
} from "../../assets/index.ts";
import ImagesSlider from "../../components/ImageSlider/ImageSlider.tsx";
import VehicleSearch from "../../components/Forms/VehicleSearch/VehicleSearchForm.tsx";

const sliderImages = [SLIDER_IMG_1, SLIDER_IMG_2, SLIDER_IMG_3, SLIDER_IMG_4];

export default function Home() {
  return (
    <div className="d-flex flex-column align-items-center gap-3">
      <div className="slider-container" style={{width: "1200px", height: "400px"}}>
        {/* Background image + arrows */}
        <ImagesSlider imageUrls={sliderImages} />

        {/* Search card overlaid on the left, just like U-Haul */}
        <VehicleSearch />
      </div>
      <div className="border border-black">
        <p>Other content</p>
      </div>
    </div>
  );
}
