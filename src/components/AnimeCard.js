import { Routes, Route, Link } from "react-router-dom";

export const AnimeCard = (props) => {
    const convertedTitle = props.anime.title.toLowerCase().replaceAll(' ', '-');
    return (
        <div className="animeCard">
            <img className="cardImg" src={props.anime.images.jpg.image_url} alt={props.anime.title} />
            <div className="cardInfoWrapper">
                <h3>{props.anime.title}</h3>
                <h4>Score: {props.anime.score}</h4>
                <h4>{props.anime.episodes} Episodes, {props.anime.duration}</h4>
                <h4>Ran from {props.anime.aired.string}</h4>
                <Link to={`/anime/${convertedTitle}/details`} state={{anime_id: props.anime.mal_id, anime_title: props.anime.title}}>Details</Link>
            </div>
        </div>
    );
}