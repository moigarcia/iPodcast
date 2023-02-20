/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/await-async-query */
/* eslint-disable testing-library/no-wait-for-side-effects */
/* eslint-disable testing-library/prefer-presence-queries */
/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import { render, screen, waitFor, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import PodcastView from './Podcast';
import { getPodcastById } from '../../service/podcasts';
import { LoadingContext } from '../../contexts/LoadingContext';
import { Podcast } from '../../@types/podcast';
import { podcast, episode, podcastData } from '../../utils/testMocks';

jest.mock('../../service/podcasts');

const podcastList: Podcast[] = [podcast];

const value = {
    loading: false,
    showLoading: jest.fn(),
    hideLoading: jest.fn(),
};

beforeEach(() => {
    (getPodcastById as jest.MockedFunction<typeof getPodcastById>).mockResolvedValue([podcastData, episode]);
});

afterEach(() => {
    jest.clearAllMocks();
    cleanup();
});

afterAll(() => localStorage.clear());

const mockedUsedNavigate = jest.fn((path: string) => {
    window.location.href = path;
});

jest.mock('react-router-dom', () => ({
    ...(jest.requireActual('react-router-dom') as any),
    useNavigate: () => mockedUsedNavigate,
    useLocation: jest.fn(() => ({ state: podcastList[0] })),
}));

describe('Podcast', () => {
    test('Podcast render, getPodcast called', async () => {
        render(
            <BrowserRouter>
                <LoadingContext.Provider value={value}>
                    <PodcastView />
                </LoadingContext.Provider>
            </BrowserRouter>
        );
        await waitFor(() => {
            expect(screen.getByTestId('Podcast')).toBeTruthy();
            expect(getPodcastById).toHaveBeenCalled();
        });
    });
    test('getPodcast not called', async () => {
        render(
            <BrowserRouter>
                <LoadingContext.Provider value={value}>
                    <PodcastView />
                </LoadingContext.Provider>
            </BrowserRouter>
        );
        await waitFor(() => {
            expect(screen.getByTestId('Podcast')).toBeTruthy();
            expect(getPodcastById).not.toHaveBeenCalled();
        });
    });

    test('Navigate to episode view', async () => {
        render(
            <BrowserRouter>
                <LoadingContext.Provider value={value}>
                    <PodcastView />
                </LoadingContext.Provider>
            </BrowserRouter>
        );

        const episodeRoute = screen.queryByTestId('Episode');
        fireEvent.click(episodeRoute);
        expect(mockedUsedNavigate).toHaveBeenCalled();
    });
    test('Error getPodcast', async () => {
        localStorage.clear();
        const consoleSpy = jest.spyOn(console, 'error');
        (getPodcastById as jest.MockedFunction<typeof getPodcastById>).mockRejectedValue({
            message: 'Error 1',
        });
        render(
            <BrowserRouter>
                <LoadingContext.Provider value={value}>
                    <PodcastView />
                </LoadingContext.Provider>
            </BrowserRouter>
        );

        await waitFor(() => {
            expect(consoleSpy).toHaveBeenCalled();
        });

        consoleSpy.mockRestore();
    });
});
