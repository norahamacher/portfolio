import React from 'react'
import './Card.css'
import type { UIProject } from '../domain';
import Tag from './Tag';
import Media from './Media';

interface CardProps {
    data: UIProject
}

const Card: React.FC<CardProps> = ({ data }) => {
    const links = data.url ?? [];
    const tags = data.tags;
    const media = data.media;
    return (
        <>
            <div className="card">
                <h3>{data.title}</h3>
                <div className="description">{data.description.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}</div>

                <div className="media">
                    {media.map((medium) => (
                        <Media key={medium.title} media={medium}></Media>
                    ))}
                </div>
                <div className="links">
                    {links.map((link) => (
                        <span key={link.title}>{link.type}: <a href={link.src}>{link.title}</a></span>
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
