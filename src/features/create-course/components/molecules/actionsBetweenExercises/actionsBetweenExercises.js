import { ContentType } from "@/features/create-course/enum/ContentType";
import IconTooltip from "../iconTooltip/iconTooltip";

import styles from "./actionsBetweenExercises.module.css";

export default function ActionsBetweenExercises({
  type,
  onAddEmptyText,
  onAddTrueFalse,
  onAddMultipleChoice,
  onElaborateMore,
}) {
  return (
    <div className={styles.actionsBetweenExercises}>
      <IconTooltip onClick={onAddEmptyText} icon="text_snippet">
        Add Empty Text
      </IconTooltip>

      {ContentType.TEXT === type && (
        <>
          <IconTooltip onClick={onElaborateMore} icon="more">Expand text</IconTooltip>

          <IconTooltip onClick={onAddTrueFalse} icon="rule">
            Generate True False based on upper text.
          </IconTooltip>

          <IconTooltip
            onClick={onAddMultipleChoice}
            icon="radio_button_checked"
          >
            Generate Multiple Choice based on upper text.
          </IconTooltip>
        </>
      )}
    </div>
  );
}
