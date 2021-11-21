const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/User')
const { hasPassword } = require('../helpers/auth')

const getAll = async(req, res) => {
    try {
        const users = await User.find()
        res.status(200).json({mensagem: "Lista de usuários do meu banco", users})
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const register = async(req, res) => {
    const { name, email, password } = req.body
    
    try {
           
        const newUser = new User({
            name,
            email,
            password
        })

        //trato o campo password para ser criptografado
        const passwordHashed = await hasPassword(newUser.password, res)
        
        newUser.password = passwordHashed

        const saveUser = await newUser.save()
        res.status(201).json({
            mensagem: "Pessoa cadastrada com sucesso",
            saveUser
        })

    } catch(error) {
        res.status(500).json({
            message: error.message
        })

    }
    
}

const login = async(req, res) => {
    const {email, password} = req.body

    try {
        const user = await User.findOne({ email: email })

        if(!user){
            return res.status(422).send({ message: "Email não encontrado."})
        }
    
        const checkPassword = await bcrypt.compare(password, user.password)
    
        if(!checkPassword){
            return res.status(422).send({ message: "Senha incorreta!" })
        }
        
        //gerar um token (autenticacão) quando tiver validado a senha e o e-mail da pessoa, para ela conseguir logar (acessar uma rota)
        const secret = process.env.SECRET 
        const token = jwt.sign({ id: user._id}, secret )

        res.status(200).json({
            message: "Token funfou",
            token
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


module.exports = {
    getAll,
    register, 
    login
}