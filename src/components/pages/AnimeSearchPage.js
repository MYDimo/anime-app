import { useEffect, useState } from "react";
import { searchAnime } from "../../utils/api-calls";
import { AnimeCard } from "../AnimeCard";
import { useLocation } from 'react-router-dom';


export const AnimeSearchPage = () => {
    const location = useLocation();
    const [animeList, setAnimeList] = useState(null);
    const [searchAnimeString, setSearchAnime] = useState('');
    let searchAnimeListSession = sessionStorage.getItem('searchAnimeListSession');

    useEffect(() => {
        if (searchAnimeListSession) {
            setAnimeList(JSON.parse(searchAnimeListSession));
        }

        if (location.state){
            let { passedSearchString } = location.state;
            setSearchAnime(passedSearchString);
            console.log(passedSearchString);
        }
    }, []) //searchAnimeString -> make dependency BUT be careful with on change button

    const searchHandler = () => {
        searchAnime(searchAnimeString).then(fetchedData => {
            setAnimeList(fetchedData);
            sessionStorage.setItem('searchAnimeListSession', JSON.stringify(fetchedData));
        })
    }

    return (
        <div className="pageWrapper">
            <h1>Hey, check out the most favourite Animes, or search for a specific one.</h1>
            <input type="text" placeholder="search anime" onChange={(e) => setSearchAnime(e.target.value)} />
            <button onClick={searchHandler}>Search</button>
            {animeList &&
                <div className="animeList">
                    {animeList.map(anime => <AnimeCard key={anime.mal_id} anime={anime} />)}
                </div>
            }
        </div>
    );
}