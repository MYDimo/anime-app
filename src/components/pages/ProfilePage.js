import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { userGetFavourites } from "../../services/authService";

export const ProfilePage = () => {
    //get userId and accessToken
    const { userAuth } = useContext(AuthContext);

    const [favourites, setFavourites] = useState(null);
    const [favouritesError, setError] = useState('');
    
    useEffect(() => {
        userGetFavourites(userAuth._id, userAuth.accessToken)
            .then(result => setFavourites(
                {
                    animes: result[0].animes,
                    characters: result[0].characters
                }
            )).catch(error => {
                setError('No favourite animes or characters added yet.')
            }); 
    }, [])
    //render the animes characters
    return (
        <div className="pageWrapper">
            <h1>This is the Profile Page</h1>
            {favouritesError && 
                <h1>{favouritesError}</h1>
            }
        </div>
        
    );
}