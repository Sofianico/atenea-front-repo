import { useEffect, useState } from "react";

import { getJobOptions } from "@/services/options.service";

import { getJobAnswer, postJobAnswer } from "@/services/answers.service";

export const useJobTitle = () => {
  const [options, setOptions] = useState([]);
  const [answer, setAnswer] = useState({});

  const [loadingFromApi, setLoadingFromApi] = useState(false);

  const [contains, setContains] = useState("");

  const inSearching = !answer.label && contains;

  const value =
    answer && answer.label && options.length > 0
      ? options.filter((o) => o.id === answer.id)[0].label
      : contains;

  useEffect(() => {
    getJobAnswer()
      .then(({ answer }) => {
        if (!answer) return;
        setLoadingFromApi(true);
        setAnswer(answer);
        setContains(answer.label);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    if (!contains) {
      setOptions([]);
      return;
    }
    getJobOptions({ contains })
      .then(({ options }) => {
        if (!options) return;
        setOptions(options);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [contains]);

  useEffect(() => {
    if (loadingFromApi) {
      setLoadingFromApi(false);
      return;
    }
    setAnswer({});
  }, [contains]);

  const save = () => {
    return new Promise((resolve, reject) => {
      if (!answer || !answer.id) return;
      postJobAnswer({ jobOptionId: answer.id }).then(resolve).catch(reject);
    });
  };

  return {
    options,
    answer,
    value,
    setAnswer,
    contains,
    setContains,
    inSearching,
    save,
  };
};
