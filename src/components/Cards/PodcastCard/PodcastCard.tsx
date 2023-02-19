import { Podcast } from '../../../@types/podcast';
import './PodcastCard.scss';

type Props = {
    podcast: Podcast;
    onNavigate?: (route: string, podcast: Podcast) => void;
};
const PodcastCard = ({ podcast, onNavigate }: Props) => (
    <div className="PodcastCard" data-testid="PodcastCard">
        <img alt="podcast=img" src={podcast['im:image'][2].label} />
        <div className="PodcastCard__title" data-testid="PodcastCardTitle" style={{cursor: onNavigate ? 'pointer' : 'default'}} onClick={() => onNavigate && onNavigate(`/podcast/${podcast.id.attributes['im:id']}`, podcast)}>
            <h4>{podcast.title.label}</h4>
            <span>By {podcast['im:artist'].label}</span>
        </div>
        <div className="PodcastCard__description">
            <h5>Desciption:</h5>
            <p>{podcast.summary.label}</p>
        </div>
    </div>
);

export default PodcastCard;
