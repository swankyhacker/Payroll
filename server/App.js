const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

require('./Employee.js')

app.use(bodyParser.json())

const mongoUri = `${process.env.MONGO_URL}`

mongoose.connect(mongoUri,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

mongoose.connection.on('connected',() => {
    console.log('MongoDB connected')
})

mongoose.connection.on('error', (err) => {
    console.log(mongoUri)
    console.log('Error: ', err)
})

const Employee = mongoose.model('employee')



app.get('/', (req, res) => {
    Employee.find({}).then(data =>{
        res.send(data)
    }).catch(err => {
        console.log(data)
    })
})

app.post('/send-data',(req,res) => {
    const employee = new Employee({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        picture:req.body.picture,
        salary:req.body.salary,
        position:req.body.position,
    })
    employee.save().then(data => {
        console.log(data)
        res.send(data)
    }).catch(err =>{
        console.log(err)
    })
})

app.post('/update',(req,res) => {
    Employee.findByIdAndUpdate(req.body.id,{
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        picture:req.body.picture,
        salary:req.body.salary,
        position:req.body.position,
    }).then(data => {
        console.log(data)
        res.send(data)
    }).catch(err => {
        console.log(err)
    })
})

app.post('/delete', (req,res) => {
    Employee.findByIdAndDelete(req.body.id).then(data => {
        console.log(data)
        res.send(data)
    }).catch(err => {
        console.log(err)
    })
})

app.listen(3000, () => {
    console.log('Server running')
})