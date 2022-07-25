import { Routes, Route, Link } from "react-router-dom";

export const AnimeCard = (props) => {
    const convertedTitle = props.anime.title.toLowerCase().replaceAll(' ', '-');
    return (
        <div className="animeCard">
            <h3>{props.anime.title}</h3>
            <img src={props.anime.images.jpg.image_url} alt={props.anime.title} />
            <Link to={`/anime/${convertedTitle}/details`} state={{anime_id: props.anime.mal_id, anime_title: props.anime.title}}>Details</Link>
        </div>
    );
}