import { countWords } from "@/utils/words";
import { useState } from "react";

export const useTitle = () => {
  const [title, setTitle] = useState("");
  const titleWordsCount = countWords(title);
  const titleWordsMax = 10;

  return { title, setTitle, titleWordsCount, titleWordsMax };
};
