import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom";

import { searchMovies } from "../../services/movieApi";

import MovieList from "../../components/MovieList/MovieList"
import SearchBar from "../../components/SearchBar/SearchBar";
import { Loader } from "../../components/Loader/Loader";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  
  const movie = searchParams.get('query');

  useEffect (() => {
    if (!movie) {
      return;
    }
    const fetchData = async () => {
      setIsLoader(true);
      setError(null);
      try {
        const data = await searchMovies(movie);
       
        setMovies(data.results || [] );
        if (data.results.length === 0) {
          setError('No results')}
      } catch  {
        setError('Something went wrong, please try again later');
      } finally {
        setIsLoader(false)
      }
    };
    fetchData();
  }, [movie]);

  const handleSubmit = value => {
    setSearchParams({query: value});
  };

  const onSearch = (searchMovie) => {
    setSearchParams({
      "query": searchMovie,
    });
  };
  
  return (
    <div>
      <SearchBar defaultSearchValue={movie} onSubmit={handleSubmit} onSearch={onSearch}/>
      {movies.length > 0 && <MovieList movies={movies} />}
      {isLoader && <Loader />}
      {error && <p>{error}</p>}
    </div>
  )
}

export default MoviesPage