import xlogo from "../../images/NavBar/xlogo.jpg";
import ig from "../../images/NavBar/ig.jpg";
import youtube from "../../images/NavBar/youtube.png";
import tiktok from "../../images/NavBar/tiktok.jpg";


const Footer = () => {
    return (
        <footer style={{backgroundColor: '#389fff', color: 'black', padding: '30px', textAlign: 'center', bottom: 0, left:0,}}>
            <p>&copy; {new Date().getFullYear()} U-Owl</p>
            <div className="footer">
                <a href="https://x.com/?lang=fr">
                    <img src={xlogo} alt="x logo" width={55} height={55} style={{ margin: "0 10px" }}/>
                </a>
                <a href="https://www.instagram.com/">
                    <img src={ig} alt="ig logo" width={55} height={55} style={{ margin: "0 10px" }}/>
                </a>
                <a href="https://www.youtube.com/">
                    <img src={youtube} alt="yt logo" width={55} height={55} style={{ margin: "0 10px" }}/>
                </a>
                <a href="https://www.tiktok.com/fr-CA/">
                    <img src={tiktok} alt="tiktok logo" width={55} height={55} style={{ margin: "0 10px" }}/>
                </a>               
            </div>
        </footer>
    )
}

export default Footer;