import React, { useContext } from "react";
import { ModalContext } from "@/stores/ModalContextProvider";
import DescriptionQuestions from "../descriptionQuestions";
import { postIACourseInfoDescription } from "@/services/ai.course.service";
import IconTooltip from "../../molecules/iconTooltip/iconTooltip";
import InputLongText from "../../atoms/inputLongText/inputLongText";
import { CourseContext } from "@/features/create-course/stores/CourseContextProvider";
import { GenerationDescriptionType } from "@/features/create-course/enum/GenerationDescriptionType";

import styles from "./descriptionInput.module.css";

export default function DescriptionInput() {
  const { open } = useContext(ModalContext);

  const {
    title,
    description,
    setDescription,
    descriptionWordsCount,
    descriptionWordsMax,
  } = useContext(CourseContext);

  const handleGenerateDescription = (generationDescriptionType) => {
    postIACourseInfoDescription({
      generationDescriptionType,
      keywords: [
        ...(title ? title.split(" ") : []),
        ...(description ? description.split(" ") : []),
      ],
      title,
      description,
      onChunk: ({ description }) => {
        setDescription(description);
      },
    });
  };

  const handleGenerateQuestion = () => {
    open(DescriptionQuestions, { initTitle: description, setDescription });
  };

  return (
    <div className={styles.descriptionInput}>
      <div className="question-input-header">
        <IconTooltip
          icon="key"
          onClick={(e) =>
            handleGenerateDescription(GenerationDescriptionType.KEYWORDS)
          }
        >
          Generar una nueva descripción a partir de las
          <i>palabras clave</i>
        </IconTooltip>

        <IconTooltip
          icon="short_text"
          onClick={(e) =>
            handleGenerateDescription(GenerationDescriptionType.SHORTER)
          }
        >
          Generar una nueva descripción <i>más corta</i> conservando su
          significado
        </IconTooltip>

        <IconTooltip
          icon="auto_awesome"
          onClick={(e) =>
            handleGenerateDescription(GenerationDescriptionType.BY_DESCRIPTION)
          }
        >
          Generar una nueva descripción basada en el
          <i>descripción actual</i>
        </IconTooltip>

        <IconTooltip
          icon="question_mark"
          onClick={(e) => handleGenerateQuestion()}
        >
          Generar una nueva descripción basada en la <i>descripción actual</i> y{" "}
          <i>preguntas</i>
        </IconTooltip>

        <IconTooltip
          icon="subdirectory_arrow_right"
          onClick={(e) =>
            handleGenerateDescription(GenerationDescriptionType.BY_TITLE)
          }
        >
          Generar una nueva descripción basada en el <i>título</i>
        </IconTooltip>
      </div>

      <InputLongText
        label="Descripción"
        placeholder="Descripción"
        value={description}
        onChange={setDescription}
      />

      <div className="question-input-footer">
        {descriptionWordsCount}/{descriptionWordsMax}
      </div>
    </div>
  );
}
