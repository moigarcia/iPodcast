/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/await-async-query */
/* eslint-disable testing-library/no-wait-for-side-effects */
/* eslint-disable testing-library/prefer-presence-queries */
/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import { render, screen, waitFor, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Navbar';
import { LoadingContext } from '../../contexts/LoadingContext';



const value = {
    loading: true,
    showLoading: jest.fn(),
    hideLoading: jest.fn(),
};

beforeEach(() => {
    render(
        <BrowserRouter>
            <LoadingContext.Provider value={value}>
                <Navbar />
            </LoadingContext.Provider>
        </BrowserRouter>
    );
});

afterEach(() => {
    jest.resetAllMocks();
    cleanup();
});
const mockedUsedNavigate = jest.fn((path: string) => {
    window.location.href = path;
});

jest.mock('react-router-dom', () => ({
    ...(jest.requireActual('react-router-dom') as any),
    useNavigate: () => mockedUsedNavigate,
}));

describe('Navbar', () => {
    test('Navbar render', async () => {
        await waitFor(() => {
            expect(screen.getByTestId('Navbar')).toBeInTheDocument();
        });
    });
    test('Navigate to / route', async () => {
        const button = screen.queryByTestId('button');
        fireEvent.click(button);
        expect(mockedUsedNavigate).toHaveBeenCalled();
    });
    test('Loading render', async () => {
        expect(screen.getByRole('img').getAttribute('alt')).toBe('loading');
    });
});
