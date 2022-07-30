const CharacterCard = (props) => {
    return (
        <div className="characterCard">
            <img className="cardImg" src={props.characterData.character.images.jpg.image_url} alt={props.characterData.character.name} />
            <div className="cardInfoWrapper">
                <h2>{props.characterData.character.name}</h2>
            </div>
        </div>
    );
}

export default CharacterCard;