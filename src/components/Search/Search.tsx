import { Podcast } from '../../@types/podcast';
import Button from '../assets/button/Button';
import './Search.scss';

type Props = {
    total: number;
    setFilterName: (value: string) => void
}

const Search = ({total, setFilterName}: Props) => {
    

    return (
        <div className="Search" data-testid="Search">
            <span className='Search__badge'>{total}</span>
            <input onChange={(e) => setFilterName(e.target.value)} placeholder="Filter podcast..." />
        </div>
    );
};

export default Search;
