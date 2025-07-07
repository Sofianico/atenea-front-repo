export const normalizePath = (path) => {
  return path
    .replace(/\/course\/[^/]+/, "/course/[courseId]")
    .replace(/\/section\/[^/]+/, "/section/[sectionId]");
};

export const denormalizePath = (path, courseId, sectionId) => {
  return path.replace("[courseId]", courseId).replace("[sectionId]", sectionId);
};
