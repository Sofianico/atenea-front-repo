"use client";

import { useContext } from "react";

import { CourseContext } from "@/features/create-course/stores/CourseContextProvider";

import { useCreateCoursePath } from "@/features/create-course/hooks/useCreateCoursePath";

import Image from "next/image";
import TitleInput from "@/features/create-course/components/organisms/titleInput/titleInput";
import DescriptionInput from "@/features/create-course/components/organisms/descriptionInput/descriptionInput";
import ButtonPrimary from "@/components/atoms/buttonPrimary/buttonPrimary";
import ButtonLink from "@/components/atoms/buttonLink/buttonLink";

export default function CourseDetails() {
  const { save } = useContext(CourseContext);

  const { next, prev } = useCreateCoursePath();

  const handlePrevious = () => {
    prev();
  };

  const handleNext = () => {
    save().then(() => {
      next();
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

        <h1>Da vida a tu curso</h1>

        <div className="section-text">
          <p>Esta información será la carta de presentación de tu curso</p>
        </div>

        <div className="section-content">
          <TitleInput />

          <DescriptionInput />
        </div>

        <div className="section-actions">
          <div>
            <ButtonLink onClick={handlePrevious} label="<- Home" />
            <ButtonPrimary onClick={handleNext} label="Siguiente" />
          </div>
        </div>
      </div>
    </div>
  );
}
