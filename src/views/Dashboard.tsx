import { useEffect, useState } from "react";
import { Podcast } from "../@types/podcast";
import {getPodcastsList} from '../service/podcasts'

const Dashboard = () => {
    const [podcastList, setPodcastList] = useState<Podcast[]>([])

    const getPodcastList =  async () => {
        const response = await getPodcastsList()
      
        setPodcastList(response.entry)
    }

    useEffect(() => {
        getPodcastList()
    }, [])

    return <div data-testid="Dashboard">{podcastList.map(item => item.title.label)}</div>;
};

export default Dashboard;
