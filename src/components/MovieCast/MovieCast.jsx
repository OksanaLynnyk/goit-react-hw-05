import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchMovieCast } from "../../services/movieApi";
import { Loader } from "../Loader/Loader";

import css from './MovieCast.module.css'

const MovieCast = () => {
  const {movieId} = useParams();
  const [cast, setCast] = useState([]);
  const [isLoader, setIsLoader] =useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoader(true);
      setError(null);
      try {
        const data = await fetchMovieCast(movieId);
        setCast(data.cast);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoader(false);
      }
    };
    fetchData();
  },[movieId])
 
  const noImage ='https://sga.sa.ua.edu/wp-content/uploads/sites/28/2021/06/placeholder-200x300-1.png'
  
  return <div className={css.castWrap}>
      {isLoader && <Loader />}
      {cast.length > 0 && (
        <ul className={css.castList}>
          {cast.map(actor => (
            <li key={actor.id} className={css.castItem}>
                 <img
                    src={actor.profile_path 
                      ? `https://image.tmdb.org/t/p/w200/${actor.profile_path}` 
                      : noImage}
                    alt={actor.name}
                    className={css.castImg}
                  />
              <h3 className={css.castText}>{actor.name}</h3>
              {actor.character && <p className={css.castText}>Character: {actor.character}</p>}
            </li>
          ))}
        </ul>
      )}
        {error && <p>{error}</p>}
  </div>;
};

export default MovieCast;