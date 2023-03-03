import React, { useState } from 'react';
import '../App.css';
import { Detail } from './Detail';
export const Movies = ({ movies }) => {
    const [m, setM] = useState('');
    const [modal, setModal] = useState(false);
    const handlerClick = (e, id) => {
        console.log('click', id);
        e.preventDefault();
        setM(id);
        setModal(!modal);
    };
    return (
        <div className="container">
            {modal ? (
                <>
                    <Detail movie={m} click={handlerClick} />{' '}
                </>
            ) : null}
            <div className="movie">
                {movies.map((movie) => (
                    <div key={movie.id} className="mov">
                        <h3>{movie.title}</h3>
                        <p>{movie.year}</p>
                        <img src={movie.poster} />
                        <button onClick={(e) => handlerClick(e, movie.id)}>
                            Detail
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const NoMovies = () => {
    return (
        <div className="empty">
            <p>No se encontraron resultados para esta busqueda</p>
        </div>
    );
};
