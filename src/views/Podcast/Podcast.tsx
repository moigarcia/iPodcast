import { useState, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useIsMountedRef from '../../hooks/useIsMounted';
import { getPodcastById } from '../../service/podcasts';
import { useLoadingContext } from '../../contexts/LoadingContext';
import './Podcast.scss'

const Podcast = () => {
    const location = useLocation()
    const { hideLoading } = useLoadingContext();
    const isMountedRef = useIsMountedRef();
    const [podcastData, setPodcastData] = useState(null);

    const getPodcast = useCallback(async () => {
        try {
            if (isMountedRef.current) {
                const response = await getPodcastById(location.pathname);
                setPodcastData(response);
            }
        } catch (error) {
            console.error(error);
        } finally {
            hideLoading();
        }
    }, [hideLoading, isMountedRef]);

    useEffect(() => {
        if (isMountedRef.current) {
            getPodcast();
        }
    }, [getPodcast, isMountedRef]);

    return (
        <div data-testid="Podcast">
            <div className="Podcast__container">Hola podcast</div>
        </div>
    );
};

export default Podcast;
