/* eslint-disable jest/no-conditional-expect */
/* eslint-disable testing-library/no-render-in-setup */
/* eslint-disable testing-library/await-async-query */
/* eslint-disable testing-library/no-wait-for-side-effects */
/* eslint-disable testing-library/prefer-presence-queries */
/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import { render, screen, waitFor, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import PodcastCard from './PodcastCard';
import { LoadingContext } from '../../../contexts/LoadingContext';
import { podcast } from '../../../utils/testMocks';

const value = {
    loading: false,
    showLoading: jest.fn(),
    hideLoading: jest.fn(),
};

const onNavigate = jest.fn();

beforeEach(() => {
    render(
        <BrowserRouter>
            <LoadingContext.Provider value={value}>
                <PodcastCard podcast={podcast} onNavigate={onNavigate} />
            </LoadingContext.Provider>
        </BrowserRouter>
    );
});

afterEach(() => {
    jest.resetAllMocks();
    cleanup();
});

describe('PodcastCard', () => {
    test('PodcastCard render', async () => {
        await waitFor(() => {
            expect(screen.getByTestId('PodcastCard')).toBeInTheDocument();
        });
    });
    test('renders PodcastCard title', () => {
        expect(screen.getByTestId('PodcastCardTitle')).toBeInTheDocument();
        expect(screen.getByTestId('PodcastCardTitle')).toHaveClass('PodcastCard__title');
        expect(screen.getByTestId('PodcastCardTitle')).toHaveStyle('cursor: pointer');

        if (onNavigate) {
            fireEvent.click(screen.getByTestId('PodcastCardTitle'));
            expect(onNavigate).toHaveBeenCalledWith(`/podcast/${podcast.id.attributes['im:id']}`, podcast);
        }
    });
});
