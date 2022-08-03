import * as request from "./requester";
const baseUrl = 'http://localhost:3030/users'

export const apiLogin = (email, password) => {
    return request.post(`${baseUrl}/login`, {email, password});
}