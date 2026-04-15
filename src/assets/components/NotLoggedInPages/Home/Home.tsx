import ImagesSlider from "../../ImageSlider/ImageSlider";

import uowlImage from "../../../images/NavBar/u-owlImage.png";
import uowlImage2 from "../../../images/NavBar/u-owlImage2.png";
import uowlImage3 from "../../../images/NavBar/u-owlImage3.png";
import uowlImage4 from "../../../images/NavBar/u-owlImage4.png";
import VehicleSearch from "../../VehicleSearchForm/VehicleSearchForm";

const IMAGES = [uowlImage, uowlImage2, uowlImage3, uowlImage4];

export default function Home() {
  return (
    <div>
      <ImagesSlider imageUrls={IMAGES} />
      <VehicleSearch />
    </div>
  );
}
