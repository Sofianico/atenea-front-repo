import {
  deleteIAChatDocument,
  getIAChatDocument,
  postIAChatDocument,
} from "@/services/ai.chat.service";
import React, { useEffect, useState } from "react";

import styles from "./documentHandler.module.css";
import ButtonPrimary from "@/components/atoms/buttonPrimary/buttonPrimary";

const LoadingStates = {
  SPLITTING_FILES: "SPLITTING FILES",
  LOADING_FILES: "LOADING FILES",
  FINISHED: "FINISHED",
};

export default function DocumentHandler({ setFilesIds }) {
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState(null);

  useEffect(() => {
    setFilesIds(files.map((f) => f.id));
  }, [files]);

  useEffect(() => {
    getIAChatDocument().then(({ files }) => {
      setFiles(files);
    });
  }, []);

  const handleSelectFile = (e, { id }) => {
    setFilesIds((oldFilesIds) => {
      let newFilesIds = JSON.parse(JSON.stringify(oldFilesIds)).filter(
        (i) => i != id
      );
      if (e.target.checked) {
        newFilesIds.push(id);
      }
      console.log(newFilesIds);
      return newFilesIds;
    });
  };

  const handleUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSend = async () => {
    postIAChatDocument({
      file,
      onChunk: ({ process, progress, fileId, fileName }) => {
        setFiles((oldFiles) => {
          let found = false;

          const newFiles = oldFiles.map((file) => {
            if (file.fileId === fileId) {
              found = true;
              return { process, progress, fileId, fileName };
            }
            return file;
          });

          if (!found) {
            newFiles.push({ process, progress, fileId, fileName });
          }

          return newFiles;
        });
      },
    });
  };

  const handleDelete = ({ id }) => {
    deleteIAChatDocument({ fileId: id }).then(({ fileId }) => {
      setFiles((oldFiles) => {
        const newFiles = JSON.parse(JSON.stringify(oldFiles));
        return newFiles.filter((f) => f.id != fileId);
      });
    });
  };

  return (
    <div className={styles.documentHandler}>
      <div className={styles.files}>
        {files.map((f, i) => (
          <div
            key={i}
            className={`${styles.file} ${styles.progressBar}`}
            style={{
              "--progress": `${f.progress}%`,
            }}
          >
            <div className={styles.left}>
              <input type="checkbox" onChange={(e) => handleSelectFile(e, f)} />
              <div className={styles.fileName}>{f.fileName}</div>
            </div>

            <div className={styles.right}>
              {f.progress && (
                <div className={styles.loadingState}>
                  <div className={styles.process}>
                    {LoadingStates[f.process]}
                  </div>
                  <div className={styles.progressNumber}>{f.progress}%</div>
                </div>
              )}

              <div className={styles.actions}>
                <button
                  className={styles.action}
                  onClick={() => {
                    handleDelete(f);
                  }}
                >
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.upload}>
        <input
          className={styles.inputFile}
          type="file"
          onChange={handleUpload}
        />
        <ButtonPrimary label="Load File" onClick={handleSend} />
      </div>
    </div>
  );
}
