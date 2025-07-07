import ButtonCollapse from "../../atoms/buttonCollapse/buttonCollapse";

import styles from "./navigatorCardSection.module.css";
import NavigatorSections from "../../organisms/navigatorSections/navigatorSections";

export default function NavigatorCardSection({
  section,
  isRoot,
  currentPath,
  onAdd,
  onDelete,
  onTitleChange,
  openedSections,
  onToggleCollapse,
  onSelectSection,
}) {
  const isOpen = openedSections.includes(section.id);
  const isLeaf = !section.sections || section.sections.length === 0;

  return (
    <div
      className={
        styles.cardSection + (isRoot ? ` ${styles.rootCardSection}` : "")
      }
    >
      <div>
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
            className={`${styles.inputContainer} ${
              isLeaf ? styles.inputLeafContainer : ""
            } ${isOpen ? styles.inputOpenContainer : ""}`}
          >
            {!isLeaf && (
              <button
                className={
                  styles.sectionTitle +
                  (isRoot ? ` ${styles.rootSectionTitle}` : "")
                }
                onClick={() => onToggleCollapse(section.id)}
              >
                {section.title}
              </button>
            )}
            {isLeaf && (
              <>
                <button
                  className={styles.sectionTitle}
                  onClick={() => onSelectSection(section.id)}
                >
                  {section.title}
                </button>
              </>
            )}
          </div>
        </div>
        {isOpen && (
          <div key={section.id}>
            {section.sections && (
              <div>
                <NavigatorSections
                  sections={section.sections}
                  path={currentPath}
                  onAdd={onAdd}
                  onDelete={onDelete}
                  onTitleChange={onTitleChange}
                  openedSections={openedSections}
                  onToggleCollapse={onToggleCollapse}
                  onSelectSection={onSelectSection}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
