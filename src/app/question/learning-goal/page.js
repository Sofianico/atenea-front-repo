"use client";

import { useContext } from "react";

import { UserContext } from "@/stores/UserContextProvider";
import { useTranslation } from "@/hooks/useTranslation";
import { useQuestionsPath } from "@/features/question/hooks/useQuestionsPath";
import { useLearningGoal } from "@/features/question/hooks/useLearningGoal";

import Image from "next/image";
import OptionsImgLabel from "@/features/question/components/organisms/optionsImgLabel/optionsImgLabel";
import ButtonPrimary from "@/components/atoms/buttonPrimary/buttonPrimary";

export default function LearningGoalQuestion() {
  const { firstName } = useContext(UserContext);
  const { t } = useTranslation();

  const { next } = useQuestionsPath();

  const { options, answer, setAnswer, save } = useLearningGoal();

  const handleNext = () => {
    save()
      .then(() => {
        next();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="section">
      <div>
        <Image
          src="/brand/Owl.svg"
          width="200"
          height="256"
          alt="Owl"
          priority
        />

        <h1>{t("greeting", firstName)} </h1>

        <div className="section-text">
          <p>
            {t(
              "tell_us_a_little_about_yourself_so_we_can_give_you_the_best_suggestions"
            )}
          </p>
          <p>{t("what_is_your_main_objective")}</p>
        </div>

        <div className="section-content">
          <OptionsImgLabel
            name="goals"
            options={options}
            selected={answer}
            onSelect={setAnswer}
          />
        </div>

        <div className="section-actions">
          <div>
            <div></div>
            <ButtonPrimary onClick={handleNext} label={t("next")} />
          </div>
        </div>
      </div>
    </div>
  );
}
