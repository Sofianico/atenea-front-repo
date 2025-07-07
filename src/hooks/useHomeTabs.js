import { useState } from "react";

import SectionHome from "@/components/organisms/sectionHome/sectionHome";
import SectionCreatedByMy from "@/components/organisms/sectionCreatedByMy/sectionCreatedByMy";

import { TabsType } from "@/enums/TabsType";

export const useHomeTabs = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const tabs = [
    {
      label: "Inicio",
      dataSection: TabsType.COURSES_IN_PROGRESS,
      component: SectionHome,
      onClick: (i) => {
        setActiveIndex(i);
      },
    },
    {
      label: "Creados por mi",
      dataSection: TabsType.COURSES_CREATED_BY_ME,
      component: SectionCreatedByMy,
      onClick: (i) => {
        setActiveIndex(i);
      },
    },
  ];

  return { tabs, activeIndex };
};
