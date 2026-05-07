import { Truck, MapPin, Handshake} from "lucide-react";

export const navCards = [
  {
    icon: Truck,
    title: "Browse Vehicles",
    desc: "Explore our full fleet of trucks and trailers available for rent near you.",
    cta: "View vehicles",
    to: "/vehicles",
  },
  {
    icon: MapPin,
    title: "Find a Location",
    desc: "Locate your nearest U-Owl pickup point and check availability in real time.",
    cta: "See locations",
    to: "/location",
  },
  {
    icon: Handshake,
    title: "Become a Dealer",
    desc: "Partner with U-Owl and grow your business by renting our products.",
    cta: "Learn more",
    to: "/joinDealer",
  },
];

export const dealCards = [
  {
    badge: "Limited Time",
    title: "Weekend Special",
    desc: "Rent any truck for 2 days and get the 3rd day completely free.",
    price: "$49",
    unit: "/ day",
  },
  {
    badge: "Hot Deal",
    title: "One-Way Moves",
    desc: "Drop off at any location. No return trip needed. Starting from only $79.",
    price: "$79",
    unit: "one-way",
  },
  {
    badge: "Members Only",
    title: "Monthly Saver",
    desc: "Commit to a monthly plan and save up to 30% on every rental.",
    price: "-30%",
    unit: "on rentals",
  },
];