import { postIAChat } from "@/services/ai.chat.service";
import React, { useEffect, useState } from "react";

import styles from "./simpleChat.module.css";

const CHAT_ROLE = {
  user: "user",
  assistant: "assistant",
};

export default function SimpleChat() {
  const [conversationId] = useState();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const handleChat = () => {
    if (!message) return;
    setMessages((oldMessages) => {
      const messages = JSON.parse(JSON.stringify(oldMessages));
      messages.push({ content: message, role: CHAT_ROLE.user });
      messages.push({ content: "", role: CHAT_ROLE.assistant });
      return messages;
    });

    setMessage((message) => {
      postIAChat({
        conversationId,
        message,
        onChunk: ({ answer }) => {
          setMessages((oldMessages) => {
            const messages = JSON.parse(JSON.stringify(oldMessages));
            messages[messages.length - 1].content += answer;
            return messages;
          });
        },
      });
      return "";
    });
  };

  return (
    <div className={styles.simpleChat}>

      <div className={styles.messages}>
        {messages.map((m, i) => (
          <div
            key={i}
            className={
              styles.message +
              (m.role === CHAT_ROLE.user ? ` ${styles.userMessage}` : "")
            }
          >
            {m.content}
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
