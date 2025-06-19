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
    const langs = data.language.map(lang => { return { type: "language", value: lang } })
    const frameworks = data.framework.map(fram => { return { type: "framework", value: fram } })
    const years = data.year.map(year => { return { type: "year", value: year.toString() } });
    const workplace = { type: "workplace", value: data.workplace }
    const tags = [...libs, ...langs, ...years, ...frameworks, workplace];

    const links = data.url ?? [];
    console.log(links)
    return (
        <>
            <div className="card">
                <h3>{data.title}</h3>
                <div className="description">{data.description.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}</div>

                <div className="media">
                    {data.media.map((medium) => (
                        <Media key={medium.title} media={medium}></Media>
                    ))}
                </div>
                <div className="links">
                    {links.map((link) => (
                        <span>{link.type}: <a href={link.src}>{link.title}</a></span>
                    ))
                    }
                </div>
                <div className="tag-container">
                    {tags.map((tag) => (
                        <Tag key={tag.value} title={tag.value} type={tag.type}></Tag>
                    ))}
                </div>
            </div>




        </>
    )
}

export default Card;
