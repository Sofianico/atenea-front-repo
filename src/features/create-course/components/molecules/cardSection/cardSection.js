import { AnimatePresence, motion } from "framer-motion";
import ButtonCollapse from "../../atoms/buttonCollapse/buttonCollapse";
import TreeSectionCard from "../../organisms/treeSections/treeSections";

import styles from "./cardSection.module.css";
import ButtonIcon from "../../atoms/buttonIcon/buttonIcon";

export default function CardSection({
  section,
  currentPath,
  onAdd,
  onDelete,
  onTitleChange,
  openedSections,
  onToggleCollapse,
}) {
  const isOpen = openedSections.includes(section.id);
  const isLeaf = !section.sections || section.sections.length === 0;

  return (
    <div className={styles.cardSection}>
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className={styles.cardBody}>
          {!isLeaf && (
            <div>
              <ButtonCollapse
                active={isOpen}
                onClick={() => onToggleCollapse(section.id)}
              />
            </div>
          )}
          <div
            className={`${styles.inputContainer} ${isLeaf ? styles.inputLeafContainer : ""} ${isOpen ? styles.inputOpenContainer : ""}`}
          >
            <input
              className={styles.input}
              type="text"
              value={section.title}
              onChange={(e) => onTitleChange(currentPath, e.target.value)}
            />
          </div>

          {isLeaf && (
            <div>
              <ButtonIcon
                icon="add"
                onClick={() => {
                  onAdd(currentPath);
                }}
              ></ButtonIcon>
            </div>
          )}

          {isLeaf && (
            <div>
              <ButtonIcon
                icon="delete"
                onClick={() => onDelete(currentPath)}
              ></ButtonIcon>
            </div>
          )}
        </div>
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key={section.id}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              style={{ overflow: "hidden" }}
            >
              <AnimatePresence initial={false}>
                {section.sections && (
                  <div>
                    <TreeSectionCard
                      sections={section.sections}
                      path={currentPath}
                      onAdd={onAdd}
                      onDelete={onDelete}
                      onTitleChange={onTitleChange}
                      openedSections={openedSections}
                      onToggleCollapse={onToggleCollapse}
                    />
                    {!isLeaf && (
                      <div className={styles.addSectionContainer}>
                        <ButtonIcon
                          icon="add"
                          label="Agregar otra sección"
                          onClick={() => onAdd(currentPath)}
                        />
                      </div>
                    )}
                  </div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
