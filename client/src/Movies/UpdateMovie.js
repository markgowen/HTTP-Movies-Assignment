import React, { useState, useEffect } from "react";
import axios from "axios";
const initialMovie = {
    id: " ",
    title: " ",
    director: " ",
    metascore: "",
    stars: []
};
const UpdateMovie = props => {
    const [movie, setMovie] = useState(initialMovie);
    
    const getMovies = (id) => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => setMovie(res.data))
            .catch(err => console.log(err));
    };
    useEffect(() => {
        getMovies(props.match.params.id);
    }, [props.movie, props.match.params.id]);

    const handleChange = e => {
        setMovie({ ...movie, [e.target.name]: e.target.value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
            .then(res => {
                console.log(res);
                props.history.push("/");
            })
            .catch(err => console.log(err.res));
    };
    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                onChange={handleChange}
                placeholder="Title"
                value={movie.title}
            />
            <input
                type="text"
                name="director"
                onChange={handleChange}
                placeholder="Director"
                value={movie.director}
            />
            <input
                type="text"
                name="metascore"
                onChange={handleChange}
                placeholder="Metascore"
                value={movie.metascore}
            />
            {movie.stars.map(star => (
                <input
                    type="text"
                    name="stars"
                    onChange={handleChange}
                    placeholder="Stars"
                    value={star}
                />
            ))}
            <button>Update</button>
        </form>
    );
};
export default UpdateMovie;