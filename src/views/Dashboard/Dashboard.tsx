import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Podcast } from '../../@types/podcast';
import { getPodcastsList } from '../../service/podcasts';
import { useLoadingContext } from '../../contexts/LoadingContext';
import CardList from '../../components/Cards/CardsList/CardList';
import Search from '../../components/Search/Search';
import useIsMountedRef from '../../hooks/useIsMounted';
import useLocalStorage from '../../hooks/useLocalStorage';
import { getTomorrow } from '../../utils/time';
import './Dashboard.scss';

const Dashboard = () => {
    const { hideLoading, showLoading } = useLoadingContext();
    const [podcastList, setPodcastList] = useState<Podcast[]>([]);
    const [podcastAfterFilter, setPodcastAfterFilter] = useState<Podcast[]>([]);
    const [filterName, setFilterName] = useState('');
    const isMountedRef = useIsMountedRef();
    const navigate = useNavigate();
    const [date, setDate] = useLocalStorage('dateDashboard', null);
    const [storageList, setStorageList] = useLocalStorage('storageList', null);

    const getPodcastList = useCallback(async () => {
        try {
            if (isMountedRef.current) {
                let response: Podcast[];
                const today = Math.round(Date.now() / 1000);

                if (today > Number(date)) {
                    response = await getPodcastsList();
                    setStorageList(response);
                    const dateTimestamp = getTomorrow();
                    setDate(dateTimestamp);
                } else {
                    response = storageList;
                }

                setPodcastList(response);
                setPodcastAfterFilter(response);
            }
        } catch (error) {
            console.error(error);
        } finally {
            hideLoading();
        }
    }, [date, hideLoading, isMountedRef, setDate, setStorageList, storageList]);

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
            showLoading(true);
            getPodcastList();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        podcastToLoad();
    }, [filterName, podcastToLoad]);

    const handleSearch = (value: string) => {
        setFilterName(value);
    };

    const onNavigate = (route: string, podcast: Podcast) => {
        navigate(route, { state: podcast });
    };

    return (
        <div className="Dashboard" data-testid="Dashboard">
            {podcastAfterFilter && (
                <div className="Dashboard__container">
                    <Search total={podcastAfterFilter?.length} setFilterName={handleSearch} />
                    {podcastAfterFilter?.map((podcast, index) => (
                        <CardList podcast={podcast} key={index} onNavigate={onNavigate} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;
