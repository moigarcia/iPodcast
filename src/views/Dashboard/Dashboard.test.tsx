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

jest.mock('../../service/podcasts');

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
