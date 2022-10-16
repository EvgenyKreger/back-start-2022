import {Router, Request, Response} from "express";
import {VideoCreateModel, VideoModels, VideoUpdateIdModels, VideoUpdateModel} from "../models/videoModels";
import {RequestWithBody, RequestWithParams, RequestWithParamsAndBody} from "../typesRequest/typesRequest";
import {
    validateCreateVideosMiddleWare,
    validateUpdateVideosMiddleWare
} from "../middleware/validateVideos";

export let videos: VideoModels[] = []
export const videoRoutes = Router()
export const videoDeleteAllRoutes = Router()
videoDeleteAllRoutes.delete('/', (req: Request, res: Response) => {
    videos = []
    res.status(204).end()
})
videoRoutes.get('/', (req: Request, res: Response<VideoModels[]>) => {
    if (videos)
        res.status(200).send(videos);
})
videoRoutes.get('/:id', (req: RequestWithParams<VideoUpdateIdModels>, res: Response<VideoModels>) => {
    const idFind = +req.params.id
    const needId = videos.find(el => el.id === idFind)
    if(!needId){
        res.status(404).end()
        return
    }
    if (needId) {
        res.status(200).send(needId)
    }
})
videoRoutes.post('/', validateCreateVideosMiddleWare, (req: RequestWithBody<VideoCreateModel>, res: Response<VideoModels | {}>) => {
    const currentTime = new Date();
    const currentDataPlusOneDay = currentTime.setDate(currentTime.getDate() + 1);
    const rightDataPlusOneDay = currentTime.toISOString();
    const createObj: VideoModels = {
        id: +new Date(),
        title: req.body.title,
        author: req.body.author,
        canBeDownloaded: true,
        minAgeRestriction: 18,
        createdAt: new Date().toISOString(),
        publicationDate: rightDataPlusOneDay,
        availableResolutions: req.body.availableResolutions
    }
    if (createObj)
        videos.push(createObj)
    res.status(201).send(createObj)
})
videoRoutes.put('/:id', validateUpdateVideosMiddleWare, (req: RequestWithParamsAndBody<VideoUpdateIdModels, VideoUpdateModel>, res: Response<never | {}>) => {
    const idFind = +req.params.id
    const needId = videos.find(el => el.id === idFind)
    if(!needId){
        res.status(404).end()
        return
    }
    if (needId){
        needId.title = req.body.title
            needId.author = req.body.author
            needId.canBeDownloaded = req.body.canBeDownloaded
            needId.minAgeRestriction = req.body.minAgeRestriction
            needId.publicationDate = req.body.publicationDate
        res.status(204).end()
    }

})
videoRoutes.delete('/:id',(req:RequestWithParams<VideoUpdateIdModels>, res: Response) => {
    const idFind = +req.params.id
    const needId = videos.find(el => el.id === idFind)
    if(!needId){
        res.status(404).end()
        return
    }
    if (needId){
        const index = videos.indexOf(needId)
        videos.splice(index, 1)
        res.status(204).end()
    }

})

