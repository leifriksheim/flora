import { useEffect, useRef } from "react";
import "./index.css";
import imgSrc from '../../assets/img/collserola.jpg';

export default function Park() {
  return (
    <main className="park">
      <div className="container">
        <div className="article">
          <img className="main-image" src={imgSrc} />
        <h1 className="main-heading">Park</h1>
        <p>
        Considered to be the most extensive green space in the metropolitan area of Barcelona, and covering over 8,000 hectares (seventeen kilometres long and six kilometres wide) with its highest peak of 512 metres (Tibidabo), the Collserola Park is a recreational area and getaway for those  living in Cerdanyola and in Barcelona. 
        </p>
        <p>
          Flora within the area is of Mediterranean origin, located in the mountain range and nearby the sea, it houses 190 different types of vertebrates, Aleppo pine (Pinus halepensis) forests and has an estimated population of 1,000 species of plants and 10,000 million trees
        </p>
        </div>
      </div>
    </main>
  );
}
