const bcrypt = require('bcrypt')

const generateHash = async (string) =>{
    const saltRounds = 10
    const salt = await bcrypt.genSalt(saltRounds)
    const hashedpassword = await bcrypt.hash(string, salt)
    return hashedpassword
}

const verify = async (formpassword, dbpassword) =>{
    try{
        const isMatch = await bcrypt.compare(formpassword, dbpassword)
        console.log(isMatch)
        return isMatch
    }
    catch(ex){
        console.error(ex)
    }
}


module.exports = {generateHash, verify}