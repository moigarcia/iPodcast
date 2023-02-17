import { useEffect, useState, useCallback } from 'react';
import { Podcast } from '../../@types/podcast';
import { getPodcastsList } from '../../service/podcasts';
import { useLoadingContext } from '../../contexts/LoadingContext';
import CardList from '../../components/Cards/CardsList/CardList';
import Search from '../../components/Search/Search';
import './Dashboard.scss';

const Dashboard = () => {
    const { hideLoading } = useLoadingContext();
    const [podcastList, setPodcastList] = useState<Podcast[]>([]);
    const [podcastAfterFilter, setPodcastAfterFilter] = useState<Podcast[]>([]);
    const [filterName, setFilterName] = useState('');
    const getPodcastList = useCallback(async () => {
        try {
            const response = await getPodcastsList();

            setPodcastList(response.entry);
            setPodcastAfterFilter(response.entry);
        } catch (error) {
            console.error(error);
        } finally {
            hideLoading();
        }
    }, [hideLoading]);

    const podcastToLoad = () => {
        let podcastAfterFilterTemp: Podcast[] = podcastList;

        if (filterName) {
            podcastAfterFilterTemp = podcastAfterFilterTemp.filter((item: Record<string, any>) => {
                for (const key in item) {
                    console.log(item);
                    if (key === 'im:artist' || key === 'title') {
                        if (item[key].label?.toLowerCase().indexOf(filterName.toLowerCase()) !== -1) {
                            return true;
                        }
                    }
                }
                return false;
            });
        }

        setPodcastAfterFilter(podcastAfterFilterTemp);
    };

    useEffect(() => {
        getPodcastList();
    }, [getPodcastList]);

    useEffect(() => {
        podcastToLoad();
    }, [filterName]);

    const handleSearch = (value: string) => {
        setFilterName(value);
    };

    return (
        <div className="Dashboard" data-testid="Dashboard">
            <div className="Dashboard__container" data-testid="Dashboard">
                <Search total={podcastAfterFilter.length} setFilterName={handleSearch} />
                {podcastAfterFilter.map((podcast, index) => (
                    <CardList podcast={podcast} key={index} />
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
