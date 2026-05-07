import { Component, type ReactNode } from "react";

type Props = { children: ReactNode };
type State = { error: Error | null };

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: { componentStack?: string | null }) {
    console.error("React error boundary caught:", error, info.componentStack);
  }

  reset = () => this.setState({ error: null });

  render() {
    if (this.state.error) {
      return (
        <div className="error-boundary">
          <div className="error-boundary-card">
            <div className="error-boundary-icon">!</div>
            <h1>Something broke</h1>
            <p>The UI crashed. Reload to try again, or check the browser console for details.</p>
            <pre>{this.state.error.message}</pre>
            <div className="error-boundary-actions">
              <button onClick={this.reset}>Try again</button>
              <button className="primary" onClick={() => location.reload()}>Reload page</button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
