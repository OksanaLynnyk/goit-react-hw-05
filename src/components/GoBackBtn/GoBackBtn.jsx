import { Link } from "react-router-dom"
import css from './GoBackBtn.module.css'

const GoBackBtn = ({children, path}) => {
  return (
    <div className={css.btnWrap}>
      <Link to={path} className={css.btnBack}>
        {children}
      </Link>
    </div>
  )
}

export default GoBackBtn