import React from "react";
import './../styles/footer.css';

export default function Footer() {
    return (
      <div className="footer">
        <div className="left">
          <h1>Margaux viti</h1>
          <div className="footerbar"></div>
          <p>Psychotérapeute practitienne</p>
          <p>Tel : (+33) 07 81 82 20 84 . Mail : psychologue.margauxviti@gmail.com </p>
        </div>
        <div className="right">
          <img src="./../public/greenlogo.png" alt="" />
          <p>N°ADELI : 789330958 / N°SIRET : 889 727 244 00028</p>
        </div>
      </div>
    );
  }
  