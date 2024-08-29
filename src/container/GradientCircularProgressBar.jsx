import React from "react";
import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const GradientCircularProgressBar = ({ percentage }) => {
  return (
    <div style={{ width: 120, height: 120, marginTop: 10 }}>
      <CircularProgressbarWithChildren
        value={percentage}
        strokeWidth={18}
        styles={buildStyles({
          pathColor: `url(#gradient)`, // Apply the gradient
          trailColor: "#36475b",
          strokeLinecap: "round",
        })}
      >
        {/* Define the gradient */}
        <svg style={{ height: 0 }}>
          <defs>
            <linearGradient id="gradient" gradientTransform="rotate(90)">
              <stop offset="0%" stopColor="#97d7fd" />
              <stop offset="100%" stopColor="#8068ef" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* You can add children here like labels or icons */}
        <div style={{ fontSize: 20, marginTop: -5 }}>
          <strong>{percentage}%</strong>
        </div>
      </CircularProgressbarWithChildren>
    </div>
  );
};

export default GradientCircularProgressBar;
