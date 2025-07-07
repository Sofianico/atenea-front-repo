import { get } from "@/utils/api";

const URL_BACKEND = process.env.NEXT_PUBLIC_URL_BACKEND;

export const getGoalOptions = () => {
  return new Promise((resolve, reject) =>
    get(`${URL_BACKEND}/api/options/goal`)
      .then(({ data }) => {
        const options = data.map(({ id, src, value, labels }) => ({
          id,
          src,
          value,
          label: labels[0].label,
        }));
        resolve({ options });
      })
      .catch((err) => {
        reject(err);
      })
  );
};

export const getRoleOptions = ({ page, contains }) => {
  return new Promise((resolve, reject) =>
    get(`${URL_BACKEND}/api/options/role?page=${page}&contains=${contains}`)
      .then(({ data }) => {
        const options = data.map(({ id, value, labels }) => ({
          id,
          value,
          label: labels[0].label,
        }));
        resolve({ options });
      })
      .catch((err) => {
        reject(err);
      })
  );
};

export const getJobOptions = ({ contains }) => {
  return new Promise((resolve, reject) =>
    get(`${URL_BACKEND}/api/options/job?contains=${contains}`)
      .then(({ data }) => {
        const options = data.map(({ id, value, labels }) => ({
          id,
          value,
          label: labels[0].label,
        }));
        resolve({ options });
      })
      .catch((err) => {
        reject(err);
      })
  );
};

export const getEducationOptions = () => {
  return new Promise((resolve, reject) =>
    get(`${process.env.NEXT_PUBLIC_URL_BACKEND}/api/options/education`)
      .then(({ data }) => {
        const options = data.map(({ id, value, labels }) => ({
          id,
          value,
          label: labels[0].label,
        }));
        resolve({ options });
      })
      .catch((err) => {
        reject(err);
      })
  );
};
