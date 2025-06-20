import React from 'react'

import './Tag.css'
import { useStore } from '../state';
import type { Category } from '../domain';

interface TagProps {
    title: string,
    type: Category,
    closeable?: boolean;
}

const Tag: React.FC<TagProps> = ({ title, type, closeable }) => {

    const removeFilter = useStore((state => state.removeFilter));

    const classes = `tag ${type}`;
    const closeClasses = `close-btn ${closeable ? "" : "hidden"}`

    return (

        <div className={classes}>
            {title}
            <div onClick={() => removeFilter({ type: type, value: title })} className={closeClasses}> ✖️ </div>
        </div>


    )
}

export default Tag;
