import ErrorPage from "../ErrorPage";
import React from "react";

export class ErrorBoundary extends React.Component {
    state = {hasError: false};

    static getDerivedStateFromError(error) {
        return {hasError: true};
    }

    componentDidCatch(error, info) {
        console.error({error, info});
    }

    triggerError = ({error, errorInfo}) => {
        console.error({error, errorInfo});
        this.setState({hasError: true});
    }
    resetError = () => this.setState({hasError: false});

    render() {
        if (this.state.hasError) {
            return <ErrorPage/>;
        }
        return this.props.children;
    }
}