import { usePathname, useRouter } from "next/navigation";
import { useParams } from "next/navigation";

import { postCourse } from "@/services/course.service";
import { denormalizePath, normalizePath } from "@/utils/path";

export const useCreateCoursePath = () => {
  const pathname = usePathname();
  const router = useRouter();

  const params = useParams();
  const { courseId } = params;

  const nextPath = {
    "": "/course/[courseId]/details",
    "/course/[courseId]/details": "/course/[courseId]/tags",
    "/course/[courseId]/tags": "/course/[courseId]/sections",
    "/course/[courseId]/sections": "/course/[courseId]/section/[sectionId]",
    "/course/[courseId]/section/[sectionId]": "",
  };

  const start = (courseId) => {
    if (!courseId) {
      postCourse()
        .then(({ id: courseId }) => {
          router.push(denormalizePath(nextPath[""], courseId));
        })
        .catch();
    } else {
      router.push(denormalizePath(nextPath[""], courseId));
    }
  };

  const next = ({ sectionId } = {}) => {
    router.push(
      denormalizePath(nextPath[normalizePath(pathname)], courseId, sectionId)
    );
  };

  const visitSection = ({ sectionId }) => {
    router.push(`/course/${courseId}/section/${sectionId}`);
  };

  const prev = () => {
    const previousKey = Object.keys(nextPath).find(
      (key) => nextPath[key] === normalizePath(pathname)
    );

    const prevRoute =
      previousKey === "" ? "/" : denormalizePath(previousKey, courseId);

    router.push(prevRoute);
  };

  return { start, next, prev, visitSection };
};
