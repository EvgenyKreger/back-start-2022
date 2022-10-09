import {Request, Response} from "express";
import bodyParser from "body-parser";

const express = require('express')
const app = express()
app.use(bodyParser())
const port = process.env.PORT || 3000
export let fruits: FruitsModels[] = [
    {id: 1, title: 'banana'},
    {id: 2, title: 'apple'},
    {id: 3, title: 'lemon'},
    {id: 4, title: 'pineapple'},
    {id: 5, title: 'peach'},
]

app.get('/fruits', (req: Request, res: Response) => {
    res.send({fruits})
})
app.get('/fruits/:id', (req: Request, res: Response) => {
    const needFruit = fruits.find(el => el.id === +req.params.id)
    if (needFruit)
        res.send({needFruit})
    else {
        res.status(404).end('Not found')
    }
})
app.delete('/fruits/:id', (req: Request, res: Response) => {
    const needFruit = fruits.find(el => el.id === +req.params.id)
    if (!needFruit) {
        res.status(404).end('Not found')
    } else {
        fruits = fruits.filter(el => el.id !== +req.params.id)
        res.status(204).end('No content')
    }
})
app.post('/fruits', (req: Request, res: Response) => {
    if (!req.body.title.trim()) {
        res.status(400).end()
    } else {
        const fruit = {
            id: +new Date().getMilliseconds(),
            title: req.body.title
        }
        fruits.push(fruit)
        res.send(fruit)
    }
})
app.put('/fruits/:id', (req: Request, res: Response) => {
    if (!req.body.title.trim()) {
        res.status(400).end()
        return
    } else {
        const needFruit = fruits.find(el => el.id === +req.params.id)
        if (!needFruit) {
            res.status(404).end('Not found')
            return;
        } else {
            needFruit.title = req.body.title
            res.status(201).send(needFruit)
        }
    }


})

app.listen(port, () => {
    console.log(`Port: ${port} is working`)
})