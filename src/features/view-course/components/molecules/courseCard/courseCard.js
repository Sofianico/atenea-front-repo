import React from "react";

import styles from "./courseCard.module.css";

export default function CourseCard({ tags, title, description, onClick }) {
  return (
    <button className={styles.courseCard} onClick={onClick}>
      <div className={styles.tags}>
        {tags &&
          tags.map((t) => (
            <div key={t.id} className={styles.tag}>
              {t.labels[0].label}
            </div>
          ))}
      </div>

      <div className={styles.title}>{title}</div>

      <div className={styles.description}>{description}</div>
    </button>
  );
}
