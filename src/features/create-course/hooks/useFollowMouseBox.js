import { useEffect, useState } from "react";
import { useMousePosition } from "./useMousePosition";
import { useSelection } from "./useSelection";

export const useFollowMousePosition = (div) => {
  const [followMousePosition, setFollowMousePosition] = useState({
    x: 0,
    y: 0,
  });

  const { mousePosition } = useMousePosition();

  useEffect(() => {
    const { x: mouseX, y: mouseY } = mousePosition;

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const divSize = div?.current
      ? div.current.getBoundingClientRect()
      : { width: 0, height: 0 };
    const divWidth = divSize.width;
    const divHeight = divSize.height;

    const maxX = windowWidth - divWidth;
    const maxY = windowHeight - divHeight;

    const x = Math.min(Math.max(mouseX + 30, 10), maxX - 10);
    const y = Math.min(Math.max(mouseY - divHeight - 30, 10), maxY - 10);

    setFollowMousePosition({ x, y });
  }, [mousePosition, div]);

  //
  const [showPopup, setShowPopup] = useState(false);
  const { selectionIsEmpty } = useSelection();

  useEffect(() => {
    setShowPopup(!selectionIsEmpty);
  }, [selectionIsEmpty]);

  useEffect(() => {
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  const handleClick = (e) => {
    if (selectionIsEmpty || e.target.tagName === "BUTTON") setShowPopup(false);
  };

  return { showPopup, followMousePosition };
};
