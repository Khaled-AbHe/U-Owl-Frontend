import { useState } from "react";

import "../../Styles/imgSlider.css";
import { ChevronFirst, ChevronLast } from "lucide-react";

type ImageSilderProps = {
    imageUrls: string[]
}

export default function ImagesSlider({ imageUrls }: ImageSilderProps) {
    const [imageIndex, setImageIndex] = useState(0);


    function showNextImage() {
        setImageIndex(imageIndex => {
            if(imageIndex === imageUrls.length - 1) return 0
            return imageIndex + 1;
        })
    }

    function showPrevImage() {
        setImageIndex(imageIndex => {
            if(imageIndex === 0) return imageUrls.length - 1
            return imageIndex - 1;
        })
    }

    return (
        <div style={{ width: "80%", margin: "0 auto", position: "relative", paddingTop: 50}}>
            
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px"}}>
                
                <button onClick={showPrevImage} style={{background:"white", borderRadius: 50, width: 70, height: 70, borderColor: "#389fff"}}>
                    <ChevronFirst color="#389fff"/>
                </button>
                
                <img src={imageUrls[imageIndex]} className="imageSlider"/>
                
                <button onClick={showNextImage} style={{background:"white", borderRadius: 50, width: 70, height: 70, borderColor: "#389fff"}}>
                    <ChevronLast color="#389fff"/>
                </button>
            </div>
        </div>
    );
}
