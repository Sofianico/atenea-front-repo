import { get, post } from "@/utils/api";

const URL_BACKEND = process.env.NEXT_PUBLIC_URL_BACKEND;

export const getAnswers = () => {
  return new Promise((resolve, reject) =>
    get(`${URL_BACKEND}/api/answer`)
      .then(({ data }) => {
        resolve({ answers: data });
      })
      .catch((err) => {
        reject(err);
      })
  );
};

export const getGoalAnswer = () => {
  return new Promise((resolve, reject) =>
    get(`${URL_BACKEND}/api/answer/goal`)
      .then(({ data }) => {
        if (!data || !data.goalOption) {
          resolve({ answer: null });
          return;
        }

        const answer = data.goalOption;
        answer.label = answer.labels[0].label;
        delete answer.labels;
        resolve({ answer });
      })
      .catch((err) => {
        reject(err);
      })
  );
};
export const getRoleAnswer = () => {
  return new Promise((resolve, reject) =>
    get(`${URL_BACKEND}/api/answer/role`)
      .then(({ data }) => {
        if (!data || !data.roleOptions) {
          resolve({ answer: null });
          return;
        }
        const answer = data.roleOptions.map(({ id, value, labels }) => ({
          id,
          value,
          label: labels[0].label,
        }));
        resolve({ answer });
      })
      .catch((err) => {
        reject(err);
      })
  );
};
export const getJobAnswer = () => {
  return new Promise((resolve, reject) =>
    get(`${URL_BACKEND}/api/answer/job`)
      .then(({ data }) => {
        if (!data || !data.jobOption) {
          resolve({ answer: null });
          return;
        }
        const answer = data.jobOption;
        answer.label = answer.labels[0].label;
        delete answer.labels;
        resolve({ answer });
      })
      .catch((err) => {
        reject(err);
      })
  );
};
export const getEducationAnswer = () => {
  return new Promise((resolve, reject) =>
    get(`${URL_BACKEND}/api/answer/education`)
      .then(({ data }) => {
        if (!data || !data.educationOption) {
          resolve({ answer: null });
          return;
        }
        const answer = data.educationOption;
        answer.label = answer.labels[0].label;
        delete answer.labels;
        resolve({ answer });
      })
      .catch((err) => {
        reject(err);
      })
  );
};

export const postGoalAnswer = ({ goalOptionId }) => {
  return new Promise((resolve, reject) =>
    post(`${URL_BACKEND}/api/answer/goal`, { goalOptionId })
      .then(({ data }) => {
        resolve({ answer: data });
      })
      .catch((err) => {
        reject(err);
      })
  );
};

export const postRoleAnswer = ({ roleOptionsIds }) => {
  return new Promise((resolve, reject) =>
    post(`${URL_BACKEND}/api/answer/role`, { roleOptionsIds })
      .then(({ data }) => {
        resolve({ answer: data });
      })
      .catch((err) => {
        reject(err);
      })
  );
};

export const postJobAnswer = ({ jobOptionId }) => {
  return new Promise((resolve, reject) =>
    post(`${URL_BACKEND}/api/answer/job`, { jobOptionId })
      .then(({ data }) => {
        resolve({ answer: data });
      })
      .catch((err) => {
        reject(err);
      })
  );
};

export const postEducationAnswer = ({ educationOptionId }) => {
  return new Promise((resolve, reject) =>
    post(`${URL_BACKEND}/api/answer/education`, { educationOptionId })
      .then(({ data }) => {
        resolve({ answer: data });
      })
      .catch((err) => {
        reject(err);
      })
  );
};
