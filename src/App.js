import { Navigation } from "./components/Navigation";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from "./components/HomePage";
import { AnimeListPage } from "./components/AnimeListPage";
import { ProfilePage } from "./components/ProfilePage";
import { CreateProfilePage } from "./components/CreateProfilePage";
import { ErrorPage } from "./components/ProfilePage copy";
import "./styles/App.css"
import { Footer } from "./components/Footer";


function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/anime-list" element={<AnimeListPage />}  />
        <Route path="/profile" element={<ProfilePage />}  />
        <Route path="/create-profile" element={<CreateProfilePage />}  />
        <Route path="/login" />
        <Route path="/logout" />
        <Route path="*" element={<ErrorPage />}  />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
