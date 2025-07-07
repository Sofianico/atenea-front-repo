import React, { useContext, useEffect, useState } from "react";

import { useQuestions } from "../../hooks/useQuestions";
import ButtonPrimary from "@/components/atoms/buttonPrimary/buttonPrimary";
import InputText from "@/features/question/components/atoms/inputText/inputText";
import { ModalContext } from "@/stores/ModalContextProvider";
import { postIACourseDetailsTitleQuestions } from "@/services/ai.course.service";

export default function TitleQuestions({ initTitle, setTitle }) {
  const { close } = useContext(ModalContext);

  const [answerInput, setAnswerInput] = useState("");

  const {
    result: title,
    actualQuestion,
    actualQuestionIndex,
    questions,
    selectQuestion,
    addQuestion,
    removeQuestion,
    setAnswer,
  } = useQuestions({
    initResult: initTitle,
    getQuestion: ({ questions, result, onChunk }) => {
      postIACourseDetailsTitleQuestions({
        questions,
        title: result,
        onChunk: ({ title, question }) => {
          onChunk({ result: title, question });
        },
      });
    },
  });

  const handleAnswer = (value) => {
    setAnswerInput(value);
    setAnswer(value);
  };

  const handleNext = () => {
    addQuestion();
    setAnswerInput("");
  };

  const handleSelect = (i) => {
    selectQuestion(i);
    setAnswer(actualQuestion.answer);
  };

  const handleFinish = () => {
    setTitle(title);
    close();
  };

  return (
    <div className="title-questions">
      {questions && questions.length > 0 ? (
        <div className="modal-title-questions">
          <div>
            <div className="title">
              <div>Generated Title:</div>
              <div>{title}</div>
            </div>

            <div className="description">
              Responde la siguiente pregunta para generar otro título.
            </div>

            <div className="actual-question">{actualQuestion?.question}</div>

            <div className="actual-answer">
              <InputText
                value={actualQuestion?.answer}
                placeholder=""
                onChange={handleAnswer}
              />
            </div>

            <div className="actions">
              <ButtonPrimary
                onClick={handleNext}
                label="Siguiente Pregunta"
              ></ButtonPrimary>

              <ButtonPrimary
                onClick={handleFinish}
                label="Acepetar Titulo"
              ></ButtonPrimary>
            </div>
          </div>

          <div className="questions">
            {questions.map((q, i) => (
              <div
                key={i}
                className={actualQuestionIndex === i ? " active" : ""}
              >
                <div className="question-header">
                  <button
                    onClick={() => {
                      removeQuestion(i);
                    }}
                  >
                    <span className="material-symbols-outlined">delete</span>{" "}
                  </button>
                </div>

                <div
                  className="question-content"
                  onClick={() => handleSelect(i)}
                >
                  <div>{q.question}</div>
                  <div>Answer: {q.answer}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div className="actions">
            <ButtonPrimary
              onClick={handleNext}
              label="Generar Pregunta"
            ></ButtonPrimary>
          </div>
        </div>
      )}
    </div>
  );
}
