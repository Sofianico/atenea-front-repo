import styles from './cardAutocomplete.module.css'

export default function CardAutocomplete({ label, onClick }) {
  return (
    <button className={styles.cardAutocomplete} onClick={onClick}>
      {label}
    </button>
  );
}
