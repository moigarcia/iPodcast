/* eslint-disable testing-library/await-async-query */
/* eslint-disable testing-library/no-wait-for-side-effects */
/* eslint-disable testing-library/prefer-presence-queries */
/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import { render, screen, waitFor, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import { BrowserRouter } from 'react-router-dom';
import Dashboard from './Dashboard';
import { Podcast } from '../../@types/podcast';
import { getPodcastsList } from '../../service/podcasts';
import { LoadingContext } from '../../contexts/LoadingContext';
import { podcast } from '../../utils/testMocks';

jest.mock('../../service/podcasts');

const podcastList: Podcast[] = [podcast];

const value = {
    loading: false,
    showLoading: jest.fn(),
    hideLoading: jest.fn(),
};

beforeEach(() => {
    (getPodcastsList as jest.MockedFunction<typeof getPodcastsList>).mockResolvedValue(podcastList);
});

afterEach(() => {
    jest.resetAllMocks();
    cleanup()
});

afterAll(() => localStorage.clear())

const mockedUsedNavigate = jest.fn((path: string) => {
    window.location.href = path;
});

jest.mock('react-router-dom', () => ({
    ...(jest.requireActual('react-router-dom') as any),
    useNavigate: () => mockedUsedNavigate,
    useLocation: jest.fn(() => ({ state: podcastList[0] })),
}));

describe('Dashboard', () => {
    test('Dashboard render, getPodcastsList called and CardList render', async () => {
        render(
            <BrowserRouter>
                <LoadingContext.Provider value={value}>
                    <Dashboard />
                </LoadingContext.Provider>
            </BrowserRouter>
        );
        await waitFor(() => {
            expect(screen.getByTestId('Dashboard')).toBeTruthy();
            expect(getPodcastsList).toHaveBeenCalled();
            expect(screen.getByTestId('CardList')).toBeTruthy();
        });
    });

    test('filters the list of podcasts', async () => {
        render(
            <BrowserRouter>
                <LoadingContext.Provider value={value}>
                    <Dashboard />
                </LoadingContext.Provider>
            </BrowserRouter>
        );
        await waitFor( () => {
            fireEvent.change(screen.getByPlaceholderText('Filter podcast...'), { target: { value: podcastList[0].title.label } });
      
            expect(screen.queryByTestId('CardList')).toBeTruthy();

            fireEvent.change(screen.getByPlaceholderText('Filter podcast...'), { target: { value: 'test' } });
        
            expect(screen.queryByText(podcastList[0].title.label)).toBeFalsy();

        });
    });
    test('getPodcastList not called', async () => {
        render(
            <BrowserRouter>
                <LoadingContext.Provider value={value}>
                    <Dashboard />
                </LoadingContext.Provider>
            </BrowserRouter>
        );
        await waitFor(() => {
            expect(getPodcastsList).not.toHaveBeenCalled();
            expect(screen.getByTestId('CardList')).toBeTruthy();
        });
    });

    test('Navigate to episode view', async () => {
        render(
            <BrowserRouter>
                <LoadingContext.Provider value={value}>
                    <Dashboard />
                </LoadingContext.Provider>
            </BrowserRouter>
        );

        const cardBox = screen.queryByTestId('CardList__box');
        fireEvent.click(cardBox);
        expect(mockedUsedNavigate).toHaveBeenCalled();
    });
    test('Error getPodcastList', async () => {
        localStorage.removeItem('dateDashboard');
        const consoleSpy = jest.spyOn(console, 'error');
        (getPodcastsList as jest.MockedFunction<typeof getPodcastsList>).mockRejectedValue({
            message: 'Error 1',
        });

        render(
            <BrowserRouter>
                <LoadingContext.Provider value={value}>
                    <Dashboard />
                </LoadingContext.Provider>
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(consoleSpy).toHaveBeenCalled();
        });

        consoleSpy.mockRestore();
    });
});
