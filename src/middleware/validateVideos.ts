import {Request, Response} from "express";
import {VideoUpdateIdModels, VideoUpdateModel} from "../models/videoModels";

export const validateCreateVideosMiddleWare = (req: Request, res: Response, next: () => void) => {
    const body = req.body
    const messages = []
    if (!body.title || !body.title.trim() || body.title.length > 40 ) {
        messages.push({
            message: "maxLength: 40",
            field: "title",
        })
    }
    if (!body.author || !body.author.trim() || body.author.length > 20) {
        messages.push( {
            message: "maxLength: 20",
            field: "author",
        })
    }
    if (!body.availableResolutions || body.availableResolutions.length === 0) {
        messages.push( {
            message: "At least one resolution should be added",
            field: "availableResolutions",
        })
    }
    if(messages.length){
        res.status(400).send({
            errorsMessages:messages
        })
    }
    else {
        next()
    }
}
export const validateUpdateVideosMiddleWare = (req: Request<VideoUpdateIdModels, VideoUpdateModel>, res: Response, next: () => void) => {
    const body = req.body
    const messages = []
    if (!body.title || !body.title.trim() || body.title.length > 40 ) {
        messages.push({
            message: "maxLength: 40",
            field: "title",
        })
    }
    if (!body.author || !body.author.trim() || body.author.length > 20) {
        messages.push( {
            message: "maxLength: 20",
            field: "author",
        })
    }
    if (!body.availableResolutions || body.availableResolutions.length === 0) {
        messages.push( {
            message: "At least one resolution should be added",
            field: "availableResolutions",
        })
    }
    if (!body.canBeDownloaded ||  typeof (body.canBeDownloaded) !== 'boolean') {
        messages.push( {
            message: "canBeDownloaded can be true or false",
            field: "canBeDownloaded",
        })
    }
    if (!body.publicationDate || typeof (body.publicationDate) !== 'string') {
        messages.push( {
            message: "date time",
            field: "publicationDate",
        })
    }
    if ( !body.minAgeRestriction || typeof (body.minAgeRestriction) !== 'number' || body.minAgeRestriction < 1 || body.minAgeRestriction > 18) {
        messages.push( {
            message: "min 1 max 18",
            field: "minAgeRestriction",
        })
    }
    if(messages.length){
        res.status(400).send({
            errorsMessages:messages
        })
    }
    else {
        next()
    }
}

