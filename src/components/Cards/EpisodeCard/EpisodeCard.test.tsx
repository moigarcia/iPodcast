/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/await-async-query */
/* eslint-disable testing-library/no-wait-for-side-effects */
/* eslint-disable testing-library/prefer-presence-queries */
/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import { render, screen, waitFor, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { Episode } from '../../../@types/episode';
import { LoadingContext } from '../../../contexts/LoadingContext';
import EpisodeCard from './EpisodeCard';

const episode: Episode = {
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

const value = {
    loading: false,
    showLoading: jest.fn(),
    hideLoading: jest.fn(),
};

beforeEach(() => {
    render(
        <BrowserRouter>
            <LoadingContext.Provider value={value}>
                <EpisodeCard podcastDetail={episode}/>
            </LoadingContext.Provider>
        </BrowserRouter>
    );
});

afterEach(() => {
    jest.resetAllMocks();
    cleanup();
});

describe('EpisodeCard', () => {
    
    test('EpisodeCard render', async () => {
        await waitFor(() => {
            expect(screen.getByTestId('EpisodeCard')).toBeInTheDocument();
        });
    });
});
