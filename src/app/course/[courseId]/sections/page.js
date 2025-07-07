"use client";

import ButtonLink from "@/components/atoms/buttonLink/buttonLink";
import ButtonPrimary from "@/components/atoms/buttonPrimary/buttonPrimary";
import MouseTracker from "@/features/create-course/components/organisms/mouseTracker/mouseTracker";
import SectionsInput from "@/features/create-course/components/organisms/sectionsInput/sectionsInput";
import { useCreateCoursePath } from "@/features/create-course/hooks/useCreateCoursePath";
import { CourseContext } from "@/features/create-course/stores/CourseContextProvider";
import { useContext } from "react";

export default function CourseSections() {
  const { next, prev } = useCreateCoursePath();

  const {
    firstLeaf,
  } = useContext(CourseContext);

  const handleNext = () => {
    next({ sectionId: firstLeaf.id });
  };

  const handlePrevious = () => {
    prev();
  };

  return (
    <div className="section">
      <div>
        <h1>Diseña la ruta de aprendizaje</h1>

        <div className="section-text">
          <p>Planifica cómo tus estudiantes recorrerán el contenido</p>
        </div>

        <div className="section-content">
          <SectionsInput />
        </div>

        <div className="section-actions">
          <div>
            <ButtonLink onClick={handlePrevious} label="Anterior" />
            <ButtonPrimary onClick={handleNext} label="Siguiente" />
          </div>
        </div>

        <MouseTracker page="/course/[courseId]/sections" />
      </div>
    </div>
  );
}
