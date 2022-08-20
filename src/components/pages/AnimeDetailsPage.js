import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getAnimeCharacters, getAnimeDetails } from '../../services/api-calls';
import { AddToFavourites } from "../AddToFavourites";
import CharacterCard from '../CharacterCard';
import "../../styles/listAndCardStyles.css"
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';


export const AnimeDetailsPage = () => {
    const { userAuth } = useContext(AuthContext);

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
            <div className="animeInfoWrapper">
                {animeDetailsData &&
                    <div className="animeInfoCopy">
                        <img src={animeDetailsData.images.jpg.large_image_url} className="leftSide" alt={`${anime_title} cover img`} />
                        <div className="rightSide">
                            <h1 className="animeTitle">{anime_title} Details</h1>
                            <p><b>Score:</b> {animeDetailsData.score}</p>
                            <p><b>Status:</b> {animeDetailsData.status}</p>
                            <p><b>Duration:</b> {animeDetailsData.duration}</p>
                            <p><b>Synopsis:</b> {animeDetailsData.synopsis}</p>
                            {userAuth._id &&
                                <AddToFavourites animeInfo={animeDetailsData} />
                            }
                            <button onClick={clickHandler}>
                                {!charactersData.initialData
                                    ? 'Show anime characters'
                                    : 'Hide anime characters'
                                }
                            </button>
                        </div>
                    </div>
                }
            </div>
            {charactersData.initialData &&
                <div className='charInfoWrapper'>
                    <input type="text" placeholder='Search character' onChange={searchCharHandler} />
                    <div className="charactersList">
                        {charactersData.searchData.map(x => <CharacterCard key={x.character.mal_id} characterData={x} />)}
                    </div>
                </div>
            }
        </div>
    );
}