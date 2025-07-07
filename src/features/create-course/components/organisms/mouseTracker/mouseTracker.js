import { useMouseTracker } from "@/hooks/useMouseTracker";
import React from "react";

import "./mouseTracker.css";

export default function MouseTracker({ page }) {
  const { mouses } = useMouseTracker(page);

  return (
    <div className="mouse-container">
      {Object.entries(mouses).map(([id, mouse]) => (
        <div
          key={id}
          className="mouse-marker"
          style={{ left: mouse.x, top: mouse.y }}
        />
      ))}
    </div>
  );
}
