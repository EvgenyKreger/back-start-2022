import {VideoModels} from "../models/videoModels";

export let videos: VideoModels[] = []

export const videoRepository = {
    deleteAllVideos() {
        videos = []
    },
    getAllVideos() {
        if (videos)
            return videos
    },
    getVideosById(id: number) {
        const needId = videos.find(el => el.id === id)
        if (!needId) {
            return false
        }
        if (needId) {
            return needId
        }
    },
    createVideo(title: string, author: string, availableResolutions: string[]) {
        const currentTime = new Date();
        const currentDataPlusOneDay = currentTime.setDate(currentTime.getDate() + 1);
        const rightDataPlusOneDay = currentTime.toISOString();
        const createObj: VideoModels = {
            id: +new Date(),
            title: title,
            author: author,
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: new Date().toISOString(),
            publicationDate: rightDataPlusOneDay,
            availableResolutions: availableResolutions
        }
        if (createObj)
            videos.push(createObj)
        return createObj
    },
    updateVideo(id: number, title: string, author: string, availableResolutions: string[],
                canBeDownloaded: boolean, minAgeRestriction: number | null,
                publicationDate: string) {
        const needId = videos.find(el => el.id === id)
        if (!needId) {
            return false
        } else if (needId) {
            needId.title = title
            needId.author = author
            needId.availableResolutions = availableResolutions
            needId.canBeDownloaded = canBeDownloaded
            needId.minAgeRestriction = minAgeRestriction
            needId.publicationDate = publicationDate
            return true
        }
    },
    deleteVideoById(id: number) {
        const needId = videos.find(el => el.id === id)
        if (!needId) {
            return false
        }
        if (needId) {
            const index = videos.indexOf(needId)
            videos.splice(index, 1)
            return true
        }
    }

}