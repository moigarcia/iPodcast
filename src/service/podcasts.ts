import Api from './base-http-service';

const getPodcastsList = () => {
  return Api.get('/us/rss/toppodcasts/limit=100/genre=1310/json');
};

const getPodcastById = (podcastId: string) => {
  return Api.get(`/lookup?id=${podcastId}`);
};

export { getPodcastsList, getPodcastById };
