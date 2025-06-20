import React from 'react'
import './Card.css'
import type { UIProject } from '../domain';
import Tag from './Tag';
import Media from './Media';
import { motion } from 'framer-motion';
interface CardProps {
    data: UIProject
}

const Card: React.FC<CardProps> = ({ data }) => {
    const links = data.url ?? [];
    const tags = data.tags;
    const media = data.media;
    return (
        <>
            <motion.div
                layout // Enables smooth layout transitions when items are added/removed/reordered
                initial={{ opacity: 0, scale: 0.8 }} // Initial state when component mounts
                animate={{ opacity: 1, scale: 1 }} // Target state when component is present
                exit={{ opacity: 0, scale: 0.8 }} // State when component is about to unmount
                transition={{ duration: 0.3 }} // Animation duration

            >
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
            </motion.div >




        </>
    )
}

export default Card;
