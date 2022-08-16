# Purpose of anime-app
The purpose of this app is to showcase all the knowledge learned during Softuni's ReactJS course with Ivaylo Papazov.

# Summary of functionalities
- Fetching random anime at the start page.
- Searching for anime and extending later on to more details.
- Authentication + Authorisation using Softuni's practice service.
- Add to favourites functionality split into animes and characters.


# To do list:
- [x] Create profile *(same function as Login, maybe create one component for both)*
- [x] Create Logout functionality
- [ ] Research how to create collections on the server and link users to it. Or maybe it should be directly added to the user?
  - [ ] Play with Postman and create a process
    - check if there's collection with _ownerId = _id
      - GET data/favourites?where=_ownerId%3D%22
    - if not create collection with the new favourite
      - POST with X-auth and body -> animes & characters
    - add to favourites
  - [ ] Implement trough requester.js + authService.js
- [ ] Add profile information
- [ ] Error handling at login/logout/search
- [ ] Route guards and buttons add to favourites
- [ ] Style the website to look more appealing

# Issues to fix:
- [ ] Login with wrong credentials still navigate to homepage