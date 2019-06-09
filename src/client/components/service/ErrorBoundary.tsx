import React, { ErrorInfo } from "react";

class ErrorBoundary extends React.Component {
    state: { error: Error | null, errorInfo: ErrorInfo | null } = {
        error: null,
        errorInfo: null
    };

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        this.setState({
            error,
            errorInfo
        });
    }

    render() {
        if (this.state.errorInfo) {
            return (
                <div>
                    <h1 className="error__heading">Sorry, something went wrong...</h1>
                    <h2>{this.state.error && this.state.error.toString()}</h2>
                    <details className="error__details">
                        {this.state.errorInfo!.componentStack}
                    </details>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
