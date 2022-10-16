import {Request, Response} from "express";
import {VideoUpdateIdModels, VideoUpdateModel} from "../models/videoModels";

export const validateCreateVideosMiddleWare = (req: Request, res: Response, next: () => void) => {
    const body = req.body
    if (!body.title || !body.title.trim() || body.title.length > 40) {
        res.status(400).send({
            errorsMessages: [
                {
                    message: "maxLength: 40",
                    field: "title",
                }
            ]
        })
        return
    }
    if (!body.author || !body.author.trim() || body.author.length > 20) {
        res.status(400).send({
            errorsMessages: [
                {
                    message: "maxLength: 20",
                    field: "author",
                }
            ]
        })
        return
    }
    if (!body.availableResolutions) {
        res.status(400).send({
            errorsMessages: [
                {
                    message: "At least one resolution should be added",
                    field: "availableResolutions",
                }
            ]
        })
        return
    } else {
        next()
    }
}
export const validateUpdateVideosMiddleWare = (req: Request<VideoUpdateIdModels, VideoUpdateModel>, res: Response, next: () => void) => {
    const body = req.body
    if (!body.title || !body.title.trim() || body.title.length > 40 ) {
        res.status(400).send({
            errorsMessages: [
                {
                    message: "maxLength: 40",
                    field: "title",
                }
            ]
        })
        return;
    }
    if (!body.author || !body.author.trim() || body.author.length > 20) {
        res.status(400).send({
            errorsMessages: [
                {
                    message: "maxLength: 20",
                    field: "author",
                }
            ]
        })
        return;
    }
    if (!body.availableResolutions || body.availableResolutions.length === 0) {
        res.status(400).send({
            errorsMessages: [
                {
                    message: "At least one resolution should be added",
                    field: "availableResolutions",
                }
            ]
        })
        return;
    }
    if (!body.canBeDownloaded ||  typeof (body.canBeDownloaded) !== 'boolean') {
        res.status(400).send({
            errorsMessages: [
                {
                    message: "At least one canBeDownloaded should be added",
                    field: "canBeDownloaded",
                }
            ]
        })
        return;
    }
    if (!body.publicationDate || typeof (body.publicationDate) !== 'string') {
        res.status(400).send({
            errorsMessages: [
                {
                    message: "string",
                    field: "publicationDate",
                }
            ]
        })
        return;
    }
    if (typeof (body.minAgeRestriction) !== 'number' || body.minAgeRestriction < 1 || body.minAgeRestriction > 18) {
        res.status(400).send({
            errorsMessages: [
                {
                    message: "min 1 max 18",
                    field: "minAgeRestriction",
                }
            ]
        })
        return;
    }
    else {
        next()
    }
}

