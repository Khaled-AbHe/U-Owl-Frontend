import {
  SLIDER_IMG_1,
  SLIDER_IMG_2,
  SLIDER_IMG_3,
  SLIDER_IMG_4,
} from "../../../assets/index.ts";
import ImagesSlider from "../../../components/ImageSlider/ImageSlider.tsx";
import VehicleSearch from "../../../components/Forms/VehicleSearch/VehicleSearchForm.tsx";
import "./Home.css";
import { NavCard } from "../../../components/Cards/NavCard.tsx";
import { dealCards, navCards } from "../../../data/home-cards.data.ts";
import { DealCard } from "../../../components/Cards/DealCard.tsx";

const sliderImages = [SLIDER_IMG_1, SLIDER_IMG_2, SLIDER_IMG_3, SLIDER_IMG_4];

export default function Home() {
  return (
    <div className="home-page">
      <div className="home-content">

      <div className="slider-container">
        <ImagesSlider imageUrls={sliderImages} />
        <VehicleSearch />
      </div>

      <div className="home-cards-section">
        <h2>Explore</h2>
        <div className="home-cards-grid mb-4">
          {navCards.map((card, index) => <NavCard key={index} {...card} />)}
        </div>

        <h2 className="mt-3">Current Deals</h2>
        <div className="home-cards-grid">
          {dealCards.map((deal, index) => <DealCard key={index} {...deal} />)}
        </div>
      </div>
      </div>
    </div>
  );
}
