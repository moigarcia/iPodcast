import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { LoadingContext } from './contexts/LoadingContext';
import routesConfig from './routes/routesConfig';

describe('App', () => {
    afterEach(() => cleanup());
    const value = {
      loading: false,
      showLoading: () => true,
      hideLoading: () => false,
    }
    test('Navbar Should be render', async () => {
        const router = createMemoryRouter(routesConfig, {
            initialEntries: ['/'],
        });

        render(
            <LoadingContext.Provider value={value}>
                <RouterProvider router={router} />
            </LoadingContext.Provider>
        );

        const navbarElement = screen.getByTestId('Navbar');
        expect(navbarElement).toBeTruthy();
    });

    test('navigates to Dashboard', () => {
        const router = createMemoryRouter(routesConfig, {
            initialEntries: ['/'],
        });

        render(
            <LoadingContext.Provider value={value}>
                <RouterProvider router={router} />
            </LoadingContext.Provider>
        );

        const navbarElement = screen.getByTestId('Navbar');
        expect(navbarElement).toBeTruthy();

        const dashboardElement = screen.getByTestId('Dashboard');
        expect(dashboardElement).toBeTruthy();
    });

    test('navigates to Podcast', () => {
        const router = createMemoryRouter(routesConfig, {
            initialEntries: ['/podcast/2'],
        });

        render(
            <LoadingContext.Provider value={value}>
                <RouterProvider router={router} />
            </LoadingContext.Provider>
        );

        const podcastElement = screen.getByTestId('Podcast');
        expect(podcastElement).toBeTruthy();
    });

    test('navigates to Episode', () => {
        const router = createMemoryRouter(routesConfig, {
            initialEntries: ['/podcast/2/episode/1'],
        });

        render(
            <LoadingContext.Provider value={value}>
                <RouterProvider router={router} />
            </LoadingContext.Provider>
        );

        const podcastElement = screen.getByTestId('Episode');
        expect(podcastElement).toBeTruthy();
    });

    test('navigates to NotFound', () => {
        const router = createMemoryRouter(routesConfig, {
            initialEntries: ['/test'],
        });

        render(
            <LoadingContext.Provider value={value}>
                <RouterProvider router={router} />
            </LoadingContext.Provider>
        );

        const podcastElement = screen.getByTestId('NotFound');
        expect(podcastElement).toBeTruthy();
    });
});
