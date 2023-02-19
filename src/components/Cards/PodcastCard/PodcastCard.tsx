import { Podcast } from '../../../@types/podcast';
import './PodcastCard.scss';

type Prop = {
    podcast: Podcast;
};
const PodcastCard = ({ podcast }: Prop) => (
    <div className="PodcastCard">
        <img alt="podcast=img" src={podcast['im:image'][2].label} />
        <div className="PodcastCard__title">
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
