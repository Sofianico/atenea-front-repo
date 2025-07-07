import { useCreateCoursePath } from "@/features/create-course/hooks/useCreateCoursePath";

import styles from "./sectionCreatedByMy.module.css";
import { useEffect, useState } from "react";
import { getCourses } from "@/services/courses.service";
import CourseCard from "@/features/view-course/components/molecules/courseCard/courseCard";
import { delCourse } from "@/services/course.service";
import ButtonIcon from "@/features/create-course/components/atoms/buttonIcon/buttonIcon";

export default function SectionCreatedByMy() {
  const { start } = useCreateCoursePath();

  const [courses, setCourses] = useState([]);

  const navigateToCreateCourse = () => {
    start();
  };

  const navigateToEditCourse = ({ courseId }) => {
    start(courseId);
  };

  const deleteCourse = ({ courseId }) => {
    delCourse({ courseId }).then(({ courseId }) => {
      setCourses((oldCourses) => {
        const newCourses = JSON.parse(JSON.stringify(oldCourses));
        return newCourses.filter((c) => c.id != courseId);
      });
    });
  };

  useEffect(() => {
    getCourses({ mine: true }).then(({ courses }) => {
      setCourses(courses);
    });
  }, []);

  return (
    <div className={styles.sectionCreatedByMy}>
      <div className={styles.thirds}>
        <div></div>

        <div></div>

        <button className={styles.newCourse} onClick={navigateToCreateCourse}>
          <div>
            <div className={styles.title}>Crea tu curso con ayuda de la IA</div>
            <div className={styles.description}>
              Nuestra inteligencia artificial te guiará paso a paso para
              construir un curso completo, atractivo y personalizado.
            </div>
          </div>
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "1rem",
        }}
      >
        {courses.map((c) => (
          <div key={c.id}>
            <div className={styles.courseActions}>
              <ButtonIcon
                icon="delete"
                onClick={() => deleteCourse({ courseId: c.id })}
              />
            </div>

            <CourseCard
              tags={c.tags}
              title={c.title}
              description={c.description}
              onClick={() => navigateToEditCourse({ courseId: c.id })}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
