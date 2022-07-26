import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import CharacterCard from '../CharacterCard';
import { AnimeCard } from "../AnimeCard";
import "../../styles/listAndCardStyles.css"
import { ProfileContext } from "../../contexts/ProfileContext";


export const ProfilePage = () => {
    const { userAuth } = useContext(AuthContext);
    const { userFavourites, setUserFavourites } = useContext(ProfileContext);

    const [favouritesError, setError] = useState('');



    const removeFromAnimesHandler = (mal_id) => {
        setUserFavourites(oldState => ({
            animes: oldState.animes.filter(x => x.mal_id !== mal_id),
            characters: oldState.characters,
            _id: oldState._id
        }));
    }

    const removeFromCharsHandler = (charMal_id) => {
        setUserFavourites(oldState => ({
            animes: oldState.animes,
            characters: oldState.characters.filter(x => x.character.charMal_id !== charMal_id),
            _id: oldState._id
        }));
    }

    return (
        <div className="pageWrapper">
            <h1>Welcome, {userAuth.email}</h1>
            {userFavourites.animes.length == 0 && userFavourites.characters.length == 0 &&
                <h1>No animes, nor characters in favourites yet.</h1>
            }
            {userFavourites.animes.length > 0 &&
                <>
                    <h2>Favourite Animes</h2>
                    <div className="animeList">
                        {userFavourites.animes.map(anime => <AnimeCard key={anime.mal_id} anime={anime} removeHandler={removeFromAnimesHandler} />)}
                    </div>
                </>
            }
            {userFavourites.characters.length > 0 &&
                <>
                    <h2>Favourite Characters</h2>
                    <div className="charactersList">
                        {userFavourites.characters.map(x => <CharacterCard key={x.character.charMal_id} characterData={x} removeHandler={removeFromCharsHandler} />)}
                    </div>
                </>
            }
        </div>

    );
}