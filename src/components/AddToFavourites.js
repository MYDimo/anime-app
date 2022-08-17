import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { userCreateFavouritesEntry, getUserFavourites, userUpdateFavouritesEntry } from "../services/authService";


export const AddToFavourites = (props) => {
    const {userAuth} = useContext(AuthContext);
    const [userCollection, setuserCollection] = useState(null);

    const addFavsHandler = () => {
        getUserFavourites(userAuth._id, userAuth.accessToken)
            .then(result => {
                console.log(result);
                if (result.code == 404 || result.length == 0) {
                    userCreateFavouritesEntry(userAuth.accessToken)
                        .then(newlyCreatedCollection => setuserCollection(newlyCreatedCollection));
                } else {
                    console.log("im doing this");
                    setuserCollection(result[0])
                } 
            })
    }

    useEffect(() => {
        if (!userCollection) {
            return;
        }

        let favsEntry = props.hasOwnProperty("animeInfo") ? props.animeInfo : props.characterInfo;

        userUpdateFavouritesEntry(userAuth._id, userCollection, favsEntry, userAuth.accessToken);

    }, [userCollection])

    return (
        <button className="addToFavourites" onClick={addFavsHandler}>
            Add to Favourites
        </button>
    );
}