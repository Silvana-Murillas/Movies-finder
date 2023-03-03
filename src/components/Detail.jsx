import React, { useEffect, useState } from 'react';
import '../App.css';
export const Detail = ({ movie, click }) => {
    console.log(movie);
    const [detail, setDetail] = useState('');
    useEffect(() => {
        fetch(`http://www.omdbapi.com/?apikey=4287ad07&i=${movie}`)
            .then((res) => res.json())
            .then((json) => setDetail(json));
    }, []);
    console.log(detail);
    return (
        <div className="detail">
            <button className="btn" onClick={(e) => click(e)}>
                X
            </button>
            <div className="section">
                <h1>{detail.Title}</h1>
            </div>
            <label>Year:</label>
            <h3>{detail.Year}</h3>
            <label>Director:</label>
            <h3>{detail.Director}</h3>
            <img src={detail.Poster} />
            <label>Rating:</label>
            <p>{detail.imdbRating}</p>

            <label>Description:</label>
            <p>{detail.Plot}</p>

            <label>Awards:</label>
            <p>{detail.Awards}</p>
        </div>
    );
};

export const NoMovies = () => {
    return (
        <div>
            <p>No se encontraron resultados para esta busqueda</p>
        </div>
    );
};
