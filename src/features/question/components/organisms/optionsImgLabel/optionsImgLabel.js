import CardImgLabel from "../../molecules/cardImgLabel/cardImgLabel";

import styles from './optionsImgLabel.module.css'

export default function OptionsImgLabel({ name, options, selected, onSelect }) {
  return (
    <div className={styles.optionsImgLabel}>
      {options.map((o) => (
        <CardImgLabel
          key={o.id}
          name={name}
          src={o.src}
          label={o.label}
          selected={selected.id === o.id}
          onClick={() => onSelect(o)}
        />
      ))}
    </div>
  );
}
