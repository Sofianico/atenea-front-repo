import { asyncIterator } from "./async";
import { JSONbalance } from "./json";

export const get = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url, {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then(({ data }) => {
        resolve({ data });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const post = (url, body) => {
  return new Promise((resolve, reject) =>
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then(({ data }) => {
        resolve({ data });
      })
      .catch((err) => {
        reject(err);
      })
  );
};

export const del = (url) => {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: "DELETE",
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }
        return res.json();
      })
      .then(({ data }) => {
        resolve({ data });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const postAndStreamJSON = (url, body) => {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  })
    .then(async function* (res) {
      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      let jsonStr = "";

      for await (const chunk of asyncIterator(reader)) {
        jsonStr += decoder.decode(chunk);
        try {
          yield JSON.parse(JSONbalance(jsonStr));
        } catch (err) {
          console.log("err", err);
          console.log("jsonStr", jsonStr);
        }
      }
    })
    .catch((err) => {
      console.log("err", err);
      reject(err);
    });
};

export const postAndStream = (url, body) => {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    credentials: "include",
  })
    .then(async function* (res) {
      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      let jsonStr = "";

      for await (const chunk of asyncIterator(reader)) {
        try {
          yield decoder.decode(chunk);
        } catch (err) {
          console.log("err", err);
          console.log("jsonStr", jsonStr);
        }
      }
    })
    .catch((err) => {
      console.log("err", err);
      reject(err);
    });
};

export const postFileAndProgress = (url, file) => {
  const formData = new FormData();
  formData.append("file", file);

  return fetch(url, {
    method: "POST",
    body: formData,
    credentials: "include",
  })
    .then(async function* (res) {
      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();

      for await (const chunk of asyncIterator(reader)) {
        const text = decoder.decode(chunk);
        for (const line of text.trim().split("\n")) {
          try {
            yield JSON.parse(line);
          } catch (err) {
            console.log("err", err);
            console.log("chunk", chunk);
          }
        }
      }
    })
    .catch((err) => {
      console.log("err", err);
      reject(err);
    });
};
