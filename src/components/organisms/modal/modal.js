"use client";

import React, { useContext } from "react";
import { ModalContext } from "@/stores/ModalContextProvider";

import styles from "./modal.module.css";

export default function Modal() {
  const { isOpen, close, component, props } = useContext(ModalContext);

  if (!isOpen || !component) return null;

  const Component = component;

  const handleBgClick = (e) => {
    if (e.target === e.currentTarget) {
      close();
    }
  };

  return (
    <div
      className={styles.modal + (isOpen ? ` ${styles.active}` : "")}
      onClick={handleBgClick}
    >
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <button className={styles.modalAction} onClick={close}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <Component {...props} />
      </div>
    </div>
  );
}
