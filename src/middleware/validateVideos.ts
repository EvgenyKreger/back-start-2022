import {Request, Response} from "express";
import {VideoUpdateIdModels, VideoUpdateModel} from "../models/videoModels";
const where = [ 'P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160']
export const validateCreateVideosMiddleWare = (req: Request, res: Response, next: () => void) => {
    const body = req.body
    const messages = []
    const what = req.body.availableResolutions
    const contains = (where: string[], what: string[])=>{
        for(let i=0; i<what.length; i++){
            if(where.indexOf(what[i]) == -1){
                messages.push({
                    message: "At least one resolution should be added",
                    field: "availableResolutions",
                })
            }
        }
    }
    contains(where,what)
    if (!body.title || !body.title.trim() || body.title.length > 40) {
        messages.push({
            message: "maxLength: 40",
            field: "title",
        })
    }
    if (!body.author || !body.author.trim() || body.author.length > 20) {
        messages.push({
            message: "maxLength: 20",
            field: "author",
        })
    }
    if (!body.availableResolutions || body.availableResolutions.length === 0) {
        messages.push({
            message: "At least one resolution should be added",
            field: "availableResolutions",
        })
    }
    if (messages.length) {
        res.status(400).send({
            errorsMessages: messages
        })
    } else {
        next()
    }
}
export const validateUpdateVideosMiddleWare = (req: Request<VideoUpdateIdModels, VideoUpdateModel>, res: Response, next: () => void) => {
    const body = req.body
    const messages = []
    const where = [ 'P144', 'P240', 'P360', 'P480', 'P720', 'P1080', 'P1440', 'P2160']
    const what = req.body.availableResolutions
    const contain = (where: string[], what: string[])=>{
        for(let i=0; i<what.length; i++){
            if(where.indexOf(what[i]) == -1){
                messages.push({
                    message: "At least one resolution should be added",
                    field: "availableResolutions",
                })
            }
        }
    }
    contain(where,what)
    if (!body.title || !body.title.trim() || body.title.length > 40) {
        messages.push({
            message: "maxLength: 40",
            field: "title",
        })
    }
    if (!body.author || !body.author.trim() || body.author.length > 20) {
        messages.push({
            message: "maxLength: 20",
            field: "author",
        })
    }
    if (!body.availableResolutions || body.availableResolutions.length === 0) {
        messages.push({
            message: "At least one resolution should be added",
            field: "availableResolutions",
        })
    }
    if (typeof (body.canBeDownloaded) !== 'boolean') {
        messages.push({
            message: "canBeDownloaded can be true or false",
            field: "canBeDownloaded",
        })
    }
    if (!body.publicationDate || typeof (body.publicationDate) !== 'string') {
        messages.push({
            message: "date time",
            field: "publicationDate",
        })
    }
    if (!body.minAgeRestriction || typeof (body.minAgeRestriction) !== 'number' || body.minAgeRestriction < 1 || body.minAgeRestriction > 18) {
        messages.push({
            message: "min 1 max 18",
            field: "minAgeRestriction",
        })
    }
    if (messages.length) {
        res.status(400).send({
            errorsMessages: messages
        })
    } else {
        next()
    }
}

