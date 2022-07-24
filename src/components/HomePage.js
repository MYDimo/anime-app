import { useEffect, useState } from "react";
import { getTopAnime } from "../utils/api-calls";
import { AnimeCard } from "./AnimeCard";

export const HomePage = () => {
    const [topAnimeList, settopAnimeList] = useState(null);

    useEffect(() => {
        getTopAnime().then(data => {
            settopAnimeList(data)
        });
    }, [])
    
    return (
        <div className="pageWrapper">
            <h1>Hey, check out the top Animes below:</h1>
            {topAnimeList && 
                <div className="animeList">
                    {topAnimeList.map(anime => <AnimeCard key={anime.mal_id} anime={anime} />)}
                </div>
            }
        </div>
    );
}