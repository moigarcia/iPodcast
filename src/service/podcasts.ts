import Api from './base-http-service';

const getPodcastsList = async () => {
  const response = await Api.get('/us/rss/toppodcasts/limit=100/genre=1310/json');
  const {feed} = JSON.parse(response.data.contents)
  return feed.entry
};

const getPodcastById = async (podcastId: string) => {
  const response = await Api.get(`/lookup?id=${podcastId}`);
  const {results} = JSON.parse(response.data.contents)
  return results.entry
};

export { getPodcastsList, getPodcastById };
