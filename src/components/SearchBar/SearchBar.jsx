import { useState } from "react"
import toast, { Toaster } from "react-hot-toast";

import css from './SearchBar.module.css'

const SearchBar = ({onSubmit, defaultSearchValue}) => {
    const [query, setQuery] = useState(defaultSearchValue || '');

    const handleChange = e => {
        setQuery(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (!query.trim()) {
            toast.error('Please enter the movie title');
            return;
        }
        onSubmit(query);
    };

  return (
    <>
        <Toaster/>
        <form onSubmit={handleSubmit} className={css.movieForm}>
            <input 
                type="text"
                value={query}
                onChange={handleChange}
                placeholder="Search movie"
                autoComplete="off"
                autoFocus
                className={css.movieInput}
            />
            <button type="submit" className={css.formBtn}>Search</button>
        </form>
    </>
  )
}

export default SearchBar