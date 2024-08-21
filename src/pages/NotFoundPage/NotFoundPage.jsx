import { Link } from "react-router-dom"
import css from './NotFoundPage.module.css'

const NotFoundPage = () => {
  return (
    <div className={css.noPageWrap}>
      <p className={css.noPageText}>Page not found</p>
      <Link to ={'/'} className={css.noPageLink}>Back Home</Link>
    </div>
  )
}

export default NotFoundPage