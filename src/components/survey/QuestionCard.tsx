import { Question, Answer } from '@/types/survey';
import SingleChoiceQuestion from './questions/SingleChoiceQuestion';
import MultipleChoiceQuestion from './questions/MultipleChoiceQuestion';
import TextQuestion from './questions/TextQuestion';
import RatingQuestion from './questions/RatingQuestion';
import YesNoQuestion from './questions/YesNoQuestion';

interface QuestionCardProps {
  question: Question;
  answer: Answer | undefined;
  onAnswerChange: (answer: Answer) => void;
}

export default function QuestionCard({
  question,
  answer,
  onAnswerChange,
}: QuestionCardProps) {
  const renderQuestion = () => {
    switch (question.type) {
      case 'single':
        return (
          <SingleChoiceQuestion
            question={question}
            answer={answer}
            onAnswerChange={onAnswerChange}
          />
        );
      case 'multiple':
        return (
          <MultipleChoiceQuestion
            question={question}
            answer={answer}
            onAnswerChange={onAnswerChange}
          />
        );
      case 'text':
        return (
          <TextQuestion
            question={question}
            answer={answer}
            onAnswerChange={onAnswerChange}
          />
        );
      case 'rating':
        return (
          <RatingQuestion
            question={question}
            answer={answer}
            onAnswerChange={onAnswerChange}
          />
        );
      case 'yesno':
        return (
          <YesNoQuestion
            question={question}
            answer={answer}
            onAnswerChange={onAnswerChange}
          />
        );
      default:
        return <div>지원하지 않는 질문 타입입니다.</div>;
    }
  };

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <h2 style={styles.question}>{question.question}</h2>
        {question.required && <span style={styles.required}>*</span>}
      </div>
      {renderQuestion()}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    backgroundColor: '#fff',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '20px',
  },
  question: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#333',
    margin: 0,
  },
  required: {
    color: '#f44336',
    fontSize: '20px',
  },
};
