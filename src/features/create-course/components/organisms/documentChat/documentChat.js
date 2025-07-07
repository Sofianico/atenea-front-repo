import { postChatDocuments, postIAChat } from "@/services/ai.chat.service";
import React, { useContext, useEffect, useState } from "react";

import styles from "./documentChat.module.css";
import { ModalContext } from "@/stores/ModalContextProvider";
import DocumentModal from "../documentHandler/documentHandler";

import { getIAChatDocument } from "@/services/ai.chat.service";
import ReferencesModal from "../referencesModal/referencesModal";

const CHAT_ROLE = {
  user: "user",
  assistant: "assistant",
};

export default function DocumentChat() {
  const { open } = useContext(ModalContext);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [filesIds, setFilesIds] = useState([]);

  useEffect(() => {
    console.log("filesIds", filesIds);
  }, [filesIds]);

  useEffect(() => {
    getIAChatDocument().then(({ files }) => {
      setFilesIds(files.map((f) => f.id));
    });
  }, []);

  const handleFile = () => {
    open(DocumentModal, { setFilesIds });
  };

  const handleReferences = (message) => {
    open(ReferencesModal, { message });
  };

  const handleChat = () => {
    if (!message) return;

    setMessages((oldMessages) => {
      const messages = JSON.parse(JSON.stringify(oldMessages));
      messages.push({ content: message, role: CHAT_ROLE.user });
      messages.push({ content: "", role: CHAT_ROLE.assistant });
      return messages;
    });

    setMessage((message) => {
      postChatDocuments({
        filesIds,
        message,
        onChunk: (chunk) => {
          const { done } = chunk;
          setMessages((oldMessages) => {
            const messages = JSON.parse(JSON.stringify(oldMessages));
            if (!done) {
              const { answer } = chunk;
              messages[messages.length - 1].content += answer;
            } else {
              const { refs } = chunk;
              messages[messages.length - 1].refs = refs;
            }
            return messages;
          });
        },
      });
      return "";
    });
  };

  return (
    <div className={styles.documentChat}>
      <div className={styles.chatHeader}>
        <button onClick={handleFile} className={styles.chatButton}>
          <span className="material-symbols-outlined">description</span>
        </button>
      </div>

      <div className={styles.messages}>
        {messages.map((m, i) => (
          <div
            key={i}
            className={
              styles.messageContainer +
              (m.role === CHAT_ROLE.user
                ? ` ${styles.userMessageContainer}`
                : "")
            }
          >
            <div
              className={
                styles.message +
                (m.role === CHAT_ROLE.user ? ` ${styles.userMessage}` : "") +
                (m.role === CHAT_ROLE.assistant ? ` ${styles.assistantMessage}` : "")
              }
            >
              {m.content}
            </div>

            {m.role === CHAT_ROLE.assistant && (
              <div className={styles.messageActions}>
                <button
                  className={styles.refButton}
                  onClick={() => handleReferences(m)}
                >
                  References
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className={styles.chatFooter}>
        <input
          className={styles.input}
          placeholder="Enter a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <div className={styles.actions}>
          <button onClick={handleChat} className={styles.chatButton}>
            <span className="material-symbols-outlined">send</span>
          </button>
        </div>
      </div>
    </div>
  );
}
