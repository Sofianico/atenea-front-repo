"use client";

import ButtonLink from "@/components/atoms/buttonLink/buttonLink";
import MouseTracker from "@/features/create-course/components/organisms/mouseTracker/mouseTracker";
import NavigatorSections from "@/features/create-course/components/organisms/navigatorSections/navigatorSections";
import { useCreateCoursePath } from "@/features/create-course/hooks/useCreateCoursePath";
import { CourseContext } from "@/features/create-course/stores/CourseContextProvider";
import { useContext } from "react";
import SimpleChat from "@/features/create-course/components/organisms/simpleChat/simpleChat";
import TabPanel from "@/features/create-course/components/organisms/tabPanel/tabPanel";
import DocumentChat from "@/features/create-course/components/organisms/documentChat/documentChat";
import Breadcrumb from "@/features/create-course/components/molecules/breadcrumb/breadcrumb";

import styles from "./styles.module.css";
import ButtonPrimary from "@/components/atoms/buttonPrimary/buttonPrimary";
import ContentCreator from "@/features/create-course/components/organisms/contentCreator/contentCreator";

export default function CourseContent() {
  const { next, prev, visitSection } = useCreateCoursePath();

  const {
    sections,
    openedSections,
    handleAdd,
    handleTitleChange,
    handleDelete,
    toggleSectionOpen,
    path,
  } = useContext(CourseContext);

  const handleSelectSection = (sectionId) => {
    visitSection({ sectionId });
  };

  const handlePrevious = () => {
    prev();
  };

  return (
    <div className="section">
      <div>
        <div className={styles.content}>
          <div className={`${styles.panel} ${styles.leftPanel}`}>
            <TabPanel>
              <div>
                <div>Navigation</div>
                <NavigatorSections
                  sections={sections}
                  path={[]}
                  onAdd={handleAdd}
                  onDelete={handleDelete}
                  onTitleChange={handleTitleChange}
                  isRoot={true}
                  openedSections={openedSections}
                  onToggleCollapse={toggleSectionOpen}
                  onSelectSection={handleSelectSection}
                />
              </div>

              <div>
                <div>YouTube Studio</div>
                <div></div>
              </div>
            </TabPanel>
          </div>

          <div className={styles.header}>
            <div className={styles.titleContainer}>
              <h1>{path[path.length - 1]}</h1>
            </div>

            <div className={styles.breadcrumbContainer}>
              <Breadcrumb path={path} />
            </div>
          </div>

          <ContentCreator />

          <div className={`${styles.panel} ${styles.rightPanel}`}>
            <TabPanel>
              <div>
                <div>Open Chat</div>
                <SimpleChat></SimpleChat>
              </div>

              <div>
                <div>Document Chat</div>
                <DocumentChat></DocumentChat>
              </div>
            </TabPanel>
          </div>
        </div>

        <div className="section-actions">
          <div>
            <ButtonLink onClick={handlePrevious} label="Anterior" />
            <ButtonPrimary onClick={() => {}} label="Siguiente" />
          </div>
        </div>
      </div>

      <MouseTracker page="/course/[courseId]/section/[sectionId]" />
    </div>
  );
}
