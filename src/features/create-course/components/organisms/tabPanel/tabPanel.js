import React, { useState } from "react";

import styles from "./tabPanel.module.css";

export default function TabPanel({ children }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const childrenArray = Array.isArray(children) ? children : [children];

  return (
    <div className={styles.tabPanel}>
      <div className={styles.tabs}>
        {childrenArray.map((child, index) => (
          <button
            key={index}
            className={styles.tab + (activeIndex === index ? ` ${styles.activeTab}` : "")}
            onClick={() => setActiveIndex(index)}
          >
            {child.props.children[0]}
          </button>
        ))}
      </div>

      <div className={styles.children}>{childrenArray[activeIndex].props.children[1]}</div>
    </div>
  );
}
