import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./assets/components/Home/Home.tsx";
import NavBar from "./assets/components/NavBar/NavBar.tsx";
import logo from "./assets/images/NavBar/image.png";

export function App() {
  let items = ['Home','Product','Service'];
  return (
    <BrowserRouter>
      <NavBar
        imageSrcPath={logo}
        navItems={items}
      
      />


      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
