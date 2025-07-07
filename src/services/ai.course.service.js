import { get, postAndStreamJSON } from "@/utils/api";

const URL_BACKEND = process.env.NEXT_PUBLIC_URL_BACKEND;

export const postIACourseInfoTitle = ({
  generationTitleType,
  keywords,
  title,
  onChunk,
}) => {
  postAndStreamJSON(`${URL_BACKEND}/api/ai/course/details/title`, {
    generationTitleType,
    keywords,
    title,
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

export const postIACourseDetailsTitleQuestions = ({
  title,
  questions,
  onChunk,
}) => {
  postAndStreamJSON(`${URL_BACKEND}/api/ai/course/details/title/question`, {
    questions,
    title,
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

export const postIACourseDetailsDescriptionQuestions = ({
  description,
  questions,
  onChunk,
}) => {
  postAndStreamJSON(
    `${URL_BACKEND}/api/ai/course/details/description/question`,
    {
      questions,
      description,
    }
  )
    .then(async (res) => {
      for await (const chunk of res) {
        onChunk(chunk);
      }
    })
    .catch((err) => {
      // reject(err);
    });
};

export const postIACourseInfoDescription = ({
  generationDescriptionType,
  keywords,
  title,
  description,
  onChunk,
}) => {
  postAndStreamJSON(`${URL_BACKEND}/api/ai/course/details/description`, {
    generationDescriptionType,
    keywords,
    title,
    description,
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

export const getAICourseSectionId = async () => {
  return get(`${URL_BACKEND}/api/ai/course/details/section/id`)
    .then(({ data }) => {
      console.log("consulta al back para id");
      return data.id;
    })
    .catch();
};

export const postIACourseSections = ({
  title,
  description,
  sectionsLength,
  onChunk,
}) => {
  postAndStreamJSON(`${URL_BACKEND}/api/ai/course/details/sections`, {
    title,
    description,
    sectionsLength,
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
