import React from 'react'
import styles from './Card.module.css'
import type { UIProject } from '../domain';
import Tag from './Tag';
import Media from './Media';
import { motion } from 'framer-motion';
import { useStore } from '../state';

interface CardProps {
    data: UIProject
}

const Card: React.FC<CardProps> = ({ data }) => {
    const theme = useStore((state) => state.theme);
    const links = data.url ?? [];
    const tags = data.tags;
    const media = data.media;

    const getFeaturedClass = () => {
        if (!data.featured) return "";
        return theme === 'dark' ? styles.featuredDark : styles.featured;
    };

    return (
        <>
            <motion.div
                layout
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}

            >
                <div data-cy="card" className={`${styles.card} ${getFeaturedClass()}`}>
                    <h3>{data.title}</h3>
                    <div className={styles.description}>{data.description.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}</div>

                    <div className={styles.media}>
                        {media.map((medium) => (
                            <Media key={medium.title} media={medium}></Media>
                        ))}
                    </div>
                    <div className={styles.links}>
                        {links.map((link) => (
                            <span key={link.title}>{link.type}: <a href={link.src}>{link.title}</a></span>
                        ))
                        }
                    </div>
                    <div className={styles["tag-container"]}>
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
