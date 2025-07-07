import styles from "./multipleChoiceContent.module.css";

export default function MultipleChoiceContent({
  id,
  text,
  type,
  options,
  answer,
  onChange,
}) {
  const handleChangeTextarea = (e) => {
    onChange({
      content: {
        id,
        type,
        text: e.target.value,
        options,
        answer,
      },
    });
  };

  const handleChangeLabel = (e) => {
    const optionLabel = e.target.value;
    const optionIndex = e.target.dataset.index;
    options[optionIndex].text = optionLabel;
    onChange({
      content: {
        id,
        type,
        text,
        options,
        answer,
      },
    });
  };

  const handleChangeRadioButton = (e) => {
    const optionIndex = parseInt(e.target.dataset.index);
    onChange({
      content: {
        id,
        type,
        text,
        options,
        answer: optionIndex,
      },
    });
  };

  return (
    <form className={styles.multipleChoiceContent}>
      <textarea
        className={styles.inputSentence}
        onChange={handleChangeTextarea}
        defaultValue={text}
      />

      <div className={styles.options}>
        {options &&
          options.map(({ text }, index) => (
            <label
              className={
                styles.option + (index === answer ? ` ${styles.answer}` : "")
              }
              key={index}
            >
              <input
                className={styles.input}
                type="radio"
                checked={index === answer}
                data-index={index}
                onChange={handleChangeRadioButton}
              />
              <textarea
                className={styles.optionInput}
                defaultValue={text}
                data-index={index}
                onChange={handleChangeLabel}
              />
            </label>
          ))}
      </div>
    </form>
  );
}
