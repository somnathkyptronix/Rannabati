import { Routes, Route } from "react-router-dom";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Home } from "@/pages/Home";
import { Menu } from "@/pages/Menu";
import { Packages } from "@/pages/Packages";
import { OurWork } from "@/pages/OurWork";
import { AdminWork } from "@/pages/AdminWork";
import { NotFound } from "@/pages/NotFound";

export function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/work" element={<OurWork />} />
        <Route path="/our-work" element={<OurWork />} />
        <Route path="/admin" element={<AdminWork />} />
        <Route path="/admin/work" element={<AdminWork />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;

