import React, { useContext, useEffect, useRef, useState } from "react";
import {
  getAICourseSectionId,
  postIACourseSections,
} from "@/services/ai.course.service";
import TreeSections from "../treeSections/treeSections";
import { useSections } from "@/features/create-course/hooks/useSections";

import styles from "./sectionsModal.module.css";
import ButtonLink from "@/components/atoms/buttonLink/buttonLink";
import ButtonPrimary from "@/components/atoms/buttonPrimary/buttonPrimary";
import { ModalContext } from "@/stores/ModalContextProvider";
import { updateStructureWithIdsByIndex } from "@/utils/id";

export default function SectionsModal({
  title,
  description,
  sectionsLength,
  handleResult,
}) {
  const {
    sections,
    setSections,
    openedSections,
    handleAdd,
    handleTitleChange,
    handleDelete,
    toggleSectionOpen,
  } = useSections();

  const { close } = useContext(ModalContext);

  const sectionsRef = useRef(sections);

  useEffect(() => {
    sectionsRef.current = sections;
  }, [sections]);

  useEffect(() => {
    postIACourseSections({
      title,
      onChunk: async (newSections) => {
        const updatedStructure = await updateStructureWithIdsByIndex(
          newSections,
          sectionsRef.current,
          getAICourseSectionId
        );
        setSections(updatedStructure);
      },
    });
  }, []);

  const handlePrevious = () => {
    close();
  };

  const handleNext = () => {
    handleResult(sections);
    close();
  };

  return (
    <div className={styles.sectionsModal}>
      <div>
        <div className={styles.header}>
          <div className={styles.title}>{title}</div>
        </div>

        <div className={styles.content}>
          <TreeSections
            sections={sections}
            path={[]}
            onAdd={handleAdd}
            onDelete={handleDelete}
            onTitleChange={handleTitleChange}
            isRoot={true}
            openedSections={openedSections}
            onToggleCollapse={toggleSectionOpen}
          />
        </div>

        <div className={styles.footer}>
          <div>
            <ButtonLink onClick={handlePrevious} label="Cancelar" />
            <ButtonPrimary onClick={handleNext} label="Aceptar" />
          </div>
        </div>
      </div>
    </div>
  );
}
