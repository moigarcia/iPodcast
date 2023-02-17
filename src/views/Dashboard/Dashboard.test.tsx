import { render, screen, waitFor } from '@testing-library/react';
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
    showLoading: () => true,
    hideLoading: () => false,
};
describe('Dashboard', () => {
    test('renders podcast titles', async () => {
        (getPodcastsList as jest.MockedFunction<typeof getPodcastsList>).mockResolvedValue({
            entry: podcastList,
        });

        render(
            <LoadingContext.Provider value={value}>
                <Dashboard />
            </LoadingContext.Provider>
        );

        await waitFor(() => {
            const titles = podcastList.map((podcast) => podcast.title.label);
            const podcastTitles = screen.getAllByText(titles[0]);
            expect(podcastTitles).toHaveLength(podcastList.length);
        });
    });
});
test('Error getPodcastList', async () => {
    const consoleSpy = jest.spyOn(console, 'error');
    (getPodcastsList as jest.MockedFunction<typeof getPodcastsList>).mockRejectedValue({
        message: 'Error 1',
    });

    render(
        <LoadingContext.Provider value={value}>
            <Dashboard />
        </LoadingContext.Provider>
    );

    await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalled();
    });

    consoleSpy.mockRestore();
});
test('Should be render CardList', async () => {
    (getPodcastsList as jest.MockedFunction<typeof getPodcastsList>).mockResolvedValue({
        entry: podcastList,
    });

    render(
        <LoadingContext.Provider value={value}>
            <Dashboard />
        </LoadingContext.Provider>
    );

    await waitFor(() => {
        const cardElement = screen.getByTestId('CardList');
        expect(cardElement).toBeTruthy();
    });
});
