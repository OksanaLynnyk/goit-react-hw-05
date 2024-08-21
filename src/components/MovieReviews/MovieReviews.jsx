import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { fetchMovieReviews } from "../../services/movieApi";
import { Loader } from "../Loader/Loader";

import css from './MovieReviews.module.css'

const MovieReviews = () => {
  const {movieId} = useParams();
  const [reviews, setReviews] = useState([]);
  const [isLoader, setIsLoader] =useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoader(true);
      setError(null);
      try {
        const data = await fetchMovieReviews(movieId);
        setReviews(data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoader(false);
      }
    };
    fetchData();
  
  },[movieId])
  
  return <>
      {isLoader && <Loader />}
     <ul className={css.reviwsList}>
          {reviews.map(review => (
            <li key={review.id} className={css.reviewsItem}>
              <h3 className={css.reviewsAuthor}>{review.author}</h3>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
        {error && <p>{error}</p>}
        {!isLoader && reviews.length === 0  && <p className={css.noReviews}>We don&apos;t have any reviews for this movie</p>}
  </>;
};

export default MovieReviews;