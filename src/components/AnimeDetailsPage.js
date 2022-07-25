import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getAnimeDetails } from '../utils/api-calls';

export const AnimeDetailsPage = () => {
    const location = useLocation();
    const { anime_id } = location.state;
    const { anime_title } = location.state;
    const [animeDetailsData, setAnimeDetailsData] = useState(null);

    useEffect(() => {
        getAnimeDetails(anime_id).then(data => {
            setAnimeDetailsData(data)
        });
    }, [])

    return (
        <div className="pageWrapper">
            <h1>This is {anime_title} Details Page</h1>
            {animeDetailsData &&
                <img src={animeDetailsData.images.jpg.large_image_url} alt={`${anime_title} cover img`} />
            }
        </div>
    );
}