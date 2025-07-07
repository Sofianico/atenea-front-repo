import React from "react";

import styles from "./toggleLabelCard.module.css";

export default function ToggleLabelCard({ options, onSelect }) {
  return (
    <div className={styles.toggleLabelCard}>
      {options.map((o) => (
        <button
          key={o.id}
          className={styles.cardTag}
          onClick={() => onSelect(o)}
        >
          {o.label}

          <span className={"material-symbols-outlined" + ` ${styles.checkIcon}`}>check</span>
          <span className={"material-symbols-outlined" + ` ${styles.deleteIcon}`}>delete</span>
        </button>
      ))}
    </div>
  );
}
