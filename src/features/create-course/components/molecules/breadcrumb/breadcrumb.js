import React from "react";

import styles from "./breadcrumb.module.css";

export default function Breadcrumb({ path }) {
  return (
    <div className={styles.breadcrumb}>
      {path.map((p, i) => (
        <li key={i}>{p}</li>
      ))}
    </div>
  );
}
