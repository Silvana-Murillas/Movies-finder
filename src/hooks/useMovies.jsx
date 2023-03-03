import withresults from '../withresults.json';
import withothresults from '../withouthresult.json';
import { useMemo, useRef, useState, useCallback } from 'react';
export const useMovies = ({ input, sort }) => {
    const [responseMovies, setResponsemovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const refInput = useRef('');
    const movies = responseMovies.Search?.map((m) => ({
        id: m.imdbID,
        title: m.Title,
        year: m.Year,
        poster: m.Poster,
    }));

    const getMovies = useCallback(({ input }) => {
        try {
            console.log(input);
            if (input === refInput) return;
            setLoading(true);
            if (input) {
                // setResponsemovies(withresults);
                refInput.current = input;
                fetch(`http://www.omdbapi.com/?apikey=4287ad07&s=${input}`)
                    .then((res) => res.json())
                    .then((json) => setResponsemovies(json));
            } else {
                setResponsemovies(withothresults);
            }
        } catch (e) {
            throw new Error(e.message);
        } finally {
            setLoading(false);
        }
    }, []);

    const sortMovies = useMemo(() => {
        return sort
            ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
            : movies;
    }, [sort, movies]);

    return { movies: sortMovies, getMovies, loading };
};
