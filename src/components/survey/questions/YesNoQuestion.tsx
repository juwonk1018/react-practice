import { Question, Answer } from '@/types/survey';

interface YesNoQuestionProps {
  question: Question;
  answer: Answer | undefined;
  onAnswerChange: (answer: Answer) => void;
}

export default function YesNoQuestion({
  question,
  answer,
  onAnswerChange,
}: YesNoQuestionProps) {
  const selectedValue = answer?.value as boolean | undefined;

  const handleClick = (value: boolean) => {
    onAnswerChange({
      questionId: question.id,
      value,
    });
  };

  return (
    <div style={styles.container}>
      <button
        type="button"
        onClick={() => handleClick(true)}
        style={{
          ...styles.button,
          ...(selectedValue === true ? styles.buttonSelected : {}),
        }}
      >
        예
      </button>
      <button
        type="button"
        onClick={() => handleClick(false)}
        style={{
          ...styles.button,
          ...(selectedValue === false ? styles.buttonSelected : {}),
        }}
      >
        아니오
      </button>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    gap: '12px',
  },
  button: {
    flex: 1,
    padding: '16px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '2px solid #e0e0e0',
    backgroundColor: '#fff',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontWeight: '500',
  },
  buttonSelected: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    borderColor: '#4CAF50',
  },
};
