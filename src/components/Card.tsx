import React from 'react'

import './Card.css'

import type { Project } from '../domain';
import Tag from './Tag';
import Media from './Media';

interface CardProps {
    data: Project
}

const Card: React.FC<CardProps> = ({ data }) => {


    const libs = data.library.map(lib => { return { type: "library", value: lib } })
    const lang = { type: "language", value: data.language }
    const frameworks = data.framework.map(fram => { return { type: "framework", value: fram } })
    const years = data.year.map(year => { return { type: "year", value: year.toString() } });
    const workplace = { type: "workplace", value: data.workplace }
    const tags = [...libs, lang, ...years, ...frameworks, workplace];


    return (
        <>
            <div className="card">
                <h3>{data.title}</h3>
                <div className="description">{data.description}</div>

                <div className="media">
                    {data.media.map((medium) => (
                        <Media media={medium}></Media>
                    ))}
                </div>
                <div className="tag-container">
                    {tags.map((tag) => (
                        <Tag title={tag.value} type={tag.type}></Tag>
                    ))}
                </div>
            </div>




        </>
    )
}

export default Card;
