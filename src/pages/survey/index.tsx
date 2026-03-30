import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Survey, Answer } from '@/types/survey';
import ProgressBar from '@/components/survey/ProgressBar';
import QuestionCard from '@/components/survey/QuestionCard';

// 예시 설문조사 데이터
const mockSurvey: Survey = {
  id: 'survey-1',
  title: '사용자 만족도 조사',
  description: '서비스 개선을 위한 설문조사에 참여해주세요.',
  questions: [
    {
      id: 'q1',
      type: 'single',
      question: '현재 서비스에 얼마나 만족하시나요?',
      required: true,
      options: ['매우 만족', '만족', '보통', '불만족', '매우 불만족'],
    },
    {
      id: 'q2',
      type: 'multiple',
      question: '어떤 기능을 가장 자주 사용하시나요? (복수 선택 가능)',
      required: true,
      options: ['검색', '필터링', '정렬', '북마크', '공유'],
    },
    {
      id: 'q3',
      type: 'rating',
      question: '서비스의 사용성을 평가해주세요.',
      required: true,
      maxRating: 5,
    },
    {
      id: 'q4',
      type: 'yesno',
      question: '이 서비스를 다른 사람에게 추천하시겠습니까?',
      required: true,
    },
    {
      id: 'q5',
      type: 'text',
      question: '서비스 개선을 위한 의견을 자유롭게 작성해주세요.',
      required: false,
    },
  ],
};

export default function SurveyPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const navigate = useNavigate();

  const currentQuestion = mockSurvey.questions[currentStep];
  const isLastQuestion = currentStep === mockSurvey.questions.length - 1;

  // 현재 질문의 답변 가져오기
  const currentAnswer = answers.find(
    (answer) => answer.questionId === currentQuestion.id,
  );

  // 답변 변경 핸들러
  const handleAnswerChange = (answer: Answer) => {
    setAnswers((prev) => {
      const index = prev.findIndex((a) => a.questionId === answer.questionId);
      if (index !== -1) {
        const updated = [...prev];
        updated[index] = answer;
        return updated;
      }
      return [...prev, answer];
    });
  };

  // 현재 질문이 답변되었는지 확인
  const isAnswered = () => {
    if (!currentQuestion.required) return true;

    const answer = answers.find((a) => a.questionId === currentQuestion.id);
    if (!answer) return false;

    // 배열 타입 답변 검증 (multiple choice)
    if (Array.isArray(answer.value)) {
      return answer.value.length > 0;
    }

    // 문자열 타입 답변 검증
    if (typeof answer.value === 'string') {
      return answer.value.trim().length > 0;
    }

    // 숫자 타입 답변 검증 (rating)
    if (typeof answer.value === 'number') {
      return answer.value > 0;
    }

    // boolean 타입 답변 검증 (yesno)
    return answer.value !== undefined;
  };

  // 다음 버튼 핸들러
  const handleNext = () => {
    if (isLastQuestion) {
      // 설문조사 완료 - 결과 페이지로 이동
      navigate('/survey/result', {
        state: {
          surveyId: mockSurvey.id,
          answers,
          completedAt: new Date(),
        },
      });
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  // 이전 버튼 핸들러
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        {/* 헤더 */}
        <div style={styles.header}>
          <h1 style={styles.title}>{mockSurvey.title}</h1>
          <p style={styles.description}>{mockSurvey.description}</p>
        </div>

        {/* 진행 바 */}
        <ProgressBar
          current={currentStep + 1}
          total={mockSurvey.questions.length}
        />

        {/* 질문 카드 */}
        <QuestionCard
          question={currentQuestion}
          answer={currentAnswer}
          onAnswerChange={handleAnswerChange}
        />

        {/* 네비게이션 버튼 */}
        <div style={styles.navigation}>
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentStep === 0}
            style={{
              ...styles.button,
              ...styles.buttonSecondary,
              ...(currentStep === 0 ? styles.buttonDisabled : {}),
            }}
          >
            이전
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={!isAnswered()}
            style={{
              ...styles.button,
              ...styles.buttonPrimary,
              ...(!isAnswered() ? styles.buttonDisabled : {}),
            }}
          >
            {isLastQuestion ? '제출' : '다음'}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    padding: '40px 20px',
  },
  content: {
    maxWidth: '700px',
    margin: '0 auto',
  },
  header: {
    marginBottom: '32px',
    textAlign: 'center',
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#333',
    margin: '0 0 12px 0',
  },
  description: {
    fontSize: '16px',
    color: '#666',
    margin: 0,
  },
  navigation: {
    display: 'flex',
    gap: '12px',
    marginTop: '24px',
  },
  button: {
    flex: 1,
    padding: '14px 24px',
    fontSize: '16px',
    fontWeight: '600',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  buttonPrimary: {
    backgroundColor: '#4CAF50',
    color: '#fff',
  },
  buttonSecondary: {
    backgroundColor: '#fff',
    color: '#666',
    border: '1px solid #e0e0e0',
  },
  buttonDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
};
