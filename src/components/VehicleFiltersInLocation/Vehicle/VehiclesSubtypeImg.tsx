import PICK_UP from "../../assets/vehicles/Trucks/PICKUP.png";
import CARGO_VAN from "../../assets/vehicles/Trucks/CARGO_VAN.png";
import SMALL_BOX from "../../assets/vehicles/Trucks/SMALL_BOX.png";
import MEDIUM_BOX from "../../assets/vehicles/Trucks/MEDIUM_BOX.png";
import LARGE_BOX from "../../assets/vehicles/Trucks/LARGE_BOX.png";
import XLARGE_BOX from "../../assets/vehicles/Trucks/XLARGE_BOX.png";

// import SMALL from "../../assets/vehicles/Trailers/"
// import MEDIUM from "../../assets/vehicles/Trailers/"
// import LARGE from "../../assets/vehicles/Trailers/"
import type { TrailerType, TruckType } from "./VehiclesType";

// Imgs for the Trucks
const vehicleImg = PICK_UP;
const cargoVanImg = CARGO_VAN;
const smallBox = SMALL_BOX;
const mediumBox = MEDIUM_BOX;
const largeBox = LARGE_BOX;
const xlargeBox = XLARGE_BOX;

// // Trailers
// const trailerSmall = SMALL
// const trailerMedium = MEDIUM
// const trailerLarge = LARGE

export function getSubtypeImg(subtype: TruckType | TrailerType) {
  switch (subtype) {
    //TruckType
    case "Pickup":
      return vehicleImg;
    case "Cargo Van":
      return cargoVanImg;
    case "Small Box":
      return smallBox;
    case "Medium Box":
      return mediumBox;
    case "Large Box":
      return largeBox;
    case "XLarge Box":
      return xlargeBox;
    //Trailer type
    // case "Small":
    //     return trailerSmall
    // case "Medium":
    //     return trailerMedium
    // case "Large":
    //     return trailerLarge
  }
}
