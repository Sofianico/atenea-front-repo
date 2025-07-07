import React, { useContext } from "react";
import IconTooltip from "../../molecules/iconTooltip/iconTooltip";
import TreeSections from "../treeSections/treeSections";
import { ModalContext } from "@/stores/ModalContextProvider";
import { CourseContext } from "@/features/create-course/stores/CourseContextProvider";

import styles from "./sectionsInput.module.css";
import { SectionsLengthType } from "@/features/create-course/enum/SectionsLengthType";
import SectionsModal from "../sectionsModal/sectionsModal";

export default function SectionsInput() {
  const { open } = useContext(ModalContext);

  const {
    title,
    description,
    sections,
    openedSections,
    handleSetSections,
    handleAdd,
    handleTitleChange,
    handleDelete,
    toggleSectionOpen,
  } = useContext(CourseContext);

  const handleGenerateSections = ({ sectionsLength }) => {
    open(SectionsModal, {
      title,
      description,
      sectionsLength,
      handleResult: handleSetSections,
    });
  };

  return (
    <div className={styles.sectionsInput}>
      <div className={styles.header}>
        <IconTooltip
          icon="short_text"
          onClick={(e) =>
            handleGenerateSections({
              sectionsLength: SectionsLengthType.AS_NEEDED,
            })
          }
        >
          Generar la secciones necesarias basadas en el <i>título</i> y la{" "}
          <i>descripcion</i>
        </IconTooltip>
        <IconTooltip
          icon="subject"
          onClick={(e) =>
            handleGenerateSections({
              sectionsLength: SectionsLengthType.AS_NEEDED,
            })
          }
        >
          Generar la mayor cantidad de secciones basadas en el <i>título</i> y
          la <i>descripcion</i>
        </IconTooltip>
      </div>
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
  );
}
