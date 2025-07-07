import React, { useContext, useState } from "react";
import { useQuestions } from "../../hooks/useQuestions";
import ButtonPrimary from "@/components/atoms/buttonPrimary/buttonPrimary";
import InputText from "@/features/question/components/atoms/inputText/inputText";
import { ModalContext } from "@/stores/ModalContextProvider";
import { postIACourseDetailsDescriptionQuestions } from "@/services/ai.course.service";

export default function DescriptionQuestions({ initDescription, setDescription }) {
  const { close } = useContext(ModalContext);

  const [answerInput, setAnswerInput] = useState("");

  const {
    result: description,
    actualQuestion,
    actualQuestionIndex,
    questions,
    selectQuestion,
    addQuestion,
    removeQuestion,
    setAnswer,
  } = useQuestions({
    initResult: initDescription,
    getQuestion: ({ questions, result, onChunk }) => {
      postIACourseDetailsDescriptionQuestions({
        questions,
        description: result,
        onChunk: ({ description, question }) => {
          onChunk({ result: description, question });
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
    setDescription(description);
    close()
  };

  return (
    <div className="title-questions">
      {questions && questions.length > 0 ? (
        <div className="modal-title-questions">
          <div>
            <div className="header">
              <div>Generated Description:</div>
              <div className="generated-description">{description}</div>
            </div>

            <div className="description">
              Responde la siguiente pregunta para generar otra descripción.
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
