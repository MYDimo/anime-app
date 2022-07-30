import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getAnimeCharacters, getAnimeDetails } from '../utils/api-calls';
import CharacterCard from './CharacterCard';
import "../styles/listAndCardStyles.css"


export const AnimeDetailsPage = () => {
    const location = useLocation();
    const { anime_id } = location.state;
    const { anime_title } = location.state;
    const [animeDetailsData, setAnimeDetailsData] = useState(null);
    const [charactersData, setCharactersData] = useState(null);
    
    useEffect(() => {
        getAnimeDetails(anime_id).then(data => {
            setAnimeDetailsData(data);
        });
    }, [])

    const clickHandler = () => {
        if (!charactersData) {
            getAnimeCharacters(anime_id).then(data => {
                setCharactersData(data);
            });
        } else {
            setCharactersData(null);
        }
    }

    return (
        <div className="pageWrapper">
            <h1>This is {anime_title} Details Page</h1>
            {animeDetailsData &&
                <img src={animeDetailsData.images.jpg.large_image_url} alt={`${anime_title} cover img`} />
            }
            <button onClick={clickHandler}>
                {!charactersData
                    ? 'Show anime characters'
                    : 'Hide anime characters'
                }
            </button>
            {charactersData && 
                <div className="charactersList">
                    {charactersData.map(x => <CharacterCard key={x.character.mal_id} characterData={x}/>)}
                </div>
            }
        </div>
    );
}