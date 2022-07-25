export const getTopAnime = async () => {
    const response = await fetch("https://api.jikan.moe/v4/top/anime?type=tv&filter=bypopularity&limit=4");
    const receivedData = await response.json();

    return receivedData.data;
}

export const getAnimeDetails = async (anime_id) => {
    const response = await fetch(`https://api.jikan.moe/v4/anime/${anime_id}`);
    const receivedData = await response.json();

    return receivedData.data;
}