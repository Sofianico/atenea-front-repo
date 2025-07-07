import { useEffect, useState } from "react";

export const usePanel = () => {
  const [open, setOpen] = useState(true);

  const toggle = () => {
    setOpen((o) => !o);
  };

  return { open, toggle };
};
