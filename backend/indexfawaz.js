const express = require('express')
const app = express()
const PORT= 3000
const bodyParser= require('body-parser')
const {mongoUrl} = require('./keys')
const mongoose= require('mongoose')

app.use(bodyParser.json())
require('./models/User')
const requireauth = require('./middleware/requireauth')

const Routes= require('./routes/Authroute')

app.use(Routes)

app.get('/',requireauth,(req,res) => {
    console.log(req.user.email)
    res.send("Your email is "+ req.user.email)
})

mongoose.connect(mongoUrl,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', ()=>{
    console.log("connected to mongo")
})
mongoose.connection.on('error', (err)=>{
    console.log("Error",err)
})

app.listen(PORT, () => {(
    console.log("Server running at", PORT)
)}
)