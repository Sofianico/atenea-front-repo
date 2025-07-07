import styles from "./trueFalseContent.module.css";

export default function TrueFalseContent({ id, text, type, answer, onChange }) {
  const options = [
    {
      value: true,
      label: "True",
    },
    {
      value: false,
      label: "False",
    },
  ];

  const handleChangeTextarea = (e) => {
    const newText = e.target.value;
    onChange({
      content: {
        id,
        type,
        text: newText,
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
        answer: options[optionIndex].value,
      },
    });
  };

  return (
    <form className={styles.trueFalseContent}>
      <textarea className={styles.inputSentence} onChange={handleChangeTextarea} defaultValue={text} />

      <div className={styles.options}>
        {options &&
          options.map(({ value, label }, index) => (
            <label key={index} className={styles.option + (value === answer ? ` answer` : "")}>
              <input
                className={styles.input}
                type="radio"
                checked={value === answer}
                data-index={index}
                onChange={handleChangeRadioButton}
              />
              {label}
            </label>
          ))}
      </div>
    </form>
  );
}
