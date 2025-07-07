import { useFollowMousePosition } from "@/features/create-course/hooks/useFollowMouseBox";
import React, { useRef } from "react";

export default function FollowMouseBox({ children }) {
  const divRef = useRef();
  const { showPopup, followMousePosition } = useFollowMousePosition(divRef)

  return (
    <div
      ref={divRef}
      style={{
        position: "absolute",
        top: followMousePosition.y,
        left: followMousePosition.x,
        backgroundColor: "white",
        border: "1px solid #ccc",
        padding: "5px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
        zIndex: 1000,
        visibility: showPopup ? "visible" : "hidden",
      }}
    >
      {children}
    </div>
  );
}
