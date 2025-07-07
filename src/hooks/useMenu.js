import { useContext, useEffect, useRef, useState } from "react";
import { useAuth } from "./useAuth";
import { TranslationContext } from "@/stores/TranslationContextProvider";

export const useMenu = () => {
  const { t } = useContext(TranslationContext)
  const [active, setActive] = useState(false);
  const { logout } = useAuth();
  const actionableRef = useRef(null);

  const options = [
    {
      id: "2",
      label: t('profile'),
      href: "/profile",
    },
    {
      id: "3",
      label: t('logout'),
      onClick: logout,
    },
  ];

  useEffect(() => {
    const handleClick = (e) => {
      if (actionableRef.current?.contains(e.target)) {
        setActive((oldActive) => !oldActive);
      } else {
        setActive(false);
      }
    };

    document.addEventListener("mouseup", handleClick);
    return () => {
      document.removeEventListener("mouseup", handleClick);
    };
  }, []);

  return { active, actionableRef, options };
};
