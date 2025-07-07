import { useEffect, useState } from "react";
import {
  addSection,
  changeTitleSections,
  deleteSection,
  getByPath,
} from "@/utils/sections";
import { getAICourseSectionId } from "@/services/ai.course.service";

let i = 0;

export const useSections = () => {
  const [sections, setSections] = useState([]);
  const [openedSections, setOpenedSections] = useState([]);
  const [firstLeaf, setFirstLeaf] = useState();

  useEffect(() => {
    let aux = sections;
    while (aux && (aux.length > 0 || aux.sections)) {
      if (aux.length > 0) {
        aux = aux[0];
      }
      if (aux.sections) {
        aux = aux.sections;
      }
    }
    setFirstLeaf(aux);
  }, [sections]);

  const handleAdd = (path) => {
    const parent = getByPath(sections, path.slice(0, -1));
    const index = path[path.length - 1];
    if (parent && index !== undefined) setSectionOpen(parent[index].id, true);

    getAICourseSectionId((id) => {
      setSections((oldSections) => {
        return addSection(oldSections, path, id);
      });
    });
  };

  const handleTitleChange = (path, newTitle) => {
    setSections((oldSections) => {
      return changeTitleSections(oldSections, path, newTitle);
    });
  };

  const handleDelete = (path) => {
    const parentPath = path.slice(0, -1);
    const parent = getByPath(sections, parentPath);
    if (parent.length === 1) {
      const grandParent = getByPath(sections, parentPath.slice(0, -1));
      const parentIndex = parentPath[parentPath.length - 1];
      if (parentIndex !== undefined) {
        setSectionOpen(grandParent[parentIndex].id, false);
      }
    }
    setSections((oldSections) => {
      return deleteSection(oldSections, path);
    });
  };

  const toggleSectionOpen = (id) => {
    setOpenedSections((prev) => {
      return prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
    });
  };

  const setSectionOpen = (id, value) => {
    setOpenedSections((prev) => {
      return !value ? prev.filter((x) => x !== id) : [...prev, id];
    });
  };

  return {
    sections,
    setSections,
    firstLeaf,
    openedSections,
    handleAdd,
    handleTitleChange,
    handleDelete,
    toggleSectionOpen,
  };
};
