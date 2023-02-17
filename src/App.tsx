import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routesConfig from './routes/routesConfig';
import './App.scss';


const App = () => {
  
    const router = createBrowserRouter(routesConfig);

    return (
        <div className="App">
            <RouterProvider router={router} />
        </div>
    );
};

export default App;
