import * as request from "./requester";
const baseUrl = 'http://localhost:3030/users'

export const userLogin = (email, password) => {
    return request.post(`${baseUrl}/login`, {email, password});
}

export const userRegister = (email, password) => {
    return request.post(`${baseUrl}/register`, {email, password});
}

export const userLogout = (accessToken) => {
    return request.get(`${baseUrl}/logout`, {}, accessToken);
}

export const userGetFavourites = (userId, accessToken) => {
    return request.get(`http://localhost:3030/data/favourites?where=_ownerId%3D%22${userId}%22`, {}, accessToken);
}