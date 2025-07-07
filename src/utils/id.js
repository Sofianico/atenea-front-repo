const buildIdMapByIndexIterative = (structure, map) => {
  const stack = [{ nodeList: structure, path: "" }];

  while (stack.length > 0) {
    const { nodeList, path } = stack.pop();

    nodeList.forEach((section, index) => {
      const fullPath = `${path}/${index}`;
      if (section.id) {
        map.set(fullPath, section.id);
      }
      if (section.sections) {
        stack.push({ nodeList: section.sections, path: fullPath });
      }
    });
  }
};

const assignIdsByIndexIterative = async (
  structure,
  previousMap,
  generateId
) => {
  const rootClone = [];

  const stack = [
    {
      originalList: structure,
      targetList: rootClone,
      path: "",
    },
  ];

  while (stack.length > 0) {
    const { originalList, targetList, path } = stack.pop();

    for (let index = 0; index < originalList.length; index++) {
      const section = originalList[index];
      const fullPath = `${path}/${index}`;
      const id = previousMap.has(fullPath)
        ? previousMap.get(fullPath)
        : await generateId();

      const clonedSection = { ...section, id };
      targetList[index] = clonedSection;

      if (section.sections) {
        clonedSection.sections = new Array(section.sections.length);
        stack.push({
          originalList: section.sections,
          targetList: clonedSection.sections,
          path: fullPath,
        });
      }
    }
  }
  return rootClone;
};

export const updateStructureWithIdsByIndex = async (
  newStructure,
  previousStructure,
  generateId
) => {
  const previousMap = new Map();
  buildIdMapByIndexIterative(previousStructure, previousMap);
  return await assignIdsByIndexIterative(newStructure, previousMap, generateId);
};
