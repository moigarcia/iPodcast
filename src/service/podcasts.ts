import Api from './base-http-service';

const getPodcastsList = async () => {
  const response = await Api.get('/us/rss/toppodcasts/limit=100/genre=1310/json');
  const {feed} = JSON.parse(response.data.contents)
  return feed
};

const getPodcastById = async (podcastId: string) => {
  const response = await Api.get(`/lookup?id=${podcastId}`);
  const {feed} = JSON.parse(response.data.contents)
  return feed
};

export { getPodcastsList, getPodcastById };
