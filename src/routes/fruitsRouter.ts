import {Request, Response, Router} from "express";
export let fruits: FruitsModels[] = [
    {id: 1, title: 'banana'},
    {id: 2, title: 'apple'},
    {id: 3, title: 'lemon'},
    {id: 4, title: 'pineapple'},
    {id: 5, title: 'peach'},
]

export const fruitsRouter = Router()

fruitsRouter.get('/', (req: Request, res: Response) => {
    res.send({fruits})
})
fruitsRouter.get('/:id', (req: Request, res: Response) => {
    const needFruit = fruits.find(el => el.id === +req.params.id)
    if (needFruit)
        res.send({needFruit})
    else {
        res.status(404).end('Not found')
    }
})
fruitsRouter.delete('/:id', (req: Request, res: Response) => {
    const needFruit = fruits.find(el => el.id === +req.params.id)
    if (!needFruit) {
        res.status(404).end('Not found')
    } else {
        fruits = fruits.filter(el => el.id !== +req.params.id)
        res.status(204).end('No content')
    }
})
fruitsRouter.post('/', (req: Request, res: Response) => {
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
fruitsRouter.put('/:id', (req: Request, res: Response) => {
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