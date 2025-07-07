import { useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { UserContext } from "@/stores/UserContextProvider";

import { HeaderType } from "@/enums/HeaderType";

export const useHeader = () => {
  const pathname = usePathname();
  const { user } = useContext(UserContext);
  const [headerType, setHeaderType] = useState(HeaderType.PUBLIC);

  const publicHeader = headerType === HeaderType.PUBLIC;
  const loggingHeader = headerType === HeaderType.LOGGING;
  const privateHeader = headerType === HeaderType.PRIVATE;
  const noneHeader = headerType === HeaderType.NONE;

  useEffect(() => {
    if (
      pathname === "/question/learning-goal" ||
      pathname === "/question/role-select" ||
      pathname === "/question/job-title" ||
      pathname === "/question/education-level"
    ) {
      setHeaderType(HeaderType.LOGGING);
      return;
    }

    if (user) {
      setHeaderType(HeaderType.PRIVATE);
      return;
    }

    setHeaderType(HeaderType.PUBLIC);
  }, [user, pathname]);

  return { publicHeader, loggingHeader, privateHeader, noneHeader };
};
