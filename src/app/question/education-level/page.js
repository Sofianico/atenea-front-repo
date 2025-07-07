"use client";

import { useEducationLevel } from "@/features/question/hooks/useEducationLevel";
import { useTranslation } from "@/hooks/useTranslation";
import { useQuestionsPath } from "@/features/question/hooks/useQuestionsPath";

import Image from "next/image";

import OptionsRadio from "@/features/question/components/organisms/optionsRadio/optionsRadio";
import ButtonLink from "@/components/atoms/buttonLink/buttonLink";
import ButtonPrimary from "@/components/atoms/buttonPrimary/buttonPrimary";

export default function EducationLevelQuestion() {
  const { t } = useTranslation();
  const { next, prev } = useQuestionsPath();
  const { options, answer, setAnswer, save } = useEducationLevel();

  const handleNext = () => {
    save()
      .then(() => {
        next();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handlePrevious = () => {
    prev();
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

        <h1>{t("last_question")}</h1>

        <div className="section-text">
          <p>{t("what_is_your_highest_level_of_education")}</p>
        </div>

        <div className="section-content">
          <OptionsRadio
            name="educationLevel"
            options={options}
            selected={answer}
            onSelect={setAnswer}
          />
        </div>

        <div className="section-actions">
          <div>
            <ButtonLink onClick={handlePrevious} label={t("previous")} />
            <ButtonPrimary onClick={handleNext} label={t("finish")} />
          </div>
        </div>
      </div>
    </div>
  );
}
