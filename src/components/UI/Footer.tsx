import { FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";
import { SiX } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="bg-primary py-3 mt-auto">
      <p className="text-white text-center mb-1">
        &copy; {new Date().getFullYear()} U-Owl
      </p>
      <div className="d-flex justify-content-center gap-3">
        <a href="https://x.com/?lang=fr" className="text-white">
          <SiX size={20} />
        </a>
        <a href="https://www.instagram.com/" className="text-white">
          <FaInstagram size={20} />
        </a>
        <a href="https://www.youtube.com/" className="text-white">
          <FaYoutube size={20} />
        </a>
        <a href="https://www.tiktok.com/fr-CA/" className="text-white">
          <FaTiktok size={20} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
