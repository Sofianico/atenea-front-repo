import styles from './inputText.module.css'

export default function InputText({ value, placeholder, onChange }) {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <input
      className={styles.inputText}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
    />
  );
}
