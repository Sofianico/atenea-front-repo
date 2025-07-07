import styles from "./buttonCollapse.module.css";

export default function ButtonCollapse({ active, onClick }) {
  return (
    <button
      className={`${styles.buttonIcon} ${active ? styles.active : ""}`}
      onClick={onClick}
    >
      <span className={"material-symbols-outlined" + ` ${styles.icon}`}>
        arrow_drop_down
      </span>
    </button>
  );
}
