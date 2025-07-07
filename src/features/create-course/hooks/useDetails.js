import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { getCourseDetails, postCourseDetails } from "@/services/course.service";

import { useTags } from "./useTags";
import { useDescription } from "./useDescription";
import { useTitle } from "./useTitle";

export const useDetails = () => {
  const params = useParams();
  const { courseId } = params;

  const { title, setTitle, titleWordsCount, titleWordsMax } = useTitle();

  const {
    description,
    setDescription,
    descriptionWordsCount,
    descriptionWordsMax,
  } = useDescription();

  const { tags, setTags, options, toggleTag, contains, setContains, inSearching } =
    useTags();

  useEffect(() => {
    getCourseDetails({ courseId }).then(({ title, description, tags }) => {
      if (title) setTitle(title);
      if (description) setDescription(description);
      if (tags) setTags(tags)
    });
  }, [courseId]);

  const save = () => {
    return postCourseDetails({
      courseId,
      title,
      description,
      tagsIds: tags?.map((a) => a.id),
    });
  };

  return {
    title,
    description,
    setTitle,
    setDescription,
    titleWordsCount,
    descriptionWordsCount,
    titleWordsMax,
    descriptionWordsMax,
    options,
    tags,
    toggleTag,
    contains,
    setContains,
    inSearching,
    save,
  };
};
