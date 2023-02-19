import DOMPurify from 'dompurify';
import { Episode } from '../../../@types/episode';
import { useLoadingContext } from '../../../contexts/LoadingContext';
import './EpisodeCard.scss';

type Props = {
    podcastDetail: Episode;
};
const EpisodeCard = ({ podcastDetail }: Props) => {
    const { hideLoading } = useLoadingContext();
    const sanitizeDescription = DOMPurify.sanitize(podcastDetail.description);
    return (
    <div className="EpisodeCard" data-testid="EpisodeCard">
    <div className="EpisodeCard__box">
        <h4>{podcastDetail.trackName}</h4>
        <p dangerouslySetInnerHTML={{ __html: sanitizeDescription }}>{}</p>
        <audio controls onLoadedData={() =>  hideLoading()}>
            <source src={podcastDetail.episodeUrl} type={`audio/${podcastDetail.episodeFileExtension}`}/>
        </audio>
    </div>
</div>
)
    };

export default EpisodeCard;
