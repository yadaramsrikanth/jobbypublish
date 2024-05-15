import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header-container">
      <Link className="link-item" to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="logo-image"
        />
      </Link>
      <ul className="nav-items-container">
        <li className="nav-item">
          <Link className="link-item" to="/">
            Home
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/jobs" className="link-item">
            Jobs
          </Link>
        </li>
      </ul>

      <li className="nav-item">
        <button type="button" className="logout-button" onClick={onClickLogout}>
          Logout
        </button>
      </li>
    </div>
  )
}

export default withRouter(Header)
