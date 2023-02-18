/* eslint-disable testing-library/no-render-in-setup */
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LoadingContextProvider, useLoadingContext } from './LoadingContext';
const TestComponent = () => {
    const { loading, hideLoading, showLoading } = useLoadingContext();
    return (
        <div data-testid="child">
            <div data-testid="loading">{loading.toString()}</div>
            <button onClick={hideLoading}>hide loading</button>
            <button onClick={() => showLoading(true)}>show loading</button>
        </div>
    );
};
beforeEach(() => {
    render(
        <LoadingContextProvider>
            <TestComponent />
        </LoadingContextProvider>
    );
});
describe('LoadingContextProvider', () => {
    test('Render ok', () => {
        const childElement = screen.getByTestId('child');
        expect(childElement).toBeInTheDocument();
    });
    test('Check state', () => {
        expect(screen.getByTestId('loading')).toHaveTextContent('true');
    });
    test('Check hide loading', () => {
        expect(screen.getByTestId('loading')).toHaveTextContent('true');

        const hideLoadingButton = screen.getByText('hide loading');

        fireEvent.click(hideLoadingButton);

        expect(screen.getByTestId('loading')).toHaveTextContent('false');
    });
    test('Check show loading', () => {
        expect(screen.getByTestId('loading')).toHaveTextContent('true');

        const showLoadingButton = screen.getByText('show loading');

        fireEvent.click(showLoadingButton);

        expect(screen.getByTestId('loading')).toHaveTextContent('true');
    });
});
