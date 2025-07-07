import { getExercise } from "@/services/ai.content.service";
import { socket } from "@/utils/websocket";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useJSONBuffer } from "./useJSONBuffer";

let i = 0;

export const useContentWebsocket = () => {
  const params = useParams();
  const { courseId, sectionId } = params;

  const [content, setContent] = useState([]);
  const [oldContent, setOldContent] = useState([]);
  const [ids, setIds] = useState([]);

  useEffect(() => {
    console.log("content", content);
  }, [content]);

  useEffect(() => {
    console.log("oldContent", oldContent);
  }, [oldContent]);

  const ExerciseJSONBuffer = useJSONBuffer();
  const KeypointsJSONBuffer = useJSONBuffer();
  const ElaborateMoreJSONBuffer = useJSONBuffer();

  useEffect(() => {
    socket.emit("join-content", courseId, sectionId);

    socket.on("set-content", setContent);
  }, [courseId, sectionId]);

  useEffect(() => {
    socket.on("add-empty-text", (i, id) => {
      console.log("add-empty-text-reaction", i, id);
      setContent((oldContent) => {
        const newContent = JSON.parse(JSON.stringify(oldContent));
        newContent.splice(parseInt(i) + 1, 0, {
          id,
          type: "TEXT",
          text: "",
        });
        return newContent;
      });
    });

    socket.on("set-content-at", (i, content) => {
      setContent((oldContent) => {
        const newContent = JSON.parse(JSON.stringify(oldContent));
        newContent[i] = content;
        return newContent;
      });
    });

    socket.on("init-add-exercise-at", (ids) => {
      ExerciseJSONBuffer.init();

      setIds(ids);

      setContent((oldContent) => {
        setOldContent(() => {
          return oldContent;
        });
        return oldContent;
      });
    });

    socket.on("add-exercise-at", (i, chunk) => {
      const exercises = ExerciseJSONBuffer.append(chunk);

      setIds((ids) => {
        exercises.forEach((exercise, index) => {
          exercise.id = ids[index];
        });
        return ids;
      });

      setOldContent((oldContent) => {
        setContent(() => {
          const newContent = JSON.parse(JSON.stringify(oldContent));
          newContent.splice(parseInt(i) + 1, 0, ...exercises);
          return newContent;
        });
        return oldContent;
      });
    });

    // Develop here
    socket.on("init-elaborate-more-at", (ids) => {
      ElaborateMoreJSONBuffer.init();

      setIds(ids);

      setContent((oldContent) => {
        setOldContent(() => {
          return oldContent;
        });
        return oldContent;
      });
    });

    socket.on("elaborate-more-at", (i, chunk) => {
      const elaborations = ElaborateMoreJSONBuffer.append(chunk);

      setIds((ids) => {
        elaborations.forEach((text, index) => {
          text.id = ids[index];
        });
        return ids;
      });

      setOldContent((oldContent) => {
        setContent(() => {
          const newContent = JSON.parse(JSON.stringify(oldContent));
          newContent.splice(parseInt(i) + 1, 0, ...elaborations);
          return newContent;
        });
        return oldContent;
      });
    });

    socket.on("init-add-keypoints", (ids) => {
      KeypointsJSONBuffer.init();

      setIds(ids);

      setContent((oldContent) => {
        setOldContent(() => {
          return oldContent;
        });
        return oldContent;
      });
    });

    socket.on("add-keypoints", (chunk) => {
      const keypoints = KeypointsJSONBuffer.append(chunk);

      if (!keypoints) return;

      setIds((ids) => {
        keypoints.forEach((exercise, index) => {
          exercise.id = ids[index];
        });
        return ids;
      });

      setOldContent((oldContent) => {
        setContent(() => {
          const newContent = JSON.parse(JSON.stringify(oldContent));
          newContent.splice(0, 0, ...keypoints);
          return newContent;
        });
        return oldContent;
      });
    });

    socket.on("delete-content-at", (i) => {
      setContent((oldContent) => {
        const newContent = JSON.parse(JSON.stringify(oldContent));
        newContent.splice(parseInt(i), 1);
        return newContent;
      });
    });
  }, []);

  const addEmptyTextAt = (i) => {
    console.log("click");
    socket.emit("add-empty-text", courseId, sectionId, i);
  };

  const setContentAt = (i, content) => {
    socket.emit("set-content-at", courseId, sectionId, i, content);
  };

  const addExerciseAt = (
    i,
    { numberOfExercises, type, difficulty, text, language, numberOfOptions }
  ) => {
    socket.emit("add-exercise-at", courseId, sectionId, i, {
      numberOfExercises,
      type,
      difficulty,
      text,
      language,
      numberOfOptions,
    });
  };

  const addKeypoints = (path) => {
    socket.emit("add-keypoints", courseId, sectionId, path);
  };

  const deleteContentAt = (i) => {
    socket.emit("delete-content-at", courseId, sectionId, i);
  };

  const elaborateMoreAt = (i) => {
    socket.emit("elaborate-more-at", courseId, sectionId, i);
  };

  return {
    content,
    setContentAt,
    addEmptyTextAt,
    addKeypoints,
    elaborateMoreAt,
    addExerciseAt,
    deleteContentAt,
  };
};
