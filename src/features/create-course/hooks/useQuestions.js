import { useEffect, useState } from "react";

export const useQuestions = ({ initResult, getQuestion }) => {
  const [result, setResult] = useState(initResult);
  const [questions, setQuestions] = useState([]);
  const [actualQuestionIndex, setActualQuestionIndex] = useState(0);

  const actualQuestion = questions[actualQuestionIndex];

  useEffect(() => {
    addQuestion();
  }, []);

  const addQuestion = () => {
    setQuestions((oldQuestions) => {
      const newQuestions = JSON.parse(JSON.stringify(oldQuestions));
      newQuestions.push({});
      return newQuestions;
    });
    getQuestion({
      result,
      questions,
      onChunk: ({ result, question }) => {
        setQuestions((oldQuestions) => {
          const newQuestions = JSON.parse(JSON.stringify(oldQuestions));
          newQuestions.pop();
          newQuestions.push({ question, answer: "" });
          setActualQuestionIndex(newQuestions.length - 1);
          return newQuestions;
        });
        setResult(result);
      },
    });
  };

  const removeQuestion = (i) => {
    setQuestions((oldQuestions) => {
      const newQuestions = JSON.parse(JSON.stringify(oldQuestions));
      newQuestions.splice(i, 1);
      return newQuestions;
    });
  };

  const setAnswer = (answer) => {
    setQuestions((oldQuestions) => {
      const newQuestions = JSON.parse(JSON.stringify(oldQuestions));
      newQuestions[actualQuestionIndex].answer = answer;
      return newQuestions;
    });
  };

  const selectQuestion = (i) => {
    setActualQuestionIndex(i);
  };

  return {
    result,
    actualQuestion,
    actualQuestionIndex,
    questions,
    addQuestion,
    removeQuestion,
    selectQuestion,
    setAnswer,
  };
};
