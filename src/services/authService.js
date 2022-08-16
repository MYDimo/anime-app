import * as request from "./requester";
const baseUrl = 'http://localhost:3030/users'

export const userLogin = (email, password) => {
    return request.post(`${baseUrl}/login`, { email, password });
}

export const userRegister = (email, password) => {
    return request.post(`${baseUrl}/register`, { email, password });
}

export const userLogout = (accessToken) => {
    return request.get(`${baseUrl}/logout`, {}, accessToken);
}

export const getUserFavourites = (userId, accessToken) => {
    return request.get(`http://localhost:3030/data/favourites?where=_ownerId%3D%22${userId}%22`, {}, accessToken);
}

export const userCreateFavouritesEntry = (accessToken) => {
    return request.post(`http://localhost:3030/data/favourites`, { animes: [], characters: [] }, accessToken);
}

export const userUpdateFavouritesEntry = (
    userId, userCollection, newFavouritesEntry, accessToken
) => {

    
    const newFavCollection = {
            animes: userCollection.animes,
            characters: userCollection.characters
        }
        
    if (Object.keys(newFavouritesEntry).length > 0) {
        newFavouritesEntry.hasOwnProperty('episodes') 
        ? userCollection.animes.push({
            title: newFavouritesEntry.title,
            episodes: newFavouritesEntry.episodes,
            images: newFavouritesEntry.images,
            aired: newFavouritesEntry.aired,
            mal_id: newFavouritesEntry.mal_id,
        }) 
        : userCollection.characters.push({
           character: {
                name: newFavouritesEntry.character.name,
                images: newFavouritesEntry.character.images,
                charMal_id: newFavouritesEntry.character.mal_id
            }
        });
    }
    
    // I guess the server can only process an Object with max 25 keys
    // let objSliced = Object.fromEntries(
    //     Object.entries(newFavouritesEntry).slice(1, 25)
    //     )

    return request.put(`http://localhost:3030/data/favourites/${userCollection._id}`, newFavCollection, accessToken)
}