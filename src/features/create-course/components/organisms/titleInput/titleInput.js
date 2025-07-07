import React, { useContext } from "react";

import IconTooltip from "../../molecules/iconTooltip/iconTooltip";
import InputText from "@/features/question/components/atoms/inputText/inputText";
import { CourseContext } from "../../../stores/CourseContextProvider";
import { ModalContext } from "@/stores/ModalContextProvider";

import TitleQuestions from "../titleQuestions";
import { GenerationTitleType } from "../../../enum/GenerationTitleType";
import { postIACourseInfoTitle } from "@/services/ai.course.service";

import styles from './titleInput.module.css'

export default function TitleInput() {
  const { open } = useContext(ModalContext);

  const { title, setTitle, titleWordsCount, titleWordsMax } =
    useContext(CourseContext);

  const handleGenerateTitle = (generationTitleType) => {
    postIACourseInfoTitle({
      generationTitleType,
      keywords: title.split(" "),
      title,
      onChunk: ({ title }) => setTitle(title),
    });
  };

  const handleGenerateQuestion = () => {
    open(TitleQuestions, {
      initTitle: title,
      setTitle: (title) => {
        setTitle(title);
      },
    });
  };

  return (
    <div className={styles.titleInput}>
      <div className="question-input-header">
        <IconTooltip
          icon="key"
          onClick={(e) => handleGenerateTitle(GenerationTitleType.KEYWORDS)}
        >
          Generar un nuevo título a partir de las <i>palabras clave</i>
        </IconTooltip>

        <IconTooltip
          icon="short_text"
          onClick={(e) => handleGenerateTitle(GenerationTitleType.SHORTER)}
        >
          Generar un título <i>más corto</i> conservando su significado
        </IconTooltip>

        <IconTooltip
          icon="auto_awesome"
          onClick={(e) => handleGenerateTitle(GenerationTitleType.BY_TITLE)}
        >
          Generar un nuevo título basado en el <i>título actual</i>
        </IconTooltip>

        <IconTooltip
          icon="question_mark"
          onClick={(e) => handleGenerateQuestion()}
        >
          Generar un nuevo título basado en el <i>título actual</i> y{" "}
          <i>preguntas</i>
        </IconTooltip>
      </div>

      <InputText
        label="Titulo"
        placeholder="Titulo"
        value={title}
        onChange={setTitle}
      />

      <div className="question-input-footer">
        <div>
          {titleWordsCount}/{titleWordsMax}
        </div>
      </div>
    </div>
  );
}
