import React, { useContext } from "react";
import ContentComponent from "../contentComponent/contentComponent";
import FollowMouseBox from "../followMouseBox/followMouseBox";
import IconTooltip from "../../molecules/iconTooltip/iconTooltip";

import styles from "./contentCreator.module.css";
import { CourseContext } from "@/features/create-course/stores/CourseContextProvider";

export default function ContentCreator() {
  const {
    path,
    content,
    addKeypoints,
    elaborateMoreAt,
    setContentAt,
    addEmptyTextAt,
    addExerciseAt,
    deleteContentAt,
  } = useContext(CourseContext);

  const handleGenerateKeyPoints = () => {
    addKeypoints(path);
  };

  const handleElaborateMore = ({ index }) => {
    elaborateMoreAt(index);
  };

  const handleAddEmptyText = ({ index }) => {
    addEmptyTextAt(index);
  };

  const handleOnChange = ({ index, content }) => {
    setContentAt(index, content);
  };

  const handleOnDelete = ({ index }) => {
    deleteContentAt(index);
  };

  const handleAddTrueFalseWithSelected = (e) => {
    addExerciseAt(selectionElement.dataset.index, {
      numberOfExercises: 3,
      type: "TRUE_FALSE",
      difficulty: "MEDIUM",
      text: selection,
      language: "en_US",
    });
  };

  const handleAddMultipleChoiceWithSelected = (e) => {
    addExerciseAt(selectionElement.dataset.index, {
      numberOfExercises: 3,
      type: "MULTIPLE_CHOICE",
      difficulty: "MEDIUM",
      text: selection,
      numberOfOptions: 5,
      language: "en_US",
    });
  };

  const handleAddTrueFalse = ({ index }) => {
    addExerciseAt(index, {
      numberOfExercises: 3,
      type: "TRUE_FALSE",
      difficulty: "MEDIUM",
      text: content[index].text,
      language: "en_US",
    });
  };

  const handleAddMultipleChoice = ({ index }) => {
    addExerciseAt(index, {
      numberOfExercises: 3,
      type: "MULTIPLE_CHOICE",
      difficulty: "MEDIUM",
      text: content[index].text,
      numberOfOptions: 5,
      language: "en_US",
    });
  };

  return (
    <div className={styles.contentCreator}>
      <div className={styles.rootActions}>
        <IconTooltip
          onClick={() => handleAddEmptyText({ index: -1 })}
          icon="text_snippet"
        >
          Add Empty Text
        </IconTooltip>
        <IconTooltip onClick={() => handleGenerateKeyPoints()} icon="key">
          Generate <i>keypoints</i> based on title
        </IconTooltip>
      </div>

      <div>
        {content.map((c, index) => {
          return (
            <div key={c.id}>
              <ContentComponent
                index={index}
                content={c}
                onChange={handleOnChange}
                onDelete={handleOnDelete}
                onElaborateMore={handleElaborateMore}
                onAddEmptyText={handleAddEmptyText}
                onAddTrueFalse={handleAddTrueFalse}
                onAddMultipleChoice={handleAddMultipleChoice}
              />
            </div>
          );
        })}
      </div>

      <FollowMouseBox>
        <IconTooltip
          onClick={handleAddMultipleChoiceWithSelected}
          icon="radio_button_checked"
        >
          Generate Multiple Choice based on selected text.
        </IconTooltip>

        <IconTooltip onClick={handleAddTrueFalseWithSelected} icon="rule">
          Generate True False based on selected text.
        </IconTooltip>
      </FollowMouseBox>
    </div>
  );
}
