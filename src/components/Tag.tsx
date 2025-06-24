import React from 'react'

import './Tag.css'
import { useStore } from '../state';
import type { Category } from '../domain';
import { motion } from 'framer-motion';
interface TagProps {
    title: string,
    type: Category,
    closeable?: boolean;
}

const Tag: React.FC<TagProps> = ({ title, type, closeable }) => {

    const removeFilter = useStore((state => state.removeFilter));

    const classes = `tag ${type}`;
    const closeClasses = `close-btn ${closeable ? "" : "hidden"}`

    function onClick(e: React.MouseEvent) {
        e.stopPropagation();
        removeFilter({ type: type, value: title })
    }
    return (

        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            key={title}

        >
            <div data-cy="tag" className={classes}>
                {title}
                <div onClick={onClick} className={closeClasses}> ✖️ </div>
            </div>
        </motion.div>



    )
}

export default Tag;
