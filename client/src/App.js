import React, { useState } from 'react';
import { Route } from 'react-router-dom';

import MovieList from './Movies/MovieList';
import Movie from './Movies/Movie';
import SavedList from './Movies/SavedList';
import UpdateMovie from './Movies/UpdateMovie'

const App = () => {
  const [savedList, setSavedList] = useState([]);

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  return (
    <div>
      <SavedList list={savedList} />
      <Route exact path="/" render={props => <MovieList {...props} /> } />
      <Route path="/movies/:id" render={props => <Movie {...props} /> } />
      <Route path={`/update-movie/:id`} component={UpdateMovie} />
    </div>
  );
};

export default App;
