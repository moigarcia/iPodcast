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
import { PodcastDetail } from '../../@types/podcastDetail';
import { Episode as EpisodeType } from '../../@types/episode';
import { LoadingContext } from '../../contexts/LoadingContext';

jest.mock('../../service/podcasts');

const podcastData: PodcastDetail = {
    wrapperType: 'track',
    kind: 'podcast',
    artistId: 1535844019,
    collectionId: 1535809341,
    trackId: 1535809341,
    artistName: 'The Joe Budden Network',
    collectionName: 'The Joe Budden Podcast',
    trackName: 'The Joe Budden Podcast',
    collectionCensoredName: 'The Joe Budden Podcast',
    trackCensoredName: 'The Joe Budden Podcast',
    artistViewUrl: 'https://podcasts.apple.com/us/artist/the-joe-budden-network/1535844019?uo=4',
    collectionViewUrl: 'https://podcasts.apple.com/us/podcast/the-joe-budden-podcast/id1535809341?uo=4',
    feedUrl: 'https://jbpod.libsyn.com/applepodcast',
    trackViewUrl: 'https://podcasts.apple.com/us/podcast/the-joe-budden-podcast/id1535809341?uo=4',
    artworkUrl30:
        'https://is2-ssl.mzstatic.com/image/thumb/Podcasts113/v4/f2/21/fa/f221fabd-017f-5125-633b-f1fe4f39802a/mza_182995249085044287.jpg/30x30bb.jpg',
    artworkUrl60:
        'https://is2-ssl.mzstatic.com/image/thumb/Podcasts113/v4/f2/21/fa/f221fabd-017f-5125-633b-f1fe4f39802a/mza_182995249085044287.jpg/60x60bb.jpg',
    artworkUrl100:
        'https://is2-ssl.mzstatic.com/image/thumb/Podcasts113/v4/f2/21/fa/f221fabd-017f-5125-633b-f1fe4f39802a/mza_182995249085044287.jpg/100x100bb.jpg',
    collectionPrice: 0,
    trackPrice: 0,
    collectionHdPrice: 0,
    releaseDate: '2023-02-18T08:00:00Z',
    collectionExplicitness: 'notExplicit',
    trackExplicitness: 'explicit',
    trackCount: 365,
    trackTimeMillis: 10610,
    country: 'USA',
    currency: 'USD',
    primaryGenreName: 'Music',
    contentAdvisoryRating: 'Explicit',
    artworkUrl600:
        'https://is2-ssl.mzstatic.com/image/thumb/Podcasts113/v4/f2/21/fa/f221fabd-017f-5125-633b-f1fe4f39802a/mza_182995249085044287.jpg/600x600bb.jpg',
    genreIds: ['1310', '26'],
    genres: ['Music', 'Podcasts'],
    date: 1676917704,
};

