"use client";

import { useContext, useEffect } from "react";

import { useRouter } from "next/navigation";

import { UserContext } from "@/stores/UserContextProvider";

import { getAnswers } from "@/services/answers.service";

import Tabs from "@/components/organisms/tabs/tabs";

import { useHomeTabs } from "@/hooks/useHomeTabs";
import { useQuestionsPath } from "@/features/question/hooks/useQuestionsPath";

export default function Home() {
  const router = useRouter();

  const { user } = useContext(UserContext);

  const { start } = useQuestionsPath();

  useEffect(() => {
    if (!user) return;

    getAnswers().then(({ answers }) => {
      if (answers) {
        const { goalOptionId, jobOptionId, roleOptions, educationOptionId } =
          answers;

        if (
          goalOptionId &&
          jobOptionId &&
          roleOptions &&
          roleOptions.length > 0 &&
          educationOptionId
        ) {
          return;
        }
      }

      start();
    });
  }, [router, user]);

  return (
    <div>
      <Tabs useTabs={useHomeTabs}></Tabs>
    </div>
  );
}
