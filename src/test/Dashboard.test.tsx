/* eslint-disable testing-library/prefer-screen-queries */
import { render, waitFor } from '@testing-library/react';
import Dashboard from '../views/Dashboard';
import { getPodcastsList } from '../service/podcasts';

jest.mock('../service/podcasts');

const mockedPodcastList = {
  feed: {
    entry: [
      { title: { label: 'Podcast 1' } },
      { title: { label: 'Podcast 2' } },
      { title: { label: 'Podcast 3' } },
    ],
  },
};

describe('Dashboard view', () => {
  it('renders the list of podcasts', async () => {
    (getPodcastsList as jest.MockedFunction<typeof getPodcastsList>).mockResolvedValueOnce({
      data: {
        contents: JSON.stringify(mockedPodcastList),
      },
    });

    const { getByText } = render(<Dashboard />);

    await waitFor(() => {
      expect(getPodcastsList).toHaveBeenCalledTimes(1);
    });

    expect(getByText('Podcast 1')).toBeInTheDocument();
    expect(getByText('Podcast 2')).toBeInTheDocument();
    expect(getByText('Podcast 3')).toBeInTheDocument();
  });
});