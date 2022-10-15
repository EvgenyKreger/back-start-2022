import {Request, Response} from "express";
import {VideoUpdateIdModels, VideoUpdateModel} from "../models/videoModels";
export const validateCreateVideosMiddleWare = (req: Request, res: Response, next: () => void) => {
    const body = req.body
    if (!body.title || !body.title.trim() || body.title.length > 40 || !body.author ||
        !body.author.trim() || body.author.length > 20 ||
        !body.availableResolutions) {
        res.status(400).send({
            errorsMessages: [
                {
                    message: "string",
                    field: "string",
                }
            ]
        })
        return;
    } else {
        next()
    }
}


export const validateUpdateVideosMiddleWare = (req: Request<VideoUpdateIdModels,VideoUpdateModel>, res: Response, next: () => void) => {
    const body = req.body
    if (!body.title  || !body.title.trim() || body.title.length > 40 || !body.author ||
        !body.author.trim() || body.author.length > 20 || !body.availableResolutions || !body.canBeDownloaded ||
        !body.minAgeRestriction || !body.publicationDate ||
        body.availableResolutions.length === 0 || !body.canBeDownloaded || typeof (body.canBeDownloaded) !== 'boolean' ||
        typeof (body.minAgeRestriction) !== 'number' || body.minAgeRestriction < 1 || body.minAgeRestriction > 18 ||
        typeof (body.publicationDate) !== 'string') {
        res.status(400).send({
            errorsMessages: [
                {
                    message: "string",
                    field: "string",
                }
            ]
        })
        return;
    } else {
        next()
    }
}

