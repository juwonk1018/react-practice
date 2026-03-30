import { Question, Answer } from '@/types/survey';

interface SingleChoiceQuestionProps {
  question: Question;
  answer: Answer | undefined;
  onAnswerChange: (answer: Answer) => void;
}

export default function SingleChoiceQuestion({
  question,
  answer,
  onAnswerChange,
}: SingleChoiceQuestionProps) {
  const selectedValue = answer?.value as string | undefined;

  const handleChange = (value: string) => {
    onAnswerChange({
      questionId: question.id,
      value,
    });
  };

  return (
    <div style={styles.container}>
      {question.options?.map((option, index) => (
        <label key={index} style={styles.option}>
          <input
            type="radio"
            name={question.id}
            value={option}
            checked={selectedValue === option}
            onChange={(e) => handleChange(e.target.value)}
            style={styles.radio}
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
  radio: {
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
