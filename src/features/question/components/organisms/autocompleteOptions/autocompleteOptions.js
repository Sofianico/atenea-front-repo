import InputAutocomplete from "../../atoms/inputAutocomplete/inputAutocomplete";
import CardAutocomplete from "../../molecules/cardAutocomplete/cardAutocomplete";

import styles from "./autocompleteOptions.module.css";

export default function AutocompleteOptions({
  placeholder,
  value,
  options,
  inSearching,
  onChange,
  onSelect,
  createLabel,
}) {
  return (
    <div className={styles.autocompleteOptions}>
      <label>
        <InputAutocomplete
          placeholder={placeholder}
          onChange={onChange}
          active={inSearching}
          value={value}
        />
      </label>

      {inSearching && (
        <div className={styles.gallery}>
          {options &&
            options.map((o) => (
              <div key={o.id}>
                <CardAutocomplete onClick={() => onSelect(o)} label={o.label} />
              </div>
            ))}

          <div>
            <CardAutocomplete
              onClick={() => {}}
              label={`${createLabel} "${
                value.slice(0, 75) + (value.length > 75 ? "..." : "")
              }"`}
            />
          </div>
        </div>
      )}
    </div>
  );
}
