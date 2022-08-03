import { useEffect, useState } from "react";
import { getTopAnime } from "../../services/api-calls";
import { AnimeCard } from "../AnimeCard";
import "../../styles/listAndCardStyles.css";

export const HomePage = () => {
    const [animeList, setAnimeList] = useState(null);
    let topAnimeListSession = sessionStorage.getItem('topAnimeListSession');

    useEffect(() => {
        if (topAnimeListSession) {
            setAnimeList(JSON.parse(topAnimeListSession));
        } else {
            getTopAnime().then(fetchedData => {
                setAnimeList(fetchedData);
                sessionStorage.setItem('topAnimeListSession', JSON.stringify(fetchedData));
            });
        }
    }, [])


    return (
        <div className="pageWrapper">
            <p>Hey, check out the most favourite Animes, or search for a specific one.</p>
            {animeList &&
                <div className="animeList">
                    {animeList.map(anime => <AnimeCard key={anime.mal_id} anime={anime} />)}
                </div>
            }
        </div>
    );
}