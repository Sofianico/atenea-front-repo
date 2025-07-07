"use client";

import { useContext } from "react";

import { CourseContext } from "@/features/create-course/stores/CourseContextProvider";

import { useCreateCoursePath } from "@/features/create-course/hooks/useCreateCoursePath";

import Image from "next/image";
import AutocompleteOptions from "@/features/question/components/organisms/autocompleteOptions/autocompleteOptions";
import ToggleLabelCard from "@/features/create-course/components/molecules/toggleLabelCard/toggleLabelCard";
import ButtonLink from "@/components/atoms/buttonLink/buttonLink";
import ButtonPrimary from "@/components/atoms/buttonPrimary/buttonPrimary";

export default function CourseTags() {
  const { next, prev } = useCreateCoursePath();
  const { contains, options, tags, inSearching, setContains, toggleTag, save } =
    useContext(CourseContext);

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
          <AutocompleteOptions
            placeholder="Aspectos clave"
            value={contains}
            options={options}
            selected={tags}
            inSearching={inSearching}
            onChange={setContains}
            onSelect={toggleTag}
            createLabel="Crea el Aspecto Clave"
          />

          <ToggleLabelCard options={tags} onSelect={toggleTag} />
        </div>

        <div className="section-actions">
          <div>
            <ButtonLink onClick={handlePrevious} label="Anterior" />
            <ButtonPrimary onClick={handleNext} label="Siguiente" />
          </div>
        </div>
      </div>
    </div>
  );
}
