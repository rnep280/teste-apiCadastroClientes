const express = require('express')
const router = express.Router()

const userController = require('../controllers/user')

//@router GET /api/users
//@desc Listar todos os usuários
//@access Public
router.get('/', userController.getAll)

//@router POST /api/users/register
//@desc Criar conta
//@access Public
router.post('/register', userController.register)

//@router POST /api/users/login
//@desc Acessar conta
//@access Public
router.post('/login', userController.login)

module.exports = router