import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getAnimeCharacters, getAnimeDetails } from '../../services/api-calls';
import CharacterCard from '../CharacterCard';
import "../../styles/listAndCardStyles.css"


export const AnimeDetailsPage = () => {
    const location = useLocation();
    const { anime_id } = location.state;
    const { anime_title } = location.state;
    const [animeDetailsData, setAnimeDetailsData] = useState(null);
    const [charactersData, setCharactersData] = useState({
        initialData: null,
        searchData: null
    });
    
    useEffect(() => {
        getAnimeDetails(anime_id).then(data => {
            setAnimeDetailsData(data);
        });
    }, [])

    const clickHandler = () => {
        if (!charactersData.initialData) {
            getAnimeCharacters(anime_id).then(fetchedData => {
                setCharactersData({
                    initialData: fetchedData,
                    searchData: fetchedData
                });
            });
        } else {
            setCharactersData({
                initialData: null,
                searchData: null
            });
        }
    }

    const searchCharHandler = (e) => {
        let charName = e.target.value;
        setCharactersData(oldData => ({
            ...oldData, 
            searchData: oldData.initialData.filter(x => x.character.name.includes(charName))
        }));
    }

    return (
        <div className="pageWrapper">
            <h1>This is {anime_title} Details Page</h1>
            {animeDetailsData &&
                <img src={animeDetailsData.images.jpg.large_image_url} alt={`${anime_title} cover img`} />
            }
            <button onClick={clickHandler}>
                {!charactersData.initialData
                    ? 'Show anime characters'
                    : 'Hide anime characters'
                }
            </button>
            {charactersData.initialData && 
                <div>
                    <input type="text" placeholder='Search character' onChange={searchCharHandler}/>
                    <div className="charactersList">
                        {charactersData.searchData.map(x => <CharacterCard key={x.character.mal_id} characterData={x}/>)}
                    </div>
                </div>
            }
        </div>
    );
}