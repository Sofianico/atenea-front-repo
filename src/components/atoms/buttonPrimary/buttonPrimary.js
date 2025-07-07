import styles from './buttonPrimary.module.css'

export default function ButtonPrimary({ label, onClick }) {
  return (
    <button className={styles.buttonPrimary} onClick={onClick}>
      {label}
    </button>
  );
}
