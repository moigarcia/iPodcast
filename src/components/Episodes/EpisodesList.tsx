import { Key } from 'react';

import { PodcastDetail } from '../../@types/podcastDetail';
import { Podcast } from '../../@types/podcast';

import { getDuration, formatDate } from '../../utils/time';

import './EpisodeList.scss';

type Props = {
    podcastData: PodcastDetail[];
    onNavigate?: (route: string, podcastDetail: PodcastDetail, podcast: Podcast) => void;
    location: any;
};

const EpisodeList = ({ podcastData, onNavigate, location }: Props) => {
    return (
        <div className="EpisodesList">
            <div className="EpisodesList__total">
                <h4>Episodes: {podcastData?.length - 1}</h4>
            </div>
            <div className="EpisodesList__list">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Date</th>
                            <th scope="col">Duration</th>
                        </tr>
                    </thead>
                    <tbody>
                        {podcastData?.map((episode: PodcastDetail, index: Key) => {
                            if (index) {
                                return (
                                    <tr key={index}>
                                        <td
                                            data-testid="Episode"
                                            onClick={() =>
                                                onNavigate(
                                                    `/podcast/${location.state.id.attributes['im:id']}/episode/${episode.trackId}`,
                                                    episode,
                                                    location.state
                                                )
                                            }
                                        >
                                            {episode.trackName}
                                        </td>
                                        <td>{formatDate(episode.releaseDate)}</td>
                                        <td>{getDuration(episode.trackTimeMillis)}</td>
                                    </tr>
                                );
                            }
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EpisodeList;
