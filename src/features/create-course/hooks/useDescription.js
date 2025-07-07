import { countWords } from "@/utils/words";
import { useState } from "react";

export const useDescription = () => {
  const [description, setDescription] = useState("");
  const descriptionWordsCount = countWords(description);
  const descriptionWordsMax = 220;

  return {description, setDescription, descriptionWordsCount, descriptionWordsMax}
};
