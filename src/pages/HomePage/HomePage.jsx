import {useEffect, useState} from 'react'

import { getTrendingMovies } from '../../services/movieApi'

import MovieList from '../../components/MovieList/MovieList'
import { Loader } from '../../components/Loader/Loader'

import css from './HomePage.module.css'

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const [error, setError] = useState(null);
  useEffect (() => {
    const fetchMovies = async () => {
      setIsLoader(true);
      setError(null);
      try {
        const data = await getTrendingMovies();
        setMovies(data.results);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoader(false)
      }
    };
    fetchMovies()
  },[]);

  return (
    <>
      <h1>Trending today</h1>
      {movies.length > 0 && <MovieList movies={movies} />}
      {isLoader && <Loader />}
      {error && <p className={css.errMsg}>Something wrong: {error.message}</p>}
    </> 
  )
}

export default HomePage