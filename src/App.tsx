import { BrowserRouter, Routes, Route } from "react-router-dom";
import logo from "./assets/images/NavBar/image.png";
import NavBar from "./assets/components/NotLoggedInPages/NavBar/NavBar.tsx";
import Footer from "./assets/components/Footer/Footer.tsx";

import Home from "./assets/components/NotLoggedInPages/Home/Home.tsx";
import Trucks from "./assets/components/NotLoggedInPages/Trucks/Trucks.tsx";
import Trailers from "./assets/components/NotLoggedInPages/Trailers/Trailers.tsx";
import Reservations from "./assets/components/LoggedInPages/Reservations/Reservations.tsx";
import BecomeAdealer from "./assets/components/NotLoggedInPages/BecomeAdealer/BecomeAdealer.tsx";
import Location from "./assets/components/NotLoggedInPages/Location/Location.tsx";
import SignIn from "./assets/components/NotLoggedInPages/SignIn/SignIn.tsx";
import SignUp from "./assets/components/NotLoggedInPages/SignUp/SignUp.tsx";

import Cart from "./assets/components/LoggedInPages/Cart/Cart.tsx";

export function App() {
  const items = [
    { label: "Home", path: "/" },
    { label: "Truck", path: "/trucks" },
    { label: "Trailer", path: "/trailers" },
    { label: "Reservations", path: "/reservations" },
    { label: "BecomeAdealer", path: "/joinDealer" },
    { label: "FindLocation", path: "/location" },
    { label: "SignIn", path: "/auth/signIn" },
    { label: "SignUp", path: "/auth/signUp" },
    { label: "Cart", path: "/cart" },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <BrowserRouter>
        <NavBar imageSrcPath={logo} navItems={items} />

        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/trucks" element={<Trucks />} />
            <Route path="/trailers" element={<Trailers />} />
            <Route path="/reservations" element={<Reservations />} />
            <Route path="/joinDealer" element={<BecomeAdealer />} />
            <Route path="/location" element={<Location />} />
            <Route path="/auth/signIn" element={<SignIn />} />
            <Route path="/auth/signUp" element={<SignUp />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
      </BrowserRouter>

      <Footer />
    </div>
  );
}

