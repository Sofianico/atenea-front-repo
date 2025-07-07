import { usePathname, useRouter } from "next/navigation";

export const useQuestionsPath = () => {
  const pathname = usePathname();
  const router = useRouter();

  const nextPath = {
    "": "/question/learning-goal",
    "/question/learning-goal": "/question/role-select",
    "/question/role-select": "/question/job-title",
    "/question/job-title": "/question/education-level",
    "/question/education-level": "/",
  };

  const start = () => {
    router.push(nextPath[""]);
  };

  const next = () => {
    router.push(nextPath[pathname]);
  };

  const prev = () => {
    router.push(
      Object.keys(nextPath).find((key) => nextPath[key] === pathname)
    );
  };

  return { start, next, prev };
};
