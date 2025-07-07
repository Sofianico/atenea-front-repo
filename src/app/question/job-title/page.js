"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { useQuestionsPath } from "@/features/question/hooks/useQuestionsPath";

import { useJobTitle } from "@/features/question/hooks/useJobTitle";

import Image from "next/image";
import AutocompleteOptions from "@/features/question/components/organisms/autocompleteOptions/autocompleteOptions";
import ButtonLink from "@/components/atoms/buttonLink/buttonLink";
import ButtonPrimary from "@/components/atoms/buttonPrimary/buttonPrimary";

export default function JobTitleQuestion() {
  const { t } = useTranslation();

  const { next, prev } = useQuestionsPath();

  const {
    options,
    answer,
    value,
    setAnswer,
    contains,
    setContains,
    inSearching,
    save,
  } = useJobTitle();

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

        <h1>{t("almost_done")}</h1>

        <div className="section-text">
          <p>{t("what_area_are_you_currently_working_in")}</p>
        </div>

        <div className="section-content">
          <AutocompleteOptions
            placeholder={t("find_your_current_job")}
            value={value}
            options={options}
            inSearching={inSearching}
            onChange={setContains}
            onSelect={setAnswer}
            createLabel={t("create_option")}
          />
        </div>

        <div className="section-actions">
          <div>
            <ButtonLink onClick={handlePrevious} label={t("previous")} />
            <ButtonPrimary onClick={handleNext} label={t("next")} />
          </div>
        </div>
      </div>
    </div>
  );
}
