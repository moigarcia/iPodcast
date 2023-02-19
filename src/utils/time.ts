const getTomorrow = () => {
    const oneDayMore = new Date();
    oneDayMore.setDate(oneDayMore.getDate() + 1);
    const dateTimestamp = Math.round(oneDayMore.getTime() / 1000);
    return dateTimestamp;
};

const getDuration = (timestamp: number) => {
    const date = new Date(timestamp);
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};
const formatDate = (dateRealease: string) => {
    const date = new Date(dateRealease);

    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getUTCFullYear();

    return `${day}/${month}/${year}`;
};

export { getTomorrow, getDuration, formatDate };
