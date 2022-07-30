import { useEffect, useState } from "react";
import { getTopAnime } from "../utils/api-calls";
import { AnimeCard } from "./AnimeCard";
import "../styles/listAndCardStyles.css"

export const HomePage = () => {
    const [topAnimeList, setTopAnimeList] = useState(null);
    let topAnimeListSession = sessionStorage.getItem('topAnimeListSession');

    useEffect(() => {
        //if seesion storage is not empty
        if (topAnimeListSession) {
            setTopAnimeList(JSON.parse(topAnimeListSession))
        } else {
            getTopAnime().then(data => {
                setTopAnimeList(data);
                console.log(data);
                sessionStorage.setItem('topAnimeListSession', JSON.stringify(data));
            });
        }
    }, [])
    
    return (
        <div className="pageWrapper">
            <h1>Hey, check out the most favourite Animes, or search for a specific one.</h1>
            <input type="text" placeholder="search anime"/>
            <button>Search</button>
            {topAnimeList && 
                <div className="animeList">
                    {topAnimeList.map(anime => <AnimeCard key={anime.mal_id} anime={anime} />)}
                </div>
            }
        </div>
    );
}