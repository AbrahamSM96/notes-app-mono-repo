import React from 'react'
import Toggable from './Toggable'
import PropTypes from 'prop-types'

export default function LoginForm({
  username,
  password,
  handleUserNameChange,
  handlePasswordChange,
  handleLogin
}) {
  return (
    <Toggable buttonLabel="Show Login">
      <form onSubmit={handleLogin}>
        <div>
          <input
            type="text"
            value={username}
            name="Username"
            placeholder="Username"
            onChange={handleUserNameChange}
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            name="Password"
            placeholder="Password"
            onChange={handlePasswordChange}
          />
        </div>
        <button>Login</button>
      </form>
    </Toggable>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  username: PropTypes.string
}
