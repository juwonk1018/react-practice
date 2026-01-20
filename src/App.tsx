import { ErrorBoundary } from './playground/ErrorBoundary';

function JsonParser({ data }: { data: string }) {
  const parsed = JSON.parse(data); // 잘못된 JSON이면 에러
  return <pre>{JSON.stringify(parsed, null, 2)}</pre>;
}

function App() {
  return (
    <div style={{ padding: '20px' }}>
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
      </ErrorBoundary>
    </div>
  );
}

export default App;
