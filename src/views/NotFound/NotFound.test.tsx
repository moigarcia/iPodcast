/* eslint-disable testing-library/no-debugging-utils */
/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable jest/no-conditional-expect */
/* eslint-disable testing-library/await-async-query */
/* eslint-disable testing-library/no-wait-for-side-effects */
/* eslint-disable testing-library/prefer-presence-queries */
/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import { render, screen, waitFor, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import NotFound from './NotFound';
import { LoadingContext } from '../../contexts/LoadingContext';


const value = {
    loading: false,
    showLoading: jest.fn(),
    hideLoading: jest.fn(),
};

beforeEach(() => {
    render(
        <BrowserRouter>
            <LoadingContext.Provider value={value}>
                <NotFound />
            </LoadingContext.Provider>
        </BrowserRouter>
    );
});

afterEach(() => {
    cleanup();
});

describe('NotFound', () => {
    test('NotFound render', async () => {
        await waitFor(() => {
            expect(screen.getByTestId('NotFound')).toBeTruthy();
        });
    });
});
