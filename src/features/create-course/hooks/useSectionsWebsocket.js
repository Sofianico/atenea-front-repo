import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { socket } from "@/utils/websocket";

export const useSectionsWebsocket = () => {
  const params = useParams();
  const { courseId, sectionId } = params;

  const [sections, setSections] = useState();
  const [openedSections, setOpenedSections] = useState([]);

  const [firstLeaf, setFirstLeaf] = useState();
  const [path, setPath] = useState([]);

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

  useEffect(() => {
    if (sections && sectionId) {
      setPath(findPathById(sections, sectionId));
    }
  }, [sections, sectionId]);

  useEffect(() => {
    socket.emit("join-sections", courseId);

    socket.on("set-sections", (sections) => {
      setSections(sections);
    });

    socket.on("add-section", (path, id) => {
      setSections((oldSections) => {
        return addSection(oldSections, path, id);
      });
    });

    socket.on("change-title-section", (path, newTitle) => {
      setSections((oldSections) => {
        return changeTitleSections(oldSections, path, newTitle);
      });
    });

    socket.on("delete-section", (path) => {
      setSections((oldSections) => {
        return deleteSection(oldSections, path);
      });
    });
  }, [courseId]);

  const handleAdd = (path) => {
    const parent = getByPath(sections, path.slice(0, -1));
    const index = path[path.length - 1];
    if (parent && index !== undefined) setSectionOpen(parent[index].id, true);
    socket.emit("add-section", courseId, path);
  };

  const handleTitleChange = (path, newTitle) => {
    socket.emit("change-title-section", courseId, path, newTitle);
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

    socket.emit("delete-section", courseId, path);
  };

  const handleSetSections = (sections) => {
    socket.emit("set-sections", courseId, sections);
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
    firstLeaf,
    path,
    openedSections,
    handleSetSections,
    handleAdd,
    handleTitleChange,
    handleDelete,
    toggleSectionOpen,
  };
};

const findPathById = (data, targetId) => {
  const stack = data.map((section) => ({
    node: section,
    path: [section.title],
  }));

  while (stack.length > 0) {
    const { node, path } = stack.pop();

    if (node.id === targetId) {
      return path;
    }

    if (node.sections && Array.isArray(node.sections)) {
      for (let i = node.sections.length - 1; i >= 0; i--) {
        stack.push({
          node: node.sections[i],
          path: [...path, node.sections[i].title],
        });
      }
    }
  }

  return null;
};

const getByPath = (arr, path) => {
  return path.reduce((acc, i) => acc[i]?.sections || [], arr);
};

const addSection = (oldSections, path, id) => {
  const newSection = {
    id,
    title: "Nueva Sección",
  };
  const newSections = JSON.parse(JSON.stringify(oldSections));
  if (path.length === 0) {
    newSections.push(newSection);
    return newSections;
  }
  const parent = getByPath(newSections, path.slice(0, -1));
  const index = path[path.length - 1];
  parent[index].sections = parent[index].sections || [];
  parent[index].sections.push(newSection);
  return newSections;
};

const deleteSection = (oldSections, path) => {
  const newSections = JSON.parse(JSON.stringify(oldSections));
  if (path.length === 0) {
    newSections.splice(path[0], 1);
    return newSections;
  }
  const parentPath = path.slice(0, -1);
  const parent = getByPath(newSections, parentPath);
  parent.splice(path[path.length - 1], 1);
  let parentId;
  if (parent.length === 0) {
    const grandParent = getByPath(newSections, parentPath.slice(0, -1));
    const parentIndex = parentPath[parentPath.length - 1];
    if (parentIndex !== undefined) {
      parentId = grandParent[parentIndex].id;
      delete grandParent[parentIndex].sections;
    }
  }
  return newSections;
};

const changeTitleSections = (oldSections, path, newTitle) => {
  const newSections = JSON.parse(JSON.stringify(oldSections));
  let node = newSections;
  for (let i = 0; i < path.length - 1; i++) {
    node = node[path[i]].sections;
  }
  node[path[path.length - 1]].title = newTitle;
  return newSections;
};
