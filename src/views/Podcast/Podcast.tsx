import { useState, useCallback, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import useIsMountedRef from '../../hooks/useIsMounted';
import { PodcastDetail } from '../../@types/podcastDetail';
import { getPodcastById } from '../../service/podcasts';
import { useLoadingContext } from '../../contexts/LoadingContext';
import useLocalStorage from '../../hooks/useLocalStorage';
import { getTomorrow } from '../../utils/time';
import PodcastCard from '../../components/Cards/PodcastCard/PodcastCard';
import { Podcast } from '../../@types/podcast';
import './Podcast.scss';
import EpisodeList from '../../components/Episodes/EpisodesList';

const PodcastView = () => {
    const params = useParams();
    const location = useLocation();
    const { hideLoading, showLoading } = useLoadingContext();
    const isMountedRef = useIsMountedRef();
    const [podcastData, setPodcastData] = useState(null);
    const [storagePodcast, setStoragePodcast] = useLocalStorage(params.podcastId, null);
    const navigate = useNavigate();

    const getPodcast = useCallback(async () => {
        try {
            if (isMountedRef.current) {
                let response: PodcastDetail;
                const today = Math.round(Date.now() / 1000);
                if (storagePodcast && today < Number(storagePodcast[0].date)) {
                    response = storagePodcast;
                } else {
                    const dateTimestamp = getTomorrow();
                    response = await getPodcastById(params.podcastId);
                    response[0].date = dateTimestamp;
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
            showLoading(true);
            getPodcast();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onNavigate = (route: string, podcastDetail: PodcastDetail, podcast: Podcast) => {
        navigate(route, { state: { podcastDetail, podcast } });
        showLoading(true);
    };

    return (
        <div className="Podcast" data-testid="Podcast">
            {podcastData && (
                <div className="Podcast__container">
                    <PodcastCard podcast={location.state} />
                    <EpisodeList podcastData={podcastData} onNavigate={onNavigate} location={location} />
                </div>
            )}
        </div>
    );
};

export default PodcastView;
