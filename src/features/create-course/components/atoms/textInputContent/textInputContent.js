import React from "react";

import { ContentType } from "@/features/create-course/enum/ContentType";

import styles from "./textInputContent.module.css";

export default function TextInputContent({ id, text, onChange }) {
  
  const handleChangeTextarea = (e) => {
    onChange({
      content: {
        id,
        type: ContentType.TEXT,
        text: e.target.value,
      },
    });
  };

  return (
    <textarea
      className={styles.textInputContent}
      onChange={handleChangeTextarea}
      value={text}
      style={{ width: "100%" }}
    />
  );
}
