import { Question, Answer } from '@/types/survey';

interface TextQuestionProps {
  question: Question;
  answer: Answer | undefined;
  onAnswerChange: (answer: Answer) => void;
}

export default function TextQuestion({
  question,
  answer,
  onAnswerChange,
}: TextQuestionProps) {
  const value = (answer?.value as string) || '';

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onAnswerChange({
      questionId: question.id,
      value: e.target.value,
    });
  };

  return (
    <textarea
      value={value}
      onChange={handleChange}
      placeholder="답변을 입력해주세요..."
      style={styles.textarea}
      rows={5}
    />
  );
}

const styles: Record<string, React.CSSProperties> = {
  textarea: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #e0e0e0',
    resize: 'vertical',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
  },
};
