import { useNavigate } from 'react-router-dom';
import { Podcast } from '../../../@types/podcast';
import './CardList.scss'

type Prop = {
    podcast: Podcast;
};
const CardList = ({ podcast }: Prop) => {
    const navigate = useNavigate();

    return (
        <div className="CardList" data-testid="CardList">
            <div className="CardList__box" onClick={() => navigate(`/podcast/${podcast.id.attributes['im:id']}`)}>
                <div className="CardList__box__absolute">
                    <img src={podcast['im:image'][2].label} alt="img-podcast" />
                    <h4>{podcast.title.label.toUpperCase()}</h4>
                    <span>Author: {podcast['im:artist'].label}</span>
                </div>
            </div>
        </div>
    );
}

export default CardList;
