import { useEffect, useState } from "react";

export const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [component, setComponent] = useState(null);
  const [props, setProps] = useState({});

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const open = (component, props) => {
    setComponent(() => component);
    setProps(props);
    setIsOpen(true);
  };

  const close = () => {
    setComponent(null);
    setProps({});
    setIsOpen(false);
  };

  return { component, props, isOpen, open, close };
};
