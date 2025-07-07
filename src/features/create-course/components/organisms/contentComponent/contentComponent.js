import React from "react";

import { ContentType } from "@/features/create-course/enum/ContentType";
import TextInputContent from "../../atoms/textInputContent/textInputContent";
import MultipleChoiceContent from "../../molecules/multipleChoiceContent/multipleChoiceContent";
import TrueFalseContent from "../../molecules/trueFalseContent/trueFalseContent";
import ActionsBetweenExercises from "../../molecules/actionsBetweenExercises/actionsBetweenExercises";
import ButtonIcon from "../../atoms/buttonIcon/buttonIcon";

import styles from "./contentComponent.module.css";

export default function ContentComponent({
  index,
  content,
  onChange,
  onDelete,
  onElaborateMore,
  onAddEmptyText,
  onAddTrueFalse,
  onAddMultipleChoice,
}) {

  const handleElaborateMore = () => {
    onElaborateMore({
      index
    })
  }

  const handleChange = ({ content }) => {
    onChange({
      index,
      content,
    });
  };

  const handleDelete = () => {
    onDelete({
      index,
    });
  };

  const handleAddEmptyText = () => {
    onAddEmptyText({
      index,
    });
  };

  const handleAddTrueFalse = () => {
    onAddTrueFalse({
      index,
    });
  };

  const handleAddMultipleChoice = () => {
    onAddMultipleChoice({
      index,
    });
  };

  return (
    <div className={styles.contentComponent}>
      <div className={styles.topActions}>
        <ButtonIcon onClick={handleDelete} icon="close" />
      </div>

      <div>
        {content.type === ContentType.TEXT && (
          <TextInputContent
            id={content.id}
            text={content.text}
            onChange={handleChange}
          />
        )}
        {content.type === ContentType.TRUE_FALSE && (
          <TrueFalseContent
            id={content.id}
            text={content.text}
            answer={content.answer}
            type={content.type}
            onChange={handleChange}
          />
        )}
        {content.type === ContentType.MULTPLE_CHOICE && (
          <MultipleChoiceContent
            id={content.id}
            text={content.text}
            options={content.options}
            answer={content.answer}
            type={content.type}
            onChange={handleChange}
          />
        )}
        <div className={styles.actionsBetweenExercises}>
          <ActionsBetweenExercises
            type={content.type}
            onElaborateMore={handleElaborateMore}
            onAddEmptyText={handleAddEmptyText}
            onAddTrueFalse={handleAddTrueFalse}
            onAddMultipleChoice={handleAddMultipleChoice}
          />
        </div>
      </div>
    </div>
  );
}
