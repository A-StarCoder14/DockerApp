const express = require('express')
const mongoose = require('mongoose')
const colors = require('colors')
const ejs = require('ejs')
const MongoURI = require('./configDB.js').MongoURI
const Item = require('./models')
const app = express()

const PORT = 5500

mongoose.connect(MongoURI, {useNewUrlParser: true})
.then(()=> console.log("MongoDB is running"))
.catch((err)=> console.log(err))

app.set('view engine', 'ejs')


app.use(express.json())
app.use(express.urlencoded({extended:false}))




app.get('/', (req,res)=> {
    Item.find()
    .then((data)=> res.status(200).render("index", {data}))
    .catch((err) => {
        res.status(400),
        console.log(err) })
})

app.post('/api/post', (req,res)=> {
    
   
    const newItem = new Item({
        name: req.body.name,
        comment: req.body.comment
    })
    
    
    newItem.save()
    .then((success)=> res.status(201).redirect('/'))
    .catch((err)=> console.log(err))
})

 app.post('/api/post/:id', (req,res)=> {
    Item.findByIdAndDelete(req.params.id)
    res.redirect('/')
 })






app.listen(PORT, console.log(`Server running on port ${PORT}`))

