import React from "react";

import styles from "./iconTooltip.module.css";

export default function IconTooltip({ icon, children, onClick, iconFontSize }) {
  return (
    <button className={styles.tooltip} onClick={onClick}>
      <span
        className="material-symbols-outlined"
        style={{ fontSize: iconFontSize }}
      >
        {icon}
      </span>
      <span className={styles.tooltipText}>{children}</span>
    </button>
  );
}
