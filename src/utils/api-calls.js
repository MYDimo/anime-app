export const getTopAnime = async () => {
    const response = await fetch("https://api.jikan.moe/v4/top/anime?type=tv&filter=bypopularity&limit=4");
    const data = await response.json();

    return data.data;
}