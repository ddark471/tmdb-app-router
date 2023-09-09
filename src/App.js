import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Movies from "./pages/Movies";
import Movie from "./components/Movie";
import Actor from "./pages/Actor";
import SearchPage from "./pages/SearchPage";
import styles from "./App.module.css";

const App = () => {
  return (
    <BrowserRouter>
      <div className={styles.wrap}>
        <NavBar />
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="/movies/:id" element={<Movie />} />
          <Route path="/actor/:id" element={<Actor />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};
export default App;
