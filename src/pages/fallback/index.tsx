import { ErrorBoundary } from '@/components/ErrorBoundary';
import './index.css';
import { useState } from 'react';

function JsonParser({ data }: { data: string }) {
  const parsed = JSON.parse(data); // 잘못된 JSON이면 에러
  return <pre>{JSON.stringify(parsed, null, 2)}</pre>;
}

function MyComponent() {
  const [isError, setIsError] = useState(false);

  function handleClick() {
    try {
      throw new Error('에러');
    } catch (e) {
      setIsError(true);
    }
  }

  if (isError) {
    return <div>컴포넌트 내부 에러핸들링이에용</div>;
  }

  return <button onClick={handleClick}>에러</button>;
}

function LoadingSpinner() {
  return (
    <div style={styles.spinnerContainer}>
      로딩중...<div style={styles.spinner}></div>
    </div>
  );
}

function Fallback() {
  return (
    <div
      style={{
        width: '100%',
        alignItems: 'center',
        textAlign: 'center',
        padding: '20px',
      }}
    >
      <ErrorBoundary fallback={<div>전체 에러</div>}>
        <JsonParser data='{"1":2}' />
        <ErrorBoundary fallback={<div>나 내부 부분 에러야</div>}>
          <JsonParser data="I'm Error" />
        </ErrorBoundary>
        <ErrorBoundary
          onReset={() => {
            console.log('@reset');
          }}
        >
          <JsonParser data='fall back 없음' />
        </ErrorBoundary>

        <ErrorBoundary fallback={<LoadingSpinner />}>
          <JsonParser data='fall back 없음' />
        </ErrorBoundary>

        <ErrorBoundary fallback={<div>컴포넌트 외부 에러 핸들링이에용</div>}>
          <MyComponent />
        </ErrorBoundary>
      </ErrorBoundary>
    </div>
  );
}

const styles = {
  spinnerContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spinner: {
    width: 20,
    height: 20,
    border: '2px solid #ccc',
    borderRadius: '50%',
    borderTopColor: '#666',
    animation: 'spin 1s linear infinite',
  },
};

export default Fallback;
