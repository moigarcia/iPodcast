import { render, screen } from '@testing-library/react';
import { LoadingContext } from './contexts/LoadingContext';
import App from './App';



describe('App', () => {
    test('renders App component', () => {
        const value = {
            loading: false,
            showLoading: () => true,
            hideLoading: () => false,
        };
        render(
            <LoadingContext.Provider value={value}>
                <App />
            </LoadingContext.Provider>
        );
        expect(screen.getByTestId('App')).toBeTruthy()
    });
});
