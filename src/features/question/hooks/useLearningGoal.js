import { useEffect, useState } from "react";

import { getGoalOptions } from "@/services/options.service";

import { getGoalAnswer, postGoalAnswer } from "@/services/answers.service";

export const useLearningGoal = () => {
  const [options, setOptions] = useState([]);
  const [answer, setAnswer] = useState({});

  useEffect(() => {
    getGoalOptions()
      .then(({ options }) => {
        if (!options) return;
        setOptions(options);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    getGoalAnswer()
      .then(({ answer }) => {
        if (!answer) return;
        setAnswer(answer);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const save = () => {
    return new Promise((resolve, reject) => {
      if (!answer || !answer.id) return;
      postGoalAnswer({ goalOptionId: answer.id }).then(resolve).catch(reject);
    });
  };

  return { options, answer, setAnswer, save };
};
