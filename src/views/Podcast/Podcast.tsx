import { useState, useCallback, useEffect, Key } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import useIsMountedRef from '../../hooks/useIsMounted';
import { PodcastDetail } from '../../@types/podcastDetail';
import { getPodcastById } from '../../service/podcasts';
import { useLoadingContext } from '../../contexts/LoadingContext';
import useLocalStorage from '../../hooks/useLocalStorage';
import { getTomorrow, getDuration, formatDate } from '../../utils/time';
import PodcastCard from '../../components/Cards/PodcastCard/PodcastCard';
import './Podcast.scss';
import { Podcast } from '../../@types/podcast';

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
    }, [getPodcast, isMountedRef, showLoading]);

    const onNavigate = (route: string, podcastDetail: PodcastDetail, podcast: Podcast) => {
        navigate(route, { state: { podcastDetail, podcast } });
    };

    return (
        <div className="Podcast" data-testid="Podcast">
            <div className="Podcast__container">
                <PodcastCard podcast={location.state} />
                <div className="Podcast__container__episodes">
                    <div className="Podcast__container__episodes__total">Episodes: {podcastData?.length - 1}</div>
                    <div className="Podcast__container__episodes__list">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Title</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Duration</th>
                                </tr>
                            </thead>
                            <tbody>
                                {podcastData?.map(
                                    (
                                        episode: PodcastDetail,
                                        index: Key
                                    ) => {
                                        if (index) {
                                            return (
                                                <tr key={index}>
                                                    <td data-testid="Episode"
                                                        onClick={() =>
                                                            onNavigate(
                                                                `/podcast/${location.state.id.attributes['im:id']}/episode/${episode.trackId}`,
                                                                episode,
                                                                location.state
                                                            )
                                                        }
                                                    >
                                                        {episode.trackName}
                                                    </td>
                                                    <td>{formatDate(episode.releaseDate)}</td>
                                                    <td>{getDuration(episode.trackTimeMillis)}</td>
                                                </tr>
                                            );
                                        }
                                    }
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PodcastView;
