const CharacterCard = (props) => {
    return (
        <div className="characterCard">
            <h2 className="characterName">{props.characterData.character.name}</h2>
            <img className="cardImg" src={props.characterData.character.images.jpg.image_url} alt={props.characterData.character.name} />
            <button>Add to Favourite Characters</button>
        </div>
    );
}

export default CharacterCard;