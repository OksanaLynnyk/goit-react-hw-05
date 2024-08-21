import { useLocation, Link } from 'react-router-dom'
import css from './MovieList.module.css'

const MovieList = ({movies}) => {
    const location = useLocation()
  return (
    <ul className={css.movieList}>{movies.map(({title, id}) => {
        return <li key={id} className={css.movieListItem}>
            <Link state={{from: location}} to={`/movies/${id}`} className={css.movieListLink}>{title}</Link>
        </li>
    })}
    </ul>
  )
}

export default MovieList