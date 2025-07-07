"use client";

import styles from "./buttonLink.module.css";

export default function ButtonLink({ label, onClick }) {
  return (
    <button className={styles.link} onClick={onClick}>
      {label}
    </button>
  );
}
