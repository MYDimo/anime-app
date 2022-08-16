import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { AddToFavourites } from "./AddToFavourites";
import { useLocation } from "react-router-dom";



const CharacterCard = (props) => {
    const { userAuth } = useContext(AuthContext);
    const { pathname } = useLocation();

    return (
        <div className="characterCard">
            <h2 className="characterName">{props.characterData.character.name}</h2>
            <img className="cardImg" src={props.characterData.character.images.jpg.image_url} alt={props.characterData.character.name} />
            {userAuth._id && !pathname.includes("profile") &&
                <AddToFavourites characterInfo={props.characterData} />
            }
            {pathname.includes("profile") &&
                <button onClick={() => props.removeHandler(props.characterData.character.charMal_id)}>Remove</button>
            }
        </div>
    );
}

export default CharacterCard;