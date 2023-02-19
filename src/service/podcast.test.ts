import { getPodcastsList, getPodcastById } from './podcasts';

describe('podcast api', () => {
    test('getPodcastsList', async () => {
        const mockResponse = {
            feed: {
                entry: [
                    {
                        id: { label: '1' },
                        title: { label: 'Test 1' },
                    },
                    {
                        id: { label: '2' },
                        title: { label: 'Test 2' },
                    },
                ],
            },
        };

        global.fetch = jest.fn().mockResolvedValueOnce({
            json: async () => ({
                contents: JSON.stringify(mockResponse),
            }),
        });

        const podcasts = await getPodcastsList();

        expect(podcasts.length).toBe(2);
        expect(podcasts[0].id.label).toBe('1');
        expect(podcasts[0].title.label).toBe('Test 1');
        expect(podcasts[1].id.label).toBe('2');
        expect(podcasts[1].title.label).toBe('Test 2');
    });

    test('getPodcastById', async () => {
        const mockResponse = {
            results: [
                {
                    id: '1',
                    title: { label: 'Test 1' },
                },
            ],
        };

        global.fetch = jest.fn().mockResolvedValueOnce({
            json: async () => ({
                contents: JSON.stringify(mockResponse),
            }),
        });

        const podcasts = await getPodcastById('1');

        expect(podcasts.length).toBe(1);
        expect(podcasts[0].id).toBe('1');
        expect(podcasts[0].title.label).toBe('Test 1');
    });
});
