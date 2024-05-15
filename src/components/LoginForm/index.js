import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import {Component} from 'react'

import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', showSubmitError: false, errorMsg: ''}

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}
    const options = {method: 'POST', body: JSON.stringify(userDetails)}
    const response = await fetch(url, options)
    console.log(response)
    const data = await response.json()
    console.log(data)
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const {username, password, showSubmitError, errorMsg} = this.state
    return (
      <div className="app-container">
        <form className="from-container" onSubmit={this.onSubmitForm}>
          <div className="logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="website-logo"
            />
          </div>
          <label className="label-element" htmlFor="inputElement">
            USERNAME
          </label>
          <input
            type="text"
            placeholder="Username"
            className="input-element"
            id="inputElement"
            onChange={this.onChangeUserName}
            value={username}
          />
          <label className="label-element" htmlFor="inputElementPassword">
            PASSWORD
          </label>
          <input
            type="password"
            placeholder="Password"
            className="input-element"
            id="inputElementPassword"
            onChange={this.onChangePassword}
            value={password}
          />
          <button type="submit" className="login-button">
            Login
          </button>
          {showSubmitError && <p className="error-msg">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default LoginForm
