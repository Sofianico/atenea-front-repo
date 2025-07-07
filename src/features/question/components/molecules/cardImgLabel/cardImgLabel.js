import Image from "next/image";

import styles from './cardImgLabel.module.css'

export default function CardImgLabel({ name, label, src, selected, onClick }) {
  return (
    <div
      className={styles.cardImgLabel + (selected ? ` ${styles.active}` : "")}
    >
      <label className={styles.label}>
        <input className={styles.input} type="radio" name={name} checked={selected} onChange={onClick} />

        <div className={styles.img}>
          <Image src={src} width={133} height={133} alt={label} />
        </div>

        <div className={styles.labelText}>{label}</div>
      </label>
    </div>
  );
}
