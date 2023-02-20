/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/await-async-query */
/* eslint-disable testing-library/no-wait-for-side-effects */
/* eslint-disable testing-library/prefer-presence-queries */
/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import { render, screen, waitFor, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import CardList from './CardList';
import { LoadingContext } from '../../../contexts/LoadingContext';
import { podcast } from '../../../utils/testMocks';

const value = {
    loading: false,
    showLoading: jest.fn(),
    hideLoading: jest.fn(),
};

beforeEach(() => {
    render(
        <BrowserRouter>
            <LoadingContext.Provider value={value}>
                <CardList podcast={podcast} onNavigate={mockedUsedNavigate} />
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

describe('CardList', () => {
    test('CardList render', async () => {
        await waitFor(() => {
            expect(screen.getByTestId('CardList')).toBeInTheDocument();
        });
    });
    test('Navigate to episode route', async () => {
        const cardBox = screen.queryByTestId('CardList__box');
        fireEvent.click(cardBox);
        expect(mockedUsedNavigate).toHaveBeenCalled();
    });
});
