import { BrowserRouter, Routes, Route } from "react-router-dom";
import Test from "./assets/components/Test/Test.tsx";
import Home from "./assets/components/Home/Home.tsx";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}
