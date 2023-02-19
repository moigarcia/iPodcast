import { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useIsMountedRef from '../../hooks/useIsMounted';
import { PodcastDetail } from '../../@types/podcastDetail';
import { getPodcastById } from '../../service/podcasts';
import { useLoadingContext } from '../../contexts/LoadingContext';
import useLocalStorage from '../../hooks/useLocalStorage';
import getTomorrow from '../../utils/time';
import './Podcast.scss';

const PodcastView = () => {
    const params = useParams();
    const { hideLoading } = useLoadingContext();
    const isMountedRef = useIsMountedRef();
    const [podcastData, setPodcastData] = useState(null);
    const [storagePodcast, setStoragePodcast] = useLocalStorage(params.podcastId, null);

    const getPodcast = useCallback(async () => {
        try {
            if (isMountedRef.current) {
                let response: PodcastDetail;
                const today = Math.round(Date.now() / 1000);
                if (storagePodcast && today < Number(storagePodcast.date)) {
                    response = storagePodcast;
                } else {
                    const dateTimestamp = getTomorrow();
                    response = await getPodcastById(params.podcastId);
                    response.date = dateTimestamp
                    setStoragePodcast(response);
                }

                setPodcastData(response);
            }
        } catch (error) {
            console.error(error);
        } finally {
            hideLoading();
        }
    }, [hideLoading, isMountedRef, params.podcastId, setStoragePodcast, storagePodcast]);

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

export default PodcastView;
