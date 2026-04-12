import { BrowserRouter, Routes, Route } from "react-router-dom";
import Test from "./assets/components/Test/Test.tsx";
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
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}
