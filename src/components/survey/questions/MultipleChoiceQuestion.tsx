import { Question, Answer } from '@/types/survey';

interface MultipleChoiceQuestionProps {
  question: Question;
  answer: Answer | undefined;
  onAnswerChange: (answer: Answer) => void;
}

export default function MultipleChoiceQuestion({
  question,
  answer,
  onAnswerChange,
}: MultipleChoiceQuestionProps) {
  const selectedValues = (answer?.value as string[]) || [];

  const handleChange = (option: string) => {
    let newValues: string[];
    if (selectedValues.includes(option)) {
      newValues = selectedValues.filter((v) => v !== option);
    } else {
      newValues = [...selectedValues, option];
    }

    onAnswerChange({
      questionId: question.id,
      value: newValues,
    });
  };

  return (
    <div style={styles.container}>
      {question.options?.map((option, index) => (
        <label key={index} style={styles.option}>
          <input
            type="checkbox"
            value={option}
            checked={selectedValues.includes(option)}
            onChange={() => handleChange(option)}
            style={styles.checkbox}
          />
          <span style={styles.label}>{option}</span>
        </label>
      ))}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  option: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px',
    borderRadius: '8px',
    border: '1px solid #e0e0e0',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  checkbox: {
    width: '18px',
    height: '18px',
    cursor: 'pointer',
  },
  label: {
    fontSize: '16px',
    color: '#333',
    cursor: 'pointer',
  },
};
