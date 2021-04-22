const jwt = require('jsonwebtoken')
// Encriptaremos con bcrypt la password
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/User')

loginRouter.post('/', async (request, response) => {
  const { body } = request
  const { username, password } = body
  // Buscamos en la DB el user
  const user = await User.findOne({ username })
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash)
  // Validamos si no existe el user
  if (!user && passwordCorrect) {
    response.status(401).json({
      error: 'Invalid user or password'
    })
  }
  // Esto es lo que contendra el token
  const userForToken = {
    id: user._id,
    username: user.username
  }
  //  El token expira en 7 dias
  // Para decifrar el token usaremos una clave secreta que estara en .env

  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60 * 24 * 7
  })

  // Devolveremos el name, username y el token para el frontend
  response.send({
    name: user.name,
    username: user.username,
    token
  })
})

module.exports = loginRouter
