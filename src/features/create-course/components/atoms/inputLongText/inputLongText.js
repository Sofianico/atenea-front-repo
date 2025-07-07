import React from "react";

import styles from "./inputLongText.module.css";

export default function InputLongText({ value, onChange, placeholder }) {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <textarea
      className={styles.inputLongText}
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
    ></textarea>
  );
}
