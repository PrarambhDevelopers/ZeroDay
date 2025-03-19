import React from "react";
import "./glitechedButton.css";
const TYButton = () => {
  return (
    <button
      className="buttonpro"
      onClick={() =>
        window.open(
          "https://docs.google.com/forms/d/e/1FAIpQLSdTiZCA4jIS1uEMRi4BKfjS8Kc0KAx5jUkPv1QNM6CRc-MFCA/viewform?usp=sharing",
          "_blank"
        )
      }
    >
      <span>TY Registration </span>
    </button>
  );
};

export default TYButton;
