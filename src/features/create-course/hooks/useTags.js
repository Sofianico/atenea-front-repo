import { getTags } from "@/services/course.service";
import { useEffect, useState } from "react";

export const useTags = () => {
  const [options, setOptions] = useState([]);
  const [tags, setTags] = useState([]);

  const [contains, setContains] = useState("");

  const inSearching = !tags.label && contains;

  useEffect(() => {
    if (!contains) {
      setOptions([]);
      return;
    }
    getTags({ contains }).then(({ options }) => {
      if (!options) return;
      const answerIds = tags.map((a) => a.id);
      setOptions(options.filter((o) => !answerIds.includes(o.id)));
    });
  }, [contains]);

  const toggleTag = (o) => {
    setTags((oldTags) => {
      let newTags = JSON.parse(JSON.stringify(oldTags));

      if (!newTags) {
        newTags = [];
      }

      if (newTags.filter((t) => t.id === o.id).length > 0) {
        newTags = newTags.filter((t) => t.id !== o.id);
      } else {
        newTags.push(o);
      }

      newTags = newTags.sort((a, b) => b.label.length - a.label.length);

      return newTags;
    });
    setContains("");
  };

  return {
    tags,
    setTags,
    options,
    toggleTag,
    contains,
    setContains,
    inSearching,
  };
};
