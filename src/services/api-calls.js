export const getTopAnime = async () => {
    const response = await fetch("https://api.jikan.moe/v4/top/anime?type=tv&filter=favorite&limit=20");
    const receivedData = await response.json();

    return receivedData.data;
}

export const getAnimeDetails = async (anime_id) => {
    const response = await fetch(`https://api.jikan.moe/v4/anime/${anime_id}`);
    const receivedData = await response.json();

    return receivedData.data;
}

export const getAnimeCharacters = async (anime_id) => {
    const response = await fetch(`https://api.jikan.moe/v4/anime/${anime_id}/characters`);
    const receivedData = await response.json();

    return receivedData.data;
}

export const searchAnime = async (searchQuery) => {
    const response = await fetch(`https://api.jikan.moe/v4/anime?q=${searchQuery}&type=tv`);
    const receivedData = await response.json();

    return receivedData.data;
}