import styles from "./buttonIcon.module.css";

export default function ButtonIcon({ icon, label, onClick, iconFontSize }) {
  return (
    <button className={styles.buttonIcon} onClick={onClick}>
      <span
        style={{ fontSize: iconFontSize }}
        className={"material-symbols-outlined" + ` ${styles.icon}`}
      >
        {icon}
      </span>
      {label && label}
    </button>
  );
}
