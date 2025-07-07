import {
  del,
  get,
  post,
  postAndStream,
  postFileAndProgress,
} from "@/utils/api";

const URL_BACKEND = process.env.NEXT_PUBLIC_URL_BACKEND;

export const postIAChat = ({ conversationId, message, onChunk }) => {
  postAndStream(`${URL_BACKEND}/api/ai/chat`, {
    conversationId,
    message,
  })
    .then(async (res) => {
      for await (const chunk of res) {
        chunk
          .split("\n")
          .filter((c) => c.length > 0)
          .map((c) => JSON.parse(c))
          .forEach(onChunk);
      }
    })
    .catch((err) => {
      // reject(err);
    });
};

export const postChatDocuments = ({ filesIds, message, onChunk }) => {
  return new Promise((resolve, reject) => {
    postAndStream(`${URL_BACKEND}/api/ai/chat/documents`, { filesIds, message })
      .then(async (res) => {
        for await (const chunk of res) {
          chunk
            .split("\n")
            .filter((c) => c.length > 0)
            .map((c) => JSON.parse(c))
            .forEach(onChunk);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getIAChatDocument = () => {
  return new Promise((resolve, reject) => {
    get(`${URL_BACKEND}/api/ai/chat/document`)
      .then(({ data }) => {
        const { files } = data;
        resolve({ files });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const postIAChatDocument = ({ file, onChunk }) => {
  return new Promise((resolve, reject) => {
    postFileAndProgress(`${URL_BACKEND}/api/ai/chat/document`, file)
      .then(async (res) => {
        for await (const chunk of res) {
          onChunk(chunk);
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const deleteIAChatDocument = ({ fileId }) => {
  return new Promise((resolve, reject) => {
    del(`${URL_BACKEND}/api/ai/chat/document/${fileId}`)
      .then(({ data }) => {
        const { fileId } = data;
        resolve({ fileId });
      })
      .catch((err) => {
        reject(err);
      });
  });
};
