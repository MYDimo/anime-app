import { Navigation } from "./components/Navigation";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from "./components/HomePage";


function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" />
        <Route path="/anime-list" />
        <Route path="/profile" />
        <Route path="/login" />
        <Route path="/logout" />
        <Route path="*" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
