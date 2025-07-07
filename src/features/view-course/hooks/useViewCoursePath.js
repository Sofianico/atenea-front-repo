"use client";
import { useParams, usePathname, useRouter } from "next/navigation";
import { denormalizePath, normalizePath } from "@/utils/path";

export const useViewCoursePath = () => {
  const pathname = usePathname();
  const router = useRouter();

  const params = useParams();
  const { courseId, sectionId } = params;

  const nextPath = {
    "": "/course/[courseId]",
  };

  const start = (courseId) => {

    router.push(denormalizePath(nextPath[""], courseId));
    
  };

  const next = () => {};

  return { start };
};
