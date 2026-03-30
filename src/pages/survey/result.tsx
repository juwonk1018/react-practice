import { useLocation, useNavigate } from 'react-router-dom';
import { SurveyResult } from '@/types/survey';

export default function SurveyResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state as SurveyResult | undefined;

  // 설문조사 결과가 없는 경우
  if (!result) {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h1 style={styles.title}>잘못된 접근입니다</h1>
          <p style={styles.message}>설문조사 결과를 찾을 수 없습니다.</p>
          <button
            type="button"
            onClick={() => navigate('/survey')}
            style={styles.button}
          >
            설문조사 시작하기
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* 성공 아이콘 */}
        <div style={styles.iconContainer}>
          <div style={styles.successIcon}>✓</div>
        </div>

        {/* 완료 메시지 */}
        <h1 style={styles.title}>설문조사가 완료되었습니다!</h1>
        <p style={styles.message}>
          소중한 의견 감사합니다. 더 나은 서비스를 제공하는데 큰 도움이 됩니다.
        </p>

        {/* 결과 요약 */}
        <div style={styles.summary}>
          <div style={styles.summaryItem}>
            <span style={styles.summaryLabel}>응답 완료</span>
            <span style={styles.summaryValue}>{result.answers.length}개</span>
          </div>
          <div style={styles.summaryItem}>
            <span style={styles.summaryLabel}>완료 시간</span>
            <span style={styles.summaryValue}>
              {new Date(result.completedAt).toLocaleString('ko-KR')}
            </span>
          </div>
        </div>

        {/* 답변 상세 (선택사항: 개발 중에 확인용) */}
        {process.env.NODE_ENV === 'development' && (
          <details style={styles.details}>
            <summary style={styles.detailsSummary}>답변 상세 보기</summary>
            <div style={styles.detailsContent}>
              {result.answers.map((answer, index) => (
                <div key={answer.questionId} style={styles.answerItem}>
                  <div style={styles.answerLabel}>
                    질문 {index + 1} (ID: {answer.questionId})
                  </div>
                  <div style={styles.answerValue}>
                    {typeof answer.value === 'boolean'
                      ? answer.value
                        ? '예'
                        : '아니오'
                      : Array.isArray(answer.value)
                        ? answer.value.join(', ')
                        : answer.value}
                  </div>
                </div>
              ))}
            </div>
          </details>
        )}

        {/* 네비게이션 버튼 */}
        <div style={styles.actions}>
          <button
            type="button"
            onClick={() => navigate('/')}
            style={{ ...styles.button, ...styles.buttonSecondary }}
          >
            홈으로
          </button>
          <button
            type="button"
            onClick={() => navigate('/survey')}
            style={{ ...styles.button, ...styles.buttonPrimary }}
          >
            다시 참여하기
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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: '48px',
    borderRadius: '16px',
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
    width: '100%',
    textAlign: 'center',
  },
  iconContainer: {
    marginBottom: '24px',
  },
  successIcon: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: '#4CAF50',
    color: '#fff',
    fontSize: '48px',
    fontWeight: 'bold',
  },
  title: {
    fontSize: '28px',
    fontWeight: '700',
    color: '#333',
    margin: '0 0 16px 0',
  },
  message: {
    fontSize: '16px',
    color: '#666',
    margin: '0 0 32px 0',
    lineHeight: 1.6,
  },
  summary: {
    display: 'flex',
    gap: '24px',
    marginBottom: '32px',
    padding: '24px',
    backgroundColor: '#f9f9f9',
    borderRadius: '12px',
  },
  summaryItem: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  summaryLabel: {
    fontSize: '14px',
    color: '#999',
  },
  summaryValue: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#333',
  },
  details: {
    marginBottom: '32px',
    textAlign: 'left',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '16px',
  },
  detailsSummary: {
    cursor: 'pointer',
    fontWeight: '600',
    color: '#666',
    marginBottom: '12px',
  },
  detailsContent: {
    marginTop: '16px',
  },
  answerItem: {
    marginBottom: '16px',
    paddingBottom: '16px',
    borderBottom: '1px solid #f0f0f0',
  },
  answerLabel: {
    fontSize: '14px',
    color: '#999',
    marginBottom: '4px',
  },
  answerValue: {
    fontSize: '16px',
    color: '#333',
  },
  actions: {
    display: 'flex',
    gap: '12px',
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
};
