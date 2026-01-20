import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
  onReset?: () => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  reset = () => {
    // hasError가 false로 변하게 되면, Line 54에 의해 this.props.children 다시 렌더링.
    // 이때, 또 에러가 난다면 getDerivedStateFromError에 의해서 다시 hasError가 true로 세팅됨.

    this.setState({ hasError: false, error: null });
    this.props.onReset?.();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div style={styles.errorContainer}>
          <h2 style={styles.errorTitle}>🚨 에러가 발생했습니다!</h2>
          <pre style={styles.errorMessage}>{this.state.error?.message}</pre>
          <pre style={styles.errorStack}>{this.state.error?.stack}</pre>
          <button style={styles.resetButton} onClick={this.reset}>
            다시 시도
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const styles: Record<string, React.CSSProperties> = {
  errorContainer: {
    padding: '20px',
    margin: '10px',
    backgroundColor: '#ffebee',
    border: '2px solid #f44336',
    borderRadius: '8px',
  },
  errorTitle: {
    color: '#c62828',
    margin: '0 0 10px 0',
  },
  errorMessage: {
    color: '#d32f2f',
    backgroundColor: '#fff',
    padding: '10px',
    borderRadius: '4px',
    overflow: 'auto',
  },
  errorStack: {
    color: '#666',
    backgroundColor: '#f5f5f5',
    padding: '10px',
    borderRadius: '4px',
    fontSize: '12px',
    overflow: 'auto',
    maxHeight: '200px',
  },
  resetButton: {
    marginTop: '10px',
    padding: '10px 20px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },
};
