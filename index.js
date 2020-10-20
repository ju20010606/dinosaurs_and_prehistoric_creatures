const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const fs = require('fs')
const methodOverride = require('method-override')


app.use(methodOverride('_method'))
app.set('view engine','ejs')
app.use(ejsLayouts)

app.use(express.urlencoded({extended: false}))

app.listen(8001,()=>{
    console.log('Port 8001!')
})
app.get('/',(req,res)=>{
    res.render('home')
})

app.get('/prehistoric_creatures',(req,res)=>{
    let prehistoricCreatures = fs.readFileSync('./prehistoric_creatures.json')
    let prehistoricData = JSON.parse(prehistoricCreatures)
    res.render('prehistoric_creatures/creatures',{prehistoric_creatures:prehistoricData})
})

app.put('/prehistoric_creatures/:idx',(req,res)=>{
    let prehistoricCreatures = fs.readFileSync('./prehistoric_creatures.json')
    let prehistoricData = JSON.parse(prehistoricCreatures)

    prehistoricData[req.params.idx].type = req.body.type

    res.redirect('/prehistoric_creatures')

    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(prehistoricData))
})

app.get('/prehistoric_creatures/new', (req,res)=>{
    res.render('prehistoric_creatures/creaturesNew')
})

app.post('/prehistoric_creatures',(req,res)=>{
    let prehistoricCreatures = fs.readFileSync('./prehistoric_creatures.json')
    let prehistoricData = JSON.parse(prehistoricCreatures)
    prehistoricData.push(req.body)

    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(prehistoricData))

    res.redirect('/prehistoric_creatures')
    
})



app.get('/prehistoric_creatures/:idx',(req,res)=>{
    let prehistoricCreatures = fs.readFileSync('./prehistoric_creatures.json')
    let prehistoricData = JSON.parse(prehistoricCreatures)
    //get array index from url parameter
    let creatureIndex = parseInt(req.params.idx)
    console.log()
    res.render('prehistoric_creatures/creaturesShow', {creature: prehistoricData[creatureIndex], creatureId: creatureIndex})
})

app.get('/prehistoric_creatures/edit/:idx', (req,res)=>{
    let prehistoricCreatures = fs.readFileSync('./prehistoric_creatures.json')
    let prehistoricData = JSON.parse(prehistoricCreatures)
    //get array index from url parameter
    let creatureIndex = parseInt(req.params.idx)
    console.log()
    res.render('prehistoric_creatures/creaturesEdit', {creature: prehistoricData[creatureIndex], creatureId: creatureIndex})
})


















app.get('/dinosaurs',(req,res)=>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    let nameFilter = req.query.nameFilter
    if(nameFilter){
        dinoData = dinoData.filter((dino) =>{
            return dino.name.toLowerCase() === nameFilter.toLowerCase()
        })
    }

    res.render('dinosaurs/index',{dinosaurs:dinoData})
    console.log(dinoData)

})

app.post('/dinosaurs',(req,res)=>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    dinoData.push(req.body)

    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))

    res.redirect('/dinosaurs')
    
})

//-------> dino show route <-------




app.get('/dinosaurs/new', (req,res)=>{
    res.render('dinosaurs/new')
})

app.get('/dinosaurs/:idx',(req,res)=>{
    let dinosaurs = fs.readFileSync('./dinosaurs.json')
    let dinoData = JSON.parse(dinosaurs)
    //get array index from url parameter
    let dinoIndex = parseInt(req.params.idx)
    console.log((dinoData[dinoIndex]))
    res.render('dinosaurs/show', {dino: dinoData[dinoIndex], dinoId: dinoIndex})
})

