import './App.css';

import NavBar from './components/Navbar'
import Home from './components/Home'
import AboutView from './components/AboutView'
import SearchView from './components/SearchView'
import MovieView from './components/MovieView'
import {Switch, Route} from 'react-router-dom'
import { useState, useEffect } from 'react';


function App() {

  const [searchResults, setSearchResults] = useState([])
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    if (searchText) {
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=0ff7dbc96c65ca2ec70347218a338eeb&language=en-US&query=${searchText}&page=1&include_adult=false`)
    .then(response => response.json())
    .then (data => {
      setSearchResults(data.results)
    })
  }
  }, [searchText])

  return (
    <div className="App">
      <NavBar searchText={searchText} setSearchText={setSearchText}/>
      <Switch>
        <Route path="/" exact>
          <Home/>
        </Route>
        <Route path="/about" component={AboutView}/>
        <Route path="/search">
          <SearchView keyword={searchText} searchResults={searchResults}/>
        </Route>
        <Route path="/movies/:id" component={MovieView}/>
      </Switch>

    </div>
  );
}

export default App;
