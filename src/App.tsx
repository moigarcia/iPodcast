import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Dashboard, NotFound, Podcast, Episode } from './views';

import './App.scss';

const App = () => {
    const [width, setWidth] = useState(window.innerWidth);
    const handleWindowSizeChange = () => {
        setWidth(window.innerWidth);
    };
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);

        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        };
    }, [width]);

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/podcast/:podcastId" element={<Podcast />} />
                <Route path="/podcast/:podcastId/episode/:episodeId" element={<Episode />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
};

export default App;
