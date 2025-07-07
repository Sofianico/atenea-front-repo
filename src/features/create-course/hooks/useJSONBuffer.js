import { JSONbalance } from "@/utils/json";
import { useRef, useState } from "react";

export const useJSONBuffer = () => {
  const buffer = useRef("");

  const init = () => {
    buffer.current = "";
  };

  const append = (chunk) => {
    buffer.current += chunk;

    try {
      const balanced = JSONbalance(buffer.current);
      const parsed = JSON.parse(balanced);
      console.log("parsed", parsed);
      return JSON.parse(JSON.stringify(parsed));
    } catch (e) {
      console.error("err", e);
      console.error("buffer.current", buffer.current);
      console.error("balanced", JSONbalance(buffer.current));
    }
  };

  return { init, append };
};
