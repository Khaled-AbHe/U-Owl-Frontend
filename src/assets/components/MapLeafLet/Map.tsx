import { useRef, useEffect } from "react";
import { config, Map as MapT} from '@maptiler/sdk';
import '@maptiler/sdk/dist/maptiler-sdk.css';
import { MAPTILER_API_KEY } from "../../../API-import";

export default function Map() {
  const container = useRef<HTMLDivElement>(null);
  const map = useRef<MapT | null>(null);

  
  useEffect(()=>{
    if(!container.current) return;
    if(map.current) return;

    //https://docs.maptiler.com/vite/
    config.apiKey = MAPTILER_API_KEY;
    console.log('API KEY:', MAPTILER_API_KEY);
    map.current = new MapT({ container : container.current});
    console.log('Map')
  },[])

  return (
    
    <div className="MapLeaf mx-auto mt-4"   ref={container} style={{height:'400px',width:'30%',textAlign: "center" }}></div>
  );
  
};


//height:'300px',width:'100%