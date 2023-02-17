import { Outlet } from 'react-router-dom';
import { Dashboard, NotFound, Podcast, Episode } from '../views';
import Navbar from '../components/Navbar/Navbar';


const routesConfig = [
  {
      path: '/',
      element: (
        <>
            <Navbar />
            <Outlet />
        </>
      ),
      errorElement: <NotFound />,
      children: [
          {
              path: '/',
              element: <Dashboard />,
          },
          {
              path: '/podcast/:podcastId',
              element: <Podcast />,
          },
          {
              path: '/podcast/:podcastId/episode/:episodeId',
              element: <Episode />,
          }
      ],
  },
];
  
  export default routesConfig;