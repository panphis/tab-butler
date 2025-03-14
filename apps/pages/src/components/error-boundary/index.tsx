import React, { ReactNode } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Button, Space } from "@repo/ui";


type ErrorBoundaryProps = {
	children: ReactNode
};
type ErrorBoundaryState = {
	hasError: boolean;
	error: Error | null;
	errorInfo: React.ErrorInfo | null
};

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
	constructor(props: ErrorBoundaryProps) {
		super(props);
		this.state = { hasError: false, error: null, errorInfo: null };
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		console.error("ErrorBoundary caught an error:");
		console.dir(error);
		console.dir(errorInfo);
		this.setState({ hasError: true, error, errorInfo });
	}

	resetError = () => {
		this.setState({ hasError: false, error: null, errorInfo: null });
	};

	reload = () => {
		window.location.reload()
	}

	render() {
		if (this.state.hasError) {
			return (
				<div className="w-full p-5">
					<Space direction="col" className="w-full min-h-96 justify-center items-center">
						<div className="w-3/5">
							<h2 className="text-lg">Oops! 发生了一些错误</h2>
							<Accordion type="single" collapsible>
								<AccordionItem value="item-1">
									<AccordionTrigger>
										<p className="text-destructive">错误信息: {this.state.error?.message}</p>
									</AccordionTrigger>
									<AccordionContent className="whitespace-pre-wrap text-xs">
										{this.state.errorInfo && this.state.errorInfo.componentStack}
									</AccordionContent>
								</AccordionItem>
							</Accordion>
							<footer className="flex mt-8 justify-end items-center gap-8">
								<Button onClick={this.reload}>刷新页面</Button>
								<Button onClick={this.resetError}>重试</Button>
							</footer>
						</div>
					</Space>
				</div>
			);
		}

		return this.props.children;
	}
}

export default ErrorBoundary;
