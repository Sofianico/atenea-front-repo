import { useContext, useEffect, useState } from "react";

import { UserContext } from "@/stores/UserContextProvider";

import { getTranslation } from "@/services/translation.service";

import { getBrowserLanguage } from "@/utils/language";

export const useTranslation = () => {
  const { user } = useContext(UserContext);
  const [language, setLanguage] = useState(getBrowserLanguage());

  useEffect(() => {
    if (user) {
      setLanguage(user.language.value);
    }
  }, [user]);

  const t = (key, ...props) => {
    return getTranslation(language, key, props);
  };

  return { t };
};
