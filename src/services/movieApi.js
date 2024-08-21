import axios from "axios";

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

const options = {
  headers: {
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NjYyMWY3Y2VlNDBmM2Q5N2FkZWVhMTJlMmI4MjQ4MiIsIm5iZiI6MTcyMzk3Njg2Ni4zNzQwNzMsInN1YiI6IjY2YzFjOTg0ZjlhODM4MjllMGQzNDMwMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EbMgGz9ZVvMrQnFUcljfsm6lk8LhlttMnBnmsZ9G2A8'
  },
  params: {
    include_adult: false,
    language: 'en-US',
    page: 1,
  }
};

export const getTrendingMovies = async () => {
    const {data} = await axios.get('trending/movie/day', options)
    return data
}

export const searchMovies = async (searchMovie) => {
    const {data} = await axios.get(`search/movie?query=${searchMovie}`, options)
    return data
}

export const fetchMovie = async (movieId) => {
  const {data} = await axios.get(`movie/${movieId}`, options)
  return data
}

export const fetchMovieReviews = async (movieId) => {
  const {data} = await axios.get(`movie/${movieId}/reviews`, options)
  return data
}

export const fetchMovieCast = async (movieId) => {
  const {data} = await axios.get(`movie/${movieId}/credits`, options)
  return data
}

