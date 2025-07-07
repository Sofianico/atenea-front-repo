import styles from "./optionsRadio.module.css";

export default function OptionsRadio({ name, options, selected, onSelect }) {
  return (
    <div className={styles.optionsRadio}>
      {options.map((o) => (
        <label
          key={o.id}
          className={
            styles.label + (selected.id === o.id ? ` ${styles.active}` : "")
          }
        >
          <input className={styles.input} type="radio" name={name} onChange={() => onSelect(o)} />
          {o.label}
        </label>
      ))}
    </div>
  );
}
