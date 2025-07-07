import { useEffect, useRef, useState } from "react";

import { useParams } from "next/navigation";

import { socket } from "@/utils/websocket";

export const useMouseTracker = (page) => {
  const params = useParams();
  const { courseId } = params;

  const [mouseId, setMouseId] = useState("");
  const [_mouses, _setMouses] = useState([]);

  const mouses = Object.entries(_mouses)
    .filter(([id, data]) => data.page === page && id != mouseId)
    .reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});

  useEffect(() => {
    socket.on("mouseId", (mouseId) => {
      setMouseId(mouseId);
    });
    socket.on("mouse", (mouses) => {
      _setMouses(mouses);
    });
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = e.clientX + window.scrollX;
      const y = e.clientY + window.scrollY;

      socket.emit("mouse", courseId, {
        page,
        x,
        y,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  });

  return { mouses };
};
