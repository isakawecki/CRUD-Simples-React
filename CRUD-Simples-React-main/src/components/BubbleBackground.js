import React from "react";
import "./BubbleBackground.css";

const BubbleBackground = () => {
  return (
    <div className="bubble-background">
      {Array.from({ length: 20 }).map((_, index) => (
        <span key={index} className="bubble"></span>
      ))}
    </div>
  );
};

export default BubbleBackground;
