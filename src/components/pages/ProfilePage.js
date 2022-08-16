import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { getUserFavourites, userUpdateFavouritesEntry } from "../../services/authService";
import CharacterCard from '../CharacterCard';
import { AnimeCard } from "../AnimeCard";
import "../../styles/listAndCardStyles.css"


export const ProfilePage = () => {
    const { userAuth } = useContext(AuthContext);

    const [favourites, setFavourites] = useState({
        animes: [],
        characters: [],
        _id: ""
    });
    const [favouritesError, setError] = useState('');
    
    useEffect(() => {
        if (favourites._id == "") {
            getUserFavourites(userAuth._id, userAuth.accessToken)
            .then(result => {
                    setFavourites(
                        {
                            animes: result[0].animes,
                            characters: result[0].characters,
                            _id: result[0]._id
                        }
                    )
            })
            .catch(error => {
                setError('No favourite animes or characters added yet.')
            }); 
        } else {
            userUpdateFavouritesEntry(userAuth._id, favourites, {}, userAuth.accessToken);
        }
    }, [favourites])

    const removeFromAnimesHandler = (mal_id) => {
        setFavourites(oldState => ({
            animes: oldState.animes.filter(x => x.mal_id !== mal_id),
            characters: oldState.characters,
            _id: oldState._id
        }));
    }

    const removeFromCharsHandler = (charMal_id) => {
        setFavourites(oldState => ({
            animes: oldState.animes,
            characters: oldState.characters.filter(x => x.character.charMal_id !== charMal_id),
            _id: oldState._id
        }));
    }

    return (
        <div className="pageWrapper">
            <h1>Welcome, {userAuth.email}</h1>
            {favouritesError && 
                <h1>{favouritesError}</h1>
            }
            {favourites.animes.length > 0 &&
                <div className="animeList">
                <h2>Favourite Animes</h2>
                    {favourites.animes.map(anime => <AnimeCard key={anime.mal_id} anime={anime} removeHandler={removeFromAnimesHandler} />)}
                </div>
            }
            {favourites.characters.length > 0 &&
                <div className="charactersList">   
                <h2>Favourite Characters</h2>
                    {favourites.characters.map(x => <CharacterCard key={x.character.charMal_id} characterData={x} removeHandler={removeFromCharsHandler}/>)}
                </div>
            }
        </div>
        
    );
}