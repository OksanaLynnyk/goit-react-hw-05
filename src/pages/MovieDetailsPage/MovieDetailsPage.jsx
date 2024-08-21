import { useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";

import { fetchMovie } from "../../services/movieApi";
import GoBackBtn from "../../components/GoBackBtn/GoBackBtn";
import { Loader } from "../../components/Loader/Loader";

import css from './MovieDetailsPage.module.css';
import clsx from "clsx";

const MovieDetailsPage = () => {
  const {movieId} = useParams();
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoader, setIsLoader] = useState(false);
  const [error, setError] = useState(null);

  const location = useLocation();
  const goBack = useRef(location.state?.from ?? '/');

  useEffect (() => {
    const fetchData = async () => {
      setIsLoader(true);
      setError(null);
      try {
        const data = await fetchMovie(movieId);
        setMovieDetails(data)
      } catch(error) {
        setError(error);
      } finally {
        setIsLoader(false);
      }
    };
    fetchData()
  }, [movieId])


  return (
    <div className={css.pageDetailsWrap}>
      <GoBackBtn path={goBack.current}>Go back</GoBackBtn>
      {movieDetails && (
        <ul className={css.detailsList}>
          <li className={css.detailsItem}>
            <img src={`https://image.tmdb.org/t/p/w300${movieDetails.poster_path}`} alt={movieDetails.title}
            className={css.detailsImg} />
            <div className={css.detailsItemWrap}>
              <h2>{movieDetails.title} ({movieDetails.release_date.substring(0, 4)})</h2>
              <p>User Score:  {Math.round(movieDetails.vote_average * 10)}%</p>
              <h3>Overview</h3>
              <p>{movieDetails.overview}</p>
              <h3>Genres</h3>
              <p>{movieDetails.genres.map(genre => genre.name).join(' ')}</p>
            </div>
          </li>
        </ul>
      )}
      <h3>Additional information</h3>
      <ul className={css.infoWrap}>
        <li className={css.infoItem}>
          <NavLink to='cast' className={({ isActive }) => clsx(css.infoLink, isActive && css.active)}>Cast</NavLink>
        </li>
        <li className={css.infoItem}>
          <NavLink to='reviews' className={({ isActive }) => clsx(css.infoLink, isActive && css.active)}>Reviews</NavLink>
        </li>
      </ul>
      <Outlet />
      {isLoader && <Loader />}
      {error && <p>{error}</p>}
    </div>
  )
}

export default MovieDetailsPage