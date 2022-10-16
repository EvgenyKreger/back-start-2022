import {Router, Request, Response} from "express";
import {VideoCreateModel, VideoModels, VideoUpdateIdModels, VideoUpdateModel} from "../models/videoModels";
import {RequestWithBody, RequestWithParams, RequestWithParamsAndBody} from "../typesRequest/typesRequest";
import {
    validateCreateVideosMiddleWare,
    validateUpdateVideosMiddleWare
} from "../middleware/validateVideos";
import {videoRepository} from "../repositories/video-repository";

export let videos: VideoModels[] = []
export const videoRoutes = Router()
export const videoDeleteAllRoutes = Router()
videoDeleteAllRoutes.delete('/', (req: Request, res: Response) => {
    videoRepository.deleteAllVideos()
    res.status(204).end()
})
videoRoutes.get('/', (req: Request, res: Response<VideoModels[]>) => {
       const videos = videoRepository.getAllVideos()
        res.status(200).send(videos);
})
videoRoutes.get('/:id', (req: RequestWithParams<VideoUpdateIdModels>, res: Response<VideoModels>) => {
    const videById = videoRepository.getVideosById(+req.params.id)
    if(!videById){
        res.status(404).end()
        return
    }
    if (videById) {
        res.status(200).send(videById)
    }
})
videoRoutes.post('/', validateCreateVideosMiddleWare, (req: RequestWithBody<VideoCreateModel>, res: Response<VideoModels | {}>) => {
   const createVideo = videoRepository.createVideo(req.body.title,req.body.author,req.body.availableResolutions)
    res.status(201).send(createVideo)
})
videoRoutes.put('/:id', validateUpdateVideosMiddleWare, (req: RequestWithParamsAndBody<VideoUpdateIdModels, VideoUpdateModel>, res: Response) => {
   const updateVideo = videoRepository.updateVideo(+req.params.id,
       req.body.title,req.body.author, req.body.availableResolutions,
       req.body.canBeDownloaded,req.body.minAgeRestriction, req.body.publicationDate)
    if(!updateVideo){
        res.status(404).end()
        return
    }
    if (updateVideo){
        res.status(204).end()
    }

})
videoRoutes.delete('/:id',(req:RequestWithParams<VideoUpdateIdModels>, res: Response) => {
    const deleteVideo = videoRepository.deleteVideoById(+req.params.id)
    if(!deleteVideo){
        res.status(404).end()
        return
    }
    if (deleteVideo){
        res.status(204).end()
    }

})

