import { useEffect, useState } from "react";

import { getRoleOptions } from "@/services/options.service";

import { getRoleAnswer, postRoleAnswer } from "@/services/answers.service";

export const useRoleSelect = () => {
  const [options, setOptions] = useState([]);
  const [answer, setAnswer] = useState([]);

  const [page, setPage] = useState(0);
  const [prevPage, setPrevPage] = useState(0);

  const [contains, setContains] = useState("");
  const [prevContains, setPrevContains] = useState("");

  useEffect(() => {
    getRoleOptions({ page, contains })
      .then(({ options }) => {
        if (!options) return;

        if (page === 0 || contains !== prevContains) {
          setOptions(options);
          setPrevContains(contains);
        }

        if (page != prevPage) {
          setOptions((oldOptions) => {
            let newOptions = JSON.parse(JSON.stringify(oldOptions));
            newOptions = [...newOptions, ...options];
            return newOptions;
          });
          setPrevPage(page);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [page, contains]);

  useEffect(() => {
    getRoleAnswer()
      .then(({ answer }) => {
        if (!answer) return;
        setAnswer(answer);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    setPage(0);
  }, [contains]);

  const toggleRole = (o) => {
    setAnswer((oldAnswer) => {
      let newAnswer = JSON.parse(JSON.stringify(oldAnswer));

      if (!newAnswer) {
        newAnswer = [];
      }

      if (newAnswer.filter((other) => other.id === o.id).length > 0) {
        newAnswer = newAnswer.filter((other) => other.id !== o.id);
      } else {
        newAnswer.push(o);
      }

      return newAnswer;
    });
  };

  const nextPage = () => {
    setPage((oldPage) => oldPage + 1);
  };

  const save = () => {
    return new Promise((resolve, reject) => {
      if (!answer || answer.length === 0) return;
      postRoleAnswer({
        roleOptionsIds: answer.map(({ id }) => ({
          id,
        })),
      })
        .then(resolve)
        .catch(reject);
    });
  };

  return { options, answer, toggleRole, nextPage, setContains, save };
};
