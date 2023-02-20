/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/await-async-query */
/* eslint-disable testing-library/no-wait-for-side-effects */
/* eslint-disable testing-library/prefer-presence-queries */
/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import { render, screen, waitFor, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import { LoadingContext } from '../../../contexts/LoadingContext';
import EpisodeCard from './EpisodeCard';
import { episode } from '../../../utils/testMocks';

const value = {
    loading: false,
    showLoading: jest.fn(),
    hideLoading: jest.fn(),
};

beforeEach(() => {
    render(
        <BrowserRouter>
            <LoadingContext.Provider value={value}>
                <EpisodeCard podcastDetail={episode} />
            </LoadingContext.Provider>
        </BrowserRouter>
    );
});

afterEach(() => {
    jest.resetAllMocks();
    cleanup();
});

interface HTMLAudioElementWithSrc extends HTMLAudioElement {
    src: string;
}

describe('EpisodeCard', () => {
    test('EpisodeCard render', async () => {
        await waitFor(() => {
            expect(screen.getByTestId('EpisodeCard')).toBeInTheDocument();

            const audioTag = screen.getByTestId('AudioTag');
            fireEvent(audioTag, new Event('loadeddata'));

            const sourceTag = screen.getByTestId('SourceTag') as HTMLAudioElementWithSrc;
            expect(sourceTag.src).toBe(episode.episodeUrl);
        });
    });
});
