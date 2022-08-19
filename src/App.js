import { useContext, useState, useEffect } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { Navigation } from "./components/Navigation";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from "./components/pages/HomePage";
import { AnimeSearchPage } from "./components/pages/AnimeSearchPage";
import { AnimeDetailsPage } from "./components/pages/AnimeDetailsPage";
import { ProfilePage } from "./components/pages/ProfilePage";
import { CreateProfilePage } from "./components/pages/CreateProfilePage";
import { ErrorPage } from "./components/pages/ErrorPage";
import "./styles/App.css"
import { Footer } from "./components/Footer";
import { LoginPage } from "./components/pages/LoginPage";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { Logout } from "./components/Logout";
import { ProfileContext } from "./contexts/ProfileContext";
import { getUserFavourites, userUpdateFavouritesEntry } from "./services/authService";
import { PrivateRoutes } from "./utils/PrivateRoutes";



function App() {
  const [userAuth, setUserAuth] = useLocalStorage({});
  const [userFavourites, setUserFavourites] = useState({
    animes: [],
    characters: [],
    _id: ""
  });

  useEffect(() => {
    if (userFavourites._id == "") {
      getUserFavourites(userAuth._id, userAuth.accessToken)
        .then(result => {
          setUserFavourites(
            {
              animes: result[0].animes,
              characters: result[0].characters,
              _id: result[0]._id
            }
          )
        })
        .catch(error => {
          // setError('No favourite animes or characters added yet.')
          console.log('No favourite animes or characters added yet.');
        });
    } else {
      userUpdateFavouritesEntry(userAuth._id, userFavourites, {}, userAuth.accessToken);
    }
  }, [userFavourites])

  const onUserLogin = (authData) => {
    setUserAuth(authData);
  }

  const onUserLogout = () => {
    setUserAuth({});
    localStorage.clear();
  }

  return (
    <AuthContext.Provider value={{ userAuth, onUserLogin, onUserLogout }}>
      <ProfileContext.Provider value={{ userFavourites, setUserFavourites }}>
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route element={<PrivateRoutes/>}>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/logout" element={<Logout />} />
            </Route>
            <Route path="/" element={<HomePage />} />
            <Route path="/anime/*" element={<AnimeDetailsPage />} />
            <Route path="/search-anime" element={<AnimeSearchPage />} />
            <Route path="/create-profile" element={<CreateProfilePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </ProfileContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
