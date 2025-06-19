import React from 'react'

import './Tag.css'

interface TagProps {
    title: string,
    type: string,
}

const Tag: React.FC<TagProps> = ({ title, type }) => {


    const classes = `tag ${type}`;
    return (

        <div className={classes}>
            {title}
        </div>


    )
}

export default Tag;
