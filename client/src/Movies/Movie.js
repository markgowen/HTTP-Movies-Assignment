import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';

const Movie = props => {
  const [movie, setMovie] = useState();

  useEffect(() => {
    const id = props.match.params.id;

    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(response => {
        setMovie(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const clickHandler = e => {
    axios
      .delete(`http://localhost:5000/api/movies/${movie.id}`)
      .then(res => {console.log(res)
      props.history.push(`/`)
      })
      .catch(err => console.log(err.res))
  };

  const { title, director, metascore, stars } = movie;
  return (
    <div className="save-wrapper">
      <div className="movie-card">
        <h2>{title}</h2>
        <div className="movie-director">
          Director: <em>{director}</em>
        </div>
        <div className="movie-metascore">
          Metascore: <strong>{metascore}</strong>
        </div>
        <h3>Actors</h3>

        {stars.map(star => (
          <div key={star} className="movie-star">
            {star}
          </div>
        ))}
      </div>
      <div className="save-button">Save</div>
      <div className="edit-button"><Link to={`/update-movie/${movie.id}`}>Edit</Link></div>
      <div onClick={clickHandler} className="delete-button">Delete</div>
    </div>
  );
};

export default Movie;