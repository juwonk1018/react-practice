import { useParams, useNavigate } from 'react-router-dom';

export default function ItemDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <button style={styles.backButton} onClick={() => navigate(-1)}>
        ← 뒤로가기
      </button>
      <div style={styles.card}>
        <h1 style={styles.title}>아이템 {id}</h1>
        <p style={styles.description}>
          이것은 {id}번째 아이템의 상세 페이지입니다.
        </p>
        <div style={styles.details}>
          <div style={styles.detailItem}>
            <strong>ID:</strong> {id}
          </div>
          <div style={styles.detailItem}>
            <strong>생성일:</strong> 2024-01-01
          </div>
          <div style={styles.detailItem}>
            <strong>상태:</strong> 활성
          </div>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
  },
  backButton: {
    padding: '10px 20px',
    marginBottom: '20px',
    backgroundColor: '#f5f5f5',
    border: '1px solid #ddd',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  card: {
    padding: '30px',
    border: '1px solid #ddd',
    borderRadius: '12px',
    backgroundColor: '#fff',
  },
  title: {
    margin: '0 0 15px 0',
    color: '#333',
  },
  description: {
    color: '#666',
    fontSize: '16px',
    marginBottom: '20px',
  },
  details: {
    borderTop: '1px solid #eee',
    paddingTop: '20px',
  },
  detailItem: {
    padding: '10px 0',
    borderBottom: '1px solid #f5f5f5',
  },
};
