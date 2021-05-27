// Vidur Ratna 1309874
import React from "react";

import image from "../../images/hero/hero-main.png";
import "./hero.css";

export class Hero extends React.Component {
  render() {
    return (
      <img src={image} className="img-fluid full-width" alt="The more you read the more you know" />
    );
  }
}
  
export default Hero;