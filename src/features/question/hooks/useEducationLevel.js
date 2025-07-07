import { useEffect, useState } from "react";

import { getEducationOptions } from "@/services/options.service";

import {
  getEducationAnswer,
  postEducationAnswer,
} from "@/services/answers.service";

export const useEducationLevel = () => {
  const [options, setOptions] = useState([]);
  const [answer, setAnswer] = useState({});

  useEffect(() => {
    getEducationOptions()
      .then(({ options }) => {
        if (!options) return;
        setOptions(options);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    getEducationAnswer()
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
      postEducationAnswer({ educationOptionId: answer.id })
        .then(resolve)
        .catch(reject);
    });
  };

  return { options, answer, setAnswer, save };
};
