import { useState } from "react";
import { ArrowBigLeft, ArrowBigRight } from 'lucide-react';

import "../../Styles/imgSlider.css";

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
        <div style={{ width: "80%", margin: "0 auto", position: "relative"}}>
            
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px"}}>
                
                <button onClick={showPrevImage}>
                    <ArrowBigLeft />
                </button>
                
                <img src={imageUrls[imageIndex]} className="imageSlider"/>
                
                <button onClick={showNextImage}>
                    <ArrowBigRight />
                </button>
            </div>
        </div>
    );
}
