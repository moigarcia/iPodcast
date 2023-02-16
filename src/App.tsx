import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import { Dashboard, NotFound, Podcast, Episode } from './views';

import './App.scss';

const App = () => {
    const router = createBrowserRouter([
        {
          path: "/",
          element: <Dashboard />,
        },
        {
          path: "/podcast/:podcastId",
          element: <Podcast />,
        },
        {
          path: "/podcast/:podcastId/episode/:episodeId",
          element: <Episode />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
    
      ]);

    return (
        <div className="App" data-testid="App">
            <RouterProvider router={router} />
        </div>
    );
};

export default App;
