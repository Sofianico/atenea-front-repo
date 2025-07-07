"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { useQuestionsPath } from "@/features/question/hooks/useQuestionsPath";
import { useRoleSelect } from "@/features/question/hooks/useRoleSelect";

import Image from "next/image";
import SelectorLabelCard from "@/features/question/components/organisms/selectorLabelCard/selectorLabelCard";
import ButtonLink from "@/components/atoms/buttonLink/buttonLink";
import ButtonPrimary from "@/components/atoms/buttonPrimary/buttonPrimary";

export default function RoleSelectQuestion() {
  const { t } = useTranslation();

  const { next, prev } = useQuestionsPath();

  const { options, answer, toggleRole, nextPage, setContains, save } =
    useRoleSelect();

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

        <h1>{t("next_question")}</h1>

        <div className="section-text">
          <p>{t("what_roles_are_you_interested_in")}</p>
        </div>

        <div className="section-content">
          <SelectorLabelCard
            placeholder={t("find_your_role")}
            options={options}
            selecteds={answer}
            onSelect={toggleRole}
            onFilter={setContains}
            onMoreOption={nextPage}
            createLabel={t("create_role")}
            moreLabel={t("see_more")}
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
