"use client";
import { useEffect, useState } from "react";

import ButtonLink from "@/components/atoms/buttonLink/buttonLink";
import CardLabel from "../../molecules/cardLabel/cardLabel";
import InputText from "../../atoms/inputText/inputText";

import styles from "./selectorLabelCard.module.css";

export default function SelectorLabelCard({
  label,
  options,
  selecteds,
  placeholder,
  onSelect,
  onFilter,
  onMoreOption,
  createLabel,
  moreLabel,
}) {
  const [startsWith, setStartsWith] = useState("");

  const showAddRole = !!startsWith;

  const numberOfCardsToShow =
    showAddRole && options.length % 3 === 0
      ? options.length - 1
      : options.length;

  useEffect(() => {
    onFilter(startsWith);
  }, [startsWith]);

  const handleFilter = (startsWith) => {
    setStartsWith(startsWith);
  };

  return (
    <div className={styles.selectorLabelCard}>
      <InputText
        label={label}
        placeholder={placeholder}
        onChange={handleFilter}
      />

      <div className={styles.gallery}>
        {options.slice(0, numberOfCardsToShow).map((o) => (
          <div key={o.id} className={styles.labelCardWrapper}>
            <CardLabel
              selected={selecteds.filter((s) => s.id === o.id).length > 0}
              onClick={() => onSelect(o)}
            >
              {o.label}
            </CardLabel>
          </div>
        ))}

        {showAddRole && (
          <div className={styles.labelCardWrapper}>
            <CardLabel selected={false} onClick={() => {}}>
              {createLabel} &quot;
              {startsWith.slice(0, 14) + (startsWith.length > 14 ? "..." : "")}
              &quot;
            </CardLabel>
          </div>
        )}
      </div>

      <div>
        <ButtonLink onClick={onMoreOption} label={moreLabel} />
      </div>
    </div>
  );
}
