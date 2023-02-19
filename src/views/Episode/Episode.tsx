import { useLocation, useNavigate } from 'react-router-dom';
import EpisodeCard from '../../components/Cards/EpisodeCard/EpisodeCard';
import PodcastCard from '../../components/Cards/PodcastCard/PodcastCard';
import { Podcast } from '../../@types/podcast';
import './Episode.scss';

const Episode = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { podcastDetail, podcast } = location.state;

    const onNavigate = (route: string, podcast: Podcast) => {
        navigate(route, { state: podcast });
    };

    return (
        <div className="Episode" data-testid="Episode">
            {podcastDetail && (
                <div className="Episode__container">
                    <PodcastCard podcast={podcast} onNavigate={onNavigate} />
                    <EpisodeCard podcastDetail={podcastDetail} />
                </div>
            )}
        </div>
    );
};

export default Episode;
