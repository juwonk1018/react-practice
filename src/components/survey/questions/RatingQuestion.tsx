import { Question, Answer } from '@/types/survey';

interface RatingQuestionProps {
  question: Question;
  answer: Answer | undefined;
  onAnswerChange: (answer: Answer) => void;
}

export default function RatingQuestion({
  question,
  answer,
  onAnswerChange,
}: RatingQuestionProps) {
  const maxRating = question.maxRating || 5;
  const selectedRating = (answer?.value as number) || 0;

  const handleClick = (rating: number) => {
    onAnswerChange({
      questionId: question.id,
      value: rating,
    });
  };

  return (
    <div style={styles.container}>
      {Array.from({ length: maxRating }, (_, index) => index + 1).map(
        (rating) => (
          <button
            key={rating}
            onClick={() => handleClick(rating)}
            style={{
              ...styles.star,
              ...(rating <= selectedRating ? styles.starSelected : {}),
            }}
            type="button"
          >
            ★
          </button>
        ),
      )}
      {selectedRating > 0 && (
        <span style={styles.ratingText}>
          {selectedRating} / {maxRating}
        </span>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  star: {
    fontSize: '32px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#ddd',
    transition: 'color 0.2s',
    padding: '4px',
  },
  starSelected: {
    color: '#FFD700',
  },
  ratingText: {
    marginLeft: '12px',
    fontSize: '16px',
    color: '#666',
  },
};
