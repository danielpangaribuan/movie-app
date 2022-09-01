import React, { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import NavbarApp from './components/NavbarApp';
import Home from './pages/Home/Home';
import Search from './pages/Search/search';
import MovieDetail from './pages/MovieDetail/movie-detail';
import { getGuestSession } from './redux/actions/movie-action';
import { useDispatch } from 'react-redux';
import FooterApp from './components/FooterApp';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const guest_session_id = localStorage.getItem("guest_session_id");
    if ( guest_session_id === null ) dispatch(getGuestSession());
  }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <NavbarApp />
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="movie/:id" element={<MovieDetail />} />
            <Route path="search/:keyword" element={<Search />} />
          </Route>
        </Routes>      
        <FooterApp />
      </BrowserRouter>
    </div>
  );
}

export default App;
