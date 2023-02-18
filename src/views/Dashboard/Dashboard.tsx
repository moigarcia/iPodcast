import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Podcast } from '../../@types/podcast';
import { getPodcastsList } from '../../service/podcasts';
import { useLoadingContext } from '../../contexts/LoadingContext';
import CardList from '../../components/Cards/CardsList/CardList';
import Search from '../../components/Search/Search';
import useIsMountedRef from '../../hooks/useIsMounted';
import './Dashboard.scss';

const Dashboard = () => {
    const { hideLoading } = useLoadingContext();
    const [podcastList, setPodcastList] = useState<Podcast[]>([]);
    const [podcastAfterFilter, setPodcastAfterFilter] = useState<Podcast[]>([]);
    const [filterName, setFilterName] = useState('');
    const isMountedRef = useIsMountedRef();
    const navigate = useNavigate();

    const getPodcastList = useCallback(async () => {
        try {
            if (isMountedRef.current) {
                const response = await getPodcastsList();

                setPodcastList(response);
                setPodcastAfterFilter(response);
            }
        } catch (error) {
            console.error(error);
        } finally {
            hideLoading();
        }
    }, [hideLoading, isMountedRef]);

    const podcastToLoad = useCallback(async () => {
        let podcastAfterFilterTemp: Podcast[] = podcastList;

        if (filterName) {
            podcastAfterFilterTemp = podcastAfterFilterTemp.filter((item: Record<string, any>) => {
                for (const key in item) {
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
    }, [filterName, podcastList]);

    useEffect(() => {
        if (isMountedRef.current) {
            getPodcastList();
        }
    }, [getPodcastList, isMountedRef]);

    useEffect(() => {
        podcastToLoad();
    }, [filterName, podcastToLoad]);

    const handleSearch = (value: string) => {
        setFilterName(value);
    };

    return (
        <div className="Dashboard" data-testid="Dashboard">
            <div className="Dashboard__container">
                <Search total={podcastAfterFilter.length} setFilterName={handleSearch} />
                {podcastAfterFilter.map((podcast, index) => (
                    <CardList podcast={podcast} key={index} navigate={navigate} />
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
