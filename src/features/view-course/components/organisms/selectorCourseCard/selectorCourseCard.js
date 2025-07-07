"use client";
import { useEffect, useState } from "react";

import ButtonLink from "@/components/atoms/buttonLink/buttonLink";
import CourseCard from "../../molecules/courseCard/courseCard";

import styles from "./selectorCourseCard.module.css";
import InputText from "@/features/question/components/atoms/inputText/inputText";

export default function SelectorCourseCard({
  label,
  options,
  placeholder,
  onClick,
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
      <div className={styles.inputTextContainer}>
        <InputText
          label={label}
          placeholder={placeholder}
          onChange={handleFilter}
        />
      </div>

      <div className={styles.gallery}>
        {options.slice(0, numberOfCardsToShow).map((o) => (
          <div key={o.id} className={styles.labelCardWrapper}>
            <CourseCard
              tags={o.tags}
              title={o.title}
              description={o.description}
              onClick={() => onClick(o)}
            >
              {o.label}
            </CourseCard>
          </div>
        ))}

        {showAddRole && (
          <div className={styles.labelCardWrapper}>
            <CourseCard selected={false} onClick={() => {}}>
              {createLabel} &quot;
              {startsWith.slice(0, 14) + (startsWith.length > 14 ? "..." : "")}
              &quot;
            </CourseCard>
          </div>
        )}
      </div>

      <div>
        <ButtonLink onClick={onMoreOption} label={moreLabel} />
      </div>
    </div>
  );
}
