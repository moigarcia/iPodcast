/* eslint-disable testing-library/await-async-query */
/* eslint-disable testing-library/no-wait-for-side-effects */
/* eslint-disable testing-library/prefer-presence-queries */
/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import { render, screen, waitFor, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import PodcastView from './Podcast';
import { PodcastDetail } from '../../@types/podcastDetail';
import { getPodcastById } from '../../service/podcasts';
import { LoadingContext } from '../../contexts/LoadingContext';

jest.mock('../../service/podcasts');

const podcastDetail: PodcastDetail = {
    artistName: 'REVOLT',
    artworkUrl30:
        'https://is2-ssl.mzstatic.com/image/thumb/Podcasts122/v4/84/84/ab/8484ab60-8c9e-30d5-92d3-c806c89cbbe7/mza_14154291241936766492.jpg/30x30bb.jpg',
    artworkUrl60:
        'https://is2-ssl.mzstatic.com/image/thumb/Podcasts122/v4/84/84/ab/8484ab60-8c9e-30d5-92d3-c806c89cbbe7/mza_14154291241936766492.jpg/60x60bb.jpg',
    artworkUrl100:
        'https://is2-ssl.mzstatic.com/image/thumb/Podcasts122/v4/84/84/ab/8484ab60-8c9e-30d5-92d3-c806c89cbbe7/mza_14154291241936766492.jpg/100x100bb.jpg',
    artworkUrl600:
        'https://is2-ssl.mzstatic.com/image/thumb/Podcasts122/v4/84/84/ab/8484ab60-8c9e-30d5-92d3-c806c89cbbe7/mza_14154291241936766492.jpg/600x600bb.jpg',
    collectionCensoredName: 'Caresha Please',
    collectionExplicitness: 'notExplicit',
    collectionHdPrice: 0,
    collectionId: 1628914491,
    collectionName: 'Caresha Please',
    collectionPrice: 0,
    collectionViewUrl: 'https://podcasts.apple.com/us/podcast/caresha-please/id1628914491?uo=4',
    contentAdvisoryRating: 'Explicit',
    country: 'USA',
    currency: 'USD',
    date: 1676883766,
    feedUrl: 'https://audioboom.com/channels/5080256.rss',
    genreIds: ['1525', '26', '1310', '1523'],
    genres: ['Music Interviews', 'Podcasts', 'Music', 'Music Commentary'],
    kind: 'podcast',
    primaryGenreName: 'Music Interviews',
    releaseDate: '2022-12-23T01:00:00Z',
    trackCensoredName: 'Caresha Please',
    trackCount: 8,
    trackExplicitness: 'explicit',
    trackId: 1628914491,
    trackName: 'Caresha Please',
    trackPrice: 0,
    trackTimeMillis: 3939,
    trackViewUrl: 'https://podcasts.apple.com/us/podcast/caresha-please/id1628914491?uo=4',
    wrapperType: 'track',
};

const value = {
    loading: false,
    showLoading: jest.fn(),
    hideLoading: jest.fn(),
};

beforeEach(() => {
    (getPodcastById as jest.MockedFunction<typeof getPodcastById>).mockResolvedValue(podcastDetail);
});

afterEach(() => {
    jest.resetAllMocks();
    cleanup();
});

afterAll(() => localStorage.clear())

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