const episode: EpisodeType = {
    country: 'USA',
    episodeUrl: 'https://traffic.libsyn.com/secure/jbpod/Joe_Budden_Podcast_603.mp3?dest-id=2422538',
    closedCaptioning: 'none',
    collectionId: 1535809341,
    collectionName: 'The Joe Budden Podcast',
    artistIds: [1535844019],
    episodeFileExtension: 'mp3',
    episodeContentType: 'audio',
    artworkUrl160:
        'https://is2-ssl.mzstatic.com/image/thumb/Podcasts113/v4/f2/21/fa/f221fabd-017f-5125-633b-f1fe4f39802a/mza_182995249085044287.jpg/160x160bb.jpg',
    genres: [
        {
            name: 'Music',
            id: '1310',
        },
    ],
    episodeGuid: '1e007c09-5094-4399-abb0-a43c926c0f0e',
    description:
        'The JBP starts this episode reading the list of reasons why women hate each other (12:04) before diving into a fashion convo as Pharrell becomes Louis Vuitton’s next men’s creative director (23:54). A$AP Rocky & Rihanna grace the cover of British Vogue (33:18) and Melyssa addresses Don Lemon’s recent comments about Nikki Haley being past her prime (51:46). *SPOILER ALERTS AHEAD* Ice gives his thoughts on Ant-Man (1:22:09) and the crew provides their opinions on the latest seasons of YOU (1:25:05) & All-American (1:30:04). Also, Ice shares his experience at a recent comedy show (1:49:15), Part of the Show returns (2:12:28), + MORE!\n Become a Patron of The Joe Budden Podcast for additional bonus episodes and visual content for all things JBP.: Tap in here www.patreon.com/JoeBudden\n  \n Sleeper Picks:\n Joe | Fridayy - “Know The Truth” \n Ice | Fetty Wap - “Tonight”\n Parks | Rasheed Chappelle, 38 Spesh, & Little Vic - “Courtside”\n Ish | Dana Vaughns - “Touch My Soul”\n QueenzFlip | JayO (feat. Cowwa Bang) - “Matter of Time”\n Melyssa | Terrace Martin (feat. Arin Ray & Elena Pinderhughes) - “Beige”',
    artworkUrl60:
        'https://is2-ssl.mzstatic.com/image/thumb/Podcasts113/v4/f2/21/fa/f221fabd-017f-5125-633b-f1fe4f39802a/mza_182995249085044287.jpg/60x60bb.jpg',
    artistViewUrl: 'https://itunes.apple.com/us/artist/the-joe-budden-network/1535844019?mt=2&uo=4',
    contentAdvisoryRating: 'Explicit',
    releaseDate: '2023-02-18T08:00:00Z',
    trackId: 1000600305730,
    trackName: 'Episode 603 | "God Dad Did"',
    feedUrl: 'https://jbpod.libsyn.com/applepodcast',
    trackViewUrl: 'https://podcasts.apple.com/us/podcast/episode-603-god-dad-did/id1535809341?i=1000600305730&uo=4',
    artworkUrl600:
        'https://is2-ssl.mzstatic.com/image/thumb/Podcasts113/v4/f2/21/fa/f221fabd-017f-5125-633b-f1fe4f39802a/mza_182995249085044287.jpg/600x600bb.jpg',
    trackTimeMillis: 10610000,
    collectionViewUrl: 'https://itunes.apple.com/us/podcast/the-joe-budden-podcast/id1535809341?mt=2&uo=4',
    previewUrl: 'https://traffic.libsyn.com/secure/jbpod/Joe_Budden_Podcast_603.mp3?dest-id=2422538',
    shortDescription:
        'The JBP starts this episode reading the list of reasons why women hate each other (12:04) before diving into a fashion convo as Pharrell becomes Louis Vuitton’s next men’s creative director (23:54). A$AP Rocky & Rihanna grace the cover of...',
    kind: 'podcast-episode',
    wrapperType: 'podcastEpisode',
};

const podcastList: Podcast[] = [
    {
        'im:name': {
            label: 'The Joe Budden Podcast',
        },
        'im:image': [
            {
                label: 'https://is3-ssl.mzstatic.com/image/thumb/Podcasts113/v4/f2/21/fa/f221fabd-017f-5125-633b-f1fe4f39802a/mza_182995249085044287.jpg/55x55bb.png',
                attributes: {
                    height: '55',
                },
            },
            {
                label: 'https://is5-ssl.mzstatic.com/image/thumb/Podcasts113/v4/f2/21/fa/f221fabd-017f-5125-633b-f1fe4f39802a/mza_182995249085044287.jpg/60x60bb.png',
                attributes: {
                    height: '60',
                },
            },
            {
                label: 'https://is1-ssl.mzstatic.com/image/thumb/Podcasts113/v4/f2/21/fa/f221fabd-017f-5125-633b-f1fe4f39802a/mza_182995249085044287.jpg/170x170bb.png',
                attributes: {
                    height: '170',
                },
            },
        ],
        summary: {
            label: 'Tune into Joe Budden and his friends. Follow along the crazy adventures of these very random friends.',
        },
        'im:price': {
            label: 'Get',
            attributes: {
                amount: '0',
                currency: 'USD',
            },
        },
        'im:contentType': {
            attributes: {
                term: 'Podcast',
                label: 'Podcast',
            },
        },
        rights: {
            label: '© All rights reserved',
        },
        title: {
            label: 'The Joe Budden Podcast - The Joe Budden Network',
        },
        link: {
            attributes: {
                rel: 'alternate',
                type: 'text/html',
                href: 'https://podcasts.apple.com/us/podcast/the-joe-budden-podcast/id1535809341?uo=2',
            },
        },
        id: {
            label: 'https://podcasts.apple.com/us/podcast/the-joe-budden-podcast/id1535809341?uo=2',
            attributes: {
                'im:id': '1535809341',
            },
        },
        'im:artist': {
            label: 'The Joe Budden Network',
            attributes: {
                href: 'https://podcasts.apple.com/us/artist/the-joe-budden-network/1535844019?uo=2',
            },
        },
        category: {
            attributes: {
                'im:id': '1310',
                term: 'Music',
                scheme: 'https://podcasts.apple.com/us/genre/podcasts-music/id1310?uo=2',
                label: 'Music',
            },
        },
        'im:releaseDate': {
            label: '2023-02-11T00:00:00-07:00',
            attributes: {
                label: 'February 11, 2023',
            },
        },
    },
];

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
