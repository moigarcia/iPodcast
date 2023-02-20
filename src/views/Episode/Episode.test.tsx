/* eslint-disable testing-library/no-debugging-utils */
/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable jest/no-conditional-expect */
/* eslint-disable testing-library/await-async-query */
/* eslint-disable testing-library/no-wait-for-side-effects */
/* eslint-disable testing-library/prefer-presence-queries */
/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import { render, screen, waitFor, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Episode from './Episode';
import { Podcast } from '../../@types/podcast';
import { LoadingContext } from '../../contexts/LoadingContext';
import { podcast, episode, podcastData } from '../../utils/testMocks';

jest.mock('../../service/podcasts');

const podcastList: Podcast[] = [podcast];

const value = {
    loading: false,
    showLoading: jest.fn(),
    hideLoading: jest.fn(),
};

beforeEach(() => {
    render(
        <BrowserRouter>
            <LoadingContext.Provider value={value}>
                <Episode />
            </LoadingContext.Provider>
        </BrowserRouter>
    );
});

afterEach(() => {
    cleanup();
});

afterAll(() => localStorage.clear());

const mockedUsedNavigate = jest.fn((path: string) => {
    window.location.href = path;
});

jest.mock('react-router-dom', () => ({
    ...(jest.requireActual('react-router-dom') as any),
    useNavigate: () => mockedUsedNavigate,
    useLocation: jest.fn(() => ({ state: { podcastDetail: [podcastData, episode], podcast: podcastList[0] } })),
}));

describe('Episode', () => {
    test('Episode, EpisodeCard and PodcastCard render', async () => {
        await waitFor(() => {
            expect(screen.getByTestId('Episode')).toBeTruthy();
            expect(screen.getByTestId('PodcastCard')).toBeTruthy();
            expect(screen.getByTestId('EpisodeCard')).toBeTruthy();
        });
    });
    test('Navigate to podcast route', async () => {
        await waitFor(() => {
            const cardBox = screen.queryByTestId('PodcastCardTitle');
            screen.debug();

            fireEvent.click(cardBox);
            expect(mockedUsedNavigate).toHaveBeenCalled();
        });
    });
});
