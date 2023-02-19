const getTomorrow = () => {
    const oneDayMore = new Date();
    oneDayMore.setDate(oneDayMore.getDate() + 1);
    const dateTimestamp = Math.round(oneDayMore.getTime() / 1000);
    return dateTimestamp;
};

export default  getTomorrow;
