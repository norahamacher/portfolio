
import React, { useState } from 'react'

import './Media.css'

import Dialog from './Dialog';

interface MediaProps {
    media: Media
}

export type Media = {
    title: string,
    type: "image" | "video",
    src: "string",
    alt?: string,
}


const Media: React.FC<MediaProps> = ({ media }) => {

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const handleOpenDialog = () => setIsDialogOpen(true);
    const handleCloseDialog = () => setIsDialogOpen(false);
    return (
        <>

            <button onClick={handleOpenDialog}>{media.title}</button>
            <Dialog isOpen={isDialogOpen} onClose={handleCloseDialog} content={media}></Dialog>

        </>
    )
}

export default Media;
