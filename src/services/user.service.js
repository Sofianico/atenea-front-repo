import { setLoggedIn } from "../utils/login";
import { get } from "@/utils/api";

const URL_BACKEND = process.env.NEXT_PUBLIC_URL_BACKEND;

export const getUser = () => {
  return new Promise((resolve, reject) =>
    get(`${URL_BACKEND}/api/user`)
      .then(({ data }) => {
        setLoggedIn(true);
        resolve({ user: data });
      })
      .catch((err) => {
        setLoggedIn(false);
        reject(err);
      })
  );
};
