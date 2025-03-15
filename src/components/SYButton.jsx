import React from "react";
import "./glitechedButton.css";
const SYButton = () => {
  return (
    <button
      className="buttonpro"
      onClick={() =>
        window.open(
          "https://docs.google.com/forms/d/e/1FAIpQLSfVhOkY5lYq-bwk8X7SnrJzF7emW9DgNqGKCDBouUdjILXHBA/viewform?usp=sharing",
          "_blank"
        )
      }
    >
      <span>SY Registration </span>
    </button>
  );
};

export default SYButton;
