import { useState, useEffect, useRef, useCallback } from 'react';

import '../App.css';

import { Movies, NoMovies } from './Movies';
import { useMovies } from '../hooks/useMovies';
import debounce from 'just-debounce-it';

const useSearch = () => {
    const [input, setInput] = useState('');
    const [error, setError] = useState('');
    const firtRender = useRef(true);

    useEffect(() => {
        if (firtRender.current) {
            firtRender.current = input === '';
            return;
        }
        if (input.length === 0) {
            setError('La busqueda no puede estar vacia');
            return;
        }
        if (input.length < 3) {
            setError('La busqueda no puede tener menos de 3 caracteres');
            return;
        }
        if (input.match(/^\d+$/)) {
            setError('No se puede realizar la busqueda con un numero');
            return;
        }

        setError('');
    }, [input]);

    return { setInput, input, error };
};

function Search() {
    const { setInput, input, error } = useSearch();
    const [sort, setSort] = useState(false);
    const { movies, getMovies, loading } = useMovies({ input, sort });

    const debounceInput = useCallback(
        debounce((input) => {
            getMovies({ input });
        }, 900),
        [getMovies]
    );
    const handleChange = (e) => {
        const newInput = e.target.value;
        setInput(e.target.value);
        debounceInput(newInput);
    };

    const handlerSubmit = (e) => {
        e.preventDefault();
        getMovies({ input });
    };

    const handlerSort = (e) => {
        setSort(!sort);
    };
    // useEffect(() => {}, []);

    return (
        <div className="page">
            <header>
                <div className="nav">
                    <h1>Find a Movie</h1>
                </div>
                <form onSubmit={handlerSubmit}>
                    <input
                        // ref={inputRef}
                        type="text"
                        placeholder="Enter a movie name"
                        value={input}
                        onChange={handleChange}
                    ></input>

                    <label>
                        {' '}
                        <input
                            type="checkbox"
                            checked={sort}
                            onChange={handlerSort}
                        ></input>
                        Alphabetic order
                    </label>
                    <button>Search</button>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                </form>
            </header>
            <main>
                {loading ? (
                    <p>Cargando...</p>
                ) : movies?.length ? (
                    <Movies movies={movies} />
                ) : (
                    <NoMovies />
                )}
            </main>
        </div>
    );
}

export default Search;
