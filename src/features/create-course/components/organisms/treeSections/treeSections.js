import { motion, AnimatePresence } from "framer-motion";
import CardSection from "../../molecules/cardSection/cardSection";

import styles from "./treeSections.module.css";
import ButtonIcon from "../../atoms/buttonIcon/buttonIcon";

export default function TreeSections({
  sections,
  path,
  onAdd,
  onDelete,
  onTitleChange,
  isRoot = false,
  openedSections,
  onToggleCollapse,
}) {
  return (
    <div className={styles.treeSectionCard}>
      {sections && sections.length > 0 && (
        <div className={styles.sectionsContainer}>
          <AnimatePresence>
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                style={{ overflow: "hidden" }}
              >
                <CardSection
                  section={section}
                  currentPath={[...path, index]}
                  onAdd={onAdd}
                  onDelete={onDelete}
                  onTitleChange={onTitleChange}
                  openedSections={openedSections}
                  onToggleCollapse={onToggleCollapse}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {isRoot && (
        <div className={`${styles.addSectionRootContainer}`}>
          <ButtonIcon
            onClick={() => onAdd([])}
            icon="add"
            label="Agregar Sección Principal"
          />
        </div>
      )}
    </div>
  );
}
