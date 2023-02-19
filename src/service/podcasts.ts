const getPodcastsList = async () => {
    const response = await fetch(
        `https://api.allorigins.win/get?url=${encodeURIComponent(`https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json`)}`
    );

    const data = await response.json();
    const { feed } = JSON.parse(data.contents);
    return feed.entry;
};

const getPodcastById = async (podcastId: string) => {
    const response = await fetch(
        `https://api.allorigins.win/get?url=${encodeURIComponent(
            `https://itunes.apple.com/lookup?id=${podcastId}&country=US&media=podcast&entity=podcastEpisode`
        )}`
    );

    const data = await response.json();
    const { results } = JSON.parse(data.contents);
    return results;
};

export { getPodcastsList, getPodcastById };
