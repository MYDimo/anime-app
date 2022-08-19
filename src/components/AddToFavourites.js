import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { ProfileContext } from "../contexts/ProfileContext";
import { userCreateFavouritesEntry, getUserFavourites, userUpdateFavouritesEntry } from "../services/authService";


export const AddToFavourites = (props) => {
    const { userAuth } = useContext(AuthContext);
    const { userFavourites, setUserFavourites } = useContext(ProfileContext);

    const [userCollection, setuserCollection] = useState(null);
    const [isInAnimeFavourites, setIsInAnimeFavourites] = useState(false);
    // const [isInCharFavourites, setIsInCharFavourites] = useState(false);

    const addFavsHandler = () => {
        getUserFavourites(userAuth._id, userAuth.accessToken)
            .then(result => {
                if (result.code == 404 || result.length == 0) {
                    userCreateFavouritesEntry(userAuth.accessToken)
                        .then(newlyCreatedCollection => setuserCollection(newlyCreatedCollection));
                } else {
                    setuserCollection(result[0])
                }
            })
    }

    useEffect(() => {
        if (!userCollection) {
            return;
        }

        let favsEntry = props.hasOwnProperty("animeInfo") ? props.animeInfo : props.characterInfo;

        userUpdateFavouritesEntry(userAuth._id, userCollection, favsEntry, userAuth.accessToken)
            .then(result => {
                setUserFavourites(oldState => ({
                    animes: result.animes,
                    characters: result.characters,
                    _id: oldState._id
                }))
            })

    }, [userCollection])

    useEffect(() => {
        if (props.hasOwnProperty("animeInfo") && props.animeInfo !== null) {
            if (userFavourites.animes.some(x => x.mal_id == props.animeInfo.mal_id)) {
                setIsInAnimeFavourites(true);
            }
        }
        if (props.hasOwnProperty("characterInfo")) {
            if (userFavourites.characters.some(x => x.character.charMal_id == props.characterInfo.character.mal_id)) {
                setIsInAnimeFavourites(true);
            }
        }
    }, [userFavourites])

    return (
        <button className="addToFavourites" onClick={addFavsHandler} disabled={isInAnimeFavourites}>
            {!isInAnimeFavourites ? 'Add to Favourites' : 'Already in Favourites'}
        </button>
    );
}