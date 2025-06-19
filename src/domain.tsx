import type { Media } from "./components/Media";

export const AVAILABLE_FILTERS = ["workplace", "language", "framework", "year", "library"] as const;

export type Filter = typeof AVAILABLE_FILTERS[number];

export type ProjectFilter = {
    type: Filter,
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

}