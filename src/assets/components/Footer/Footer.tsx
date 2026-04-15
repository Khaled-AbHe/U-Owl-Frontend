import { FaInstagram, FaYoutube, FaTiktok } from "react-icons/fa";
import { SiX } from "react-icons/si";

const Footer = () => {
    return (
        <footer style={{backgroundColor: "#389fff", color: "black", textAlign: "center", height: 70}}>
            <p style={{ color: "white" }}>&copy; {new Date().getFullYear()} U-Owl</p>

            <div className="footer" style={{ display: "flex", justifyContent: "center" }}>
                <a href="https://x.com/?lang=fr" style={{ margin: "0 12px" }}><SiX size={20} color="white"/></a>

                <a href="https://www.instagram.com/" style={{ margin: "0 12px" }}> <FaInstagram size={20} color="white"/></a>

                <a href="https://www.youtube.com/" style={{ margin: "0 12px" }}><FaYoutube size={20} color="white"/></a>

                <a href="https://www.tiktok.com/fr-CA/" style={{ margin: "0 12px" }}><FaTiktok size={20} color="white"/></a>
            </div>
        </footer>
    );
};

export default Footer;
