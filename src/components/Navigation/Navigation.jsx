import { NavLink } from "react-router-dom"

import css from './Navigation.module.css'
import clsx from "clsx"

const Navigation = () => {
  return (
    <header className={css.navWrap}>
        <nav className={css.nav}>
            <ul className={css.navList}>
                <li className={css.navItem}>
                    <NavLink to="/" className={({ isActive }) => clsx(css.navLink, isActive && css.active)}>
                    Home
                    </NavLink>
                </li>
                <li className={css.navItem}>
                    <NavLink to="/movies" className={({ isActive }) => clsx(css.navLink, isActive && css.active)}>
                    Movies
                    </NavLink>
                </li>
            </ul>
        </nav>
    </header>
  )
}

export default Navigation