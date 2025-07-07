import styles from "./cardLabel.module.css";

export default function CardLabel({ children, selected, onClick }) {
  return (
    <button
      className={styles.cardLabel + (selected ? ` ${styles.active}` : "")}
      onClick={onClick}
    >
      {children}

      <div>
        <span
          className={
            "material-symbols-outlined" +
            (selected ? ` ${styles.activeIcon}` : "")
          }
        >
          {selected ? "check" : "add"}
        </span>
      </div>
    </button>
  );
}
