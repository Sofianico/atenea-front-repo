import styles from "./inputAutocomplete.module.css";

export default function InputAutocomplete({
  placeholder,
  onChange,
  active,
  value,
}) {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <input
      className={styles.inputAutocomplete + (active ? ` ${styles.active}` : "")}
      onChange={handleChange}
      placeholder={placeholder}
      value={value}
    />
  );
}
