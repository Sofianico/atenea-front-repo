import styles from "./navigatorSections.module.css";
import NavigatorCardSection from "../../molecules/navigatorCardSection/navigatorCardSection";

export default function NavigatorSections({
  sections,
  path,
  onAdd,
  onDelete,
  onTitleChange,
  isRoot = false,
  openedSections,
  onToggleCollapse,
  onSelectSection,
}) {
  return (
    <div className={styles.treeSectionCard}>
      {sections && sections.length > 0 && (
        <div className={styles.sectionsContainer}>
          {sections.map((section, index) => (
            <div key={section.id}>
              <NavigatorCardSection
                section={section}
                isRoot={isRoot}
                currentPath={[...path, index]}
                onAdd={onAdd}
                onDelete={onDelete}
                onTitleChange={onTitleChange}
                openedSections={openedSections}
                onToggleCollapse={onToggleCollapse}
                onSelectSection={onSelectSection}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
