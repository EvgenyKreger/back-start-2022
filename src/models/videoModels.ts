
export interface VideoCreateModel{
    title: string,
    author: string,
    availableResolutions: string[]

}
export interface VideoUpdateModel{
    title: string,
    author: string,
    availableResolutions: string[],
    canBeDownloaded: boolean,
    minAgeRestriction: number,
    publicationDate: string

}

export interface VideoModels {
    id: number,
    title: string,
    author: string,
    canBeDownloaded: boolean,
    minAgeRestriction: null | number,
    createdAt: string,
    publicationDate: string,
    availableResolutions: string[]
}

export interface VideoUpdateIdModels {
    id : string
}