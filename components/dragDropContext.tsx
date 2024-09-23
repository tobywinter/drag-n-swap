import React, { useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { isMobile } from "react-device-detect";

// Helper function to detect touch devices (only in the browser)
const isTouchDevice = () => {
  return (
    typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0)
  );
};
interface DragDropContextWrapperProps {
  children: React.ReactNode;
}

const DragDropContextWrapper: React.FC<DragDropContextWrapperProps> = ({
  children,
}) => {
  const [isTouch, setIsTouch] = useState(isMobile || isTouchDevice());

  useEffect(() => {
    // Only add event listener in the browser environment
    if (typeof window === "undefined") {
      return; // Skip the effect if window is undefined (server-side)
    }

    const handleResize = () => {
      const isTouchDeviceNow = isTouchDevice();
      setIsTouch(isTouchDeviceNow);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <DndProvider backend={isTouch ? TouchBackend : HTML5Backend}>
      {children}
    </DndProvider>
  );
};

export default DragDropContextWrapper;
