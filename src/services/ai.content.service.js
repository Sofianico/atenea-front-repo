import { postAndStreamJSON } from "@/utils/api";

const URL_BACKEND = process.env.NEXT_PUBLIC_URL_BACKEND;

export const getKeyPointsContents = ({ courseId, sectionId, onChunk }) => {
  postAndStreamJSON(`${URL_BACKEND}/api/ai/exercise`, {
    courseId,
    sectionId,
  })
    .then(async (res) => {
      for await (const chunk of res) {
        onChunk(chunk);
      }
    })
    .catch((err) => {
      // reject(err);
    });
};

export const getTextContents = ({ courseId, sectionId, onChunk }) => {
  postAndStreamJSON(`${URL_BACKEND}/api/ai/exercise`, {
    numberOfExercises,
    type,
    difficulty,
    text,
    language,
    numberOfOptions,
  })
    .then(async (res) => {
      for await (const chunk of res) {
        onChunk(chunk);
      }
    })
    .catch((err) => {
      // reject(err);
    });
};

export const getExercise = ({
  numberOfExercises,
  type,
  difficulty,
  text,
  language,
  numberOfOptions,
  onChunk,
}) => {
  postAndStreamJSON(`${URL_BACKEND}/api/ai/exercise`, {
    numberOfExercises,
    type,
    difficulty,
    text,
    language,
    numberOfOptions,
  })
    .then(async (res) => {
      for await (const chunk of res) {
        onChunk(chunk);
      }
    })
    .catch((err) => {
      // reject(err);
    });
};
