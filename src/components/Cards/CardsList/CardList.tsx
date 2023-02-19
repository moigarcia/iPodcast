import { Podcast } from '../../../@types/podcast';
import './CardList.scss';

type Prop = {
    podcast: Podcast;
    onNavigate: (route: string, podcast: Podcast) => void;
};
const CardList = ({ podcast, onNavigate }: Prop) => (
    <div className="CardList" data-testid="CardList">
        <div className="CardList__box" data-testid="CardList__box" onClick={() => onNavigate(`/podcast/${podcast.id.attributes['im:id']}`, podcast)}>
            <div className="CardList__box__absolute">
                <img src={podcast['im:image'][2].label} alt="img-podcast" />
                <h6>{podcast.title.label.toUpperCase()}</h6>
                <span>Author: {podcast['im:artist'].label}</span>
            </div>
        </div>
    </div>
);

export default CardList;
