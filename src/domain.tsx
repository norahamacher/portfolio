import type { Media } from "./components/Media";

export enum Category {
    WORKPLACE = "workplace",
    LANGUAGE = "language",
    FRAMEWORK = "framework",
    YEAR = "year",
    LIBRARY = "library",
    MOTIVATION = "motivation",
}

export enum Motivation {
    WORK = "work",
    PRIVATE = "private",
}
export type ProjectFilter = {
    type: Category,
    value: string
}

export type TagData = {
    type: Category,
    value: string
}

export type Link = {
    type: string,
    src: string,
    title: string,
}

export type Project = {
    "title": string,
    "description": string[],
    "year": number[],
    "framework": string[],
    "language": string[],
    "library": string[],
    "workplace": string,
    "id": string,
    "media": Media[]
    "url": Link[],
    "motivation": Motivation,
    "featured"?: boolean
}

export type UIProject = {
    "title": string,
    "description": string[],
    "id": string,
    "media": Media[]
    "url": Link[],
    "tags": TagData[],
    "featured"?: boolean
}