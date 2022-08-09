import { useContext, useState } from "react";
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


function App() {
  const [userAuth, setUserAuth] = useLocalStorage({})

  const onUserLogin = (authData) => {
    setUserAuth(authData);
  }

  const onUserLogout = () => {
    setUserAuth({});
    localStorage.clear();
  }

  return (
    <AuthContext.Provider value={{ userAuth, onUserLogin, onUserLogout }}>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/anime/*" element={<AnimeDetailsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/create-profile" element={<CreateProfilePage />} />
          <Route path="/search-anime" element={<AnimeSearchPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<Logout />}/>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
