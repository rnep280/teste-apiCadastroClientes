const bcrypt = require('bcrypt')

exports.hasPassword = async(password, res) => {
    try {
         //definir o tamanho de caracteres q quer na senha recebida
        const salt = await  bcrypt.genSalt(10)

        //transformando a senha recebida numa hash
        const hash = await bcrypt.hash(password, salt)
        
        return hash
   
    } catch(error) {
        console.log(error)
        res.status(500).json({
            mensagem: message.error
        })
    }
}