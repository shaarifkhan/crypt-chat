const jwt= require('jsonwebtoken')
const mongoose= require('mongoose')
const User= mongoose.model('User')
const {jwtkey} = require('../keys')

module.exports= (req, res, next)=>{
    const { authorization } = req.headers;
    if (!authorization)
    {
        return req.send("error: You must be logged in")
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token,jwtkey,async(err,payload) =>{
        if(err)
        {
            res.send("error: You must be logged in")
        }
        const {userId}= payload
        const user = await User.findById(userId)
        req.user = user;
        next();
    })
}
