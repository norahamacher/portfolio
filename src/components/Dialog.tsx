
import React, { useRef, useEffect, useCallback } from 'react';
import './Dialog.css';
import type { Media } from './Media';


interface DialogProps {
    isOpen: boolean;
    onClose: () => void;
    content: Media;
}


const Dialog: React.FC<DialogProps> = ({ isOpen, onClose, content }) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    // Effect to open/close the dialog using the native HTML dialog API
    useEffect(() => {
        const dialogElement = dialogRef.current;
        if (dialogElement) {
            if (isOpen && !dialogElement.open) {
                dialogElement.showModal();
            } else if (!isOpen) {
                dialogElement.close();
            }
        }
    }, [isOpen]);

    // Handle clicks outside the dialog (backdrop click)
    const handleBackdropClick = useCallback((event: React.MouseEvent<HTMLDialogElement>) => {
        const dialogElement = dialogRef.current;
        if (dialogElement) {
            const rect = dialogElement.getBoundingClientRect();
            const isInDialog = (
                rect.top <= event.clientY &&
                event.clientY <= rect.bottom &&
                rect.left <= event.clientX &&
                event.clientX <= rect.right
            );
            if (!isInDialog) {
                onClose(); // Close the dialog if click is outside
            }
        }
    }, [onClose]);

    // Handle native 'close' event from the dialog element (e.g., from Esc key)
    const handleNativeClose = useCallback(() => {
        onClose();
    }, [onClose]);

    useEffect(() => {
        const dialogElement = dialogRef.current;
        if (dialogElement) {
            // Add native 'close' event listener
            dialogElement.addEventListener('close', handleNativeClose);
            return () => {
                // Clean up the event listener on unmount
                dialogElement.removeEventListener('close', handleNativeClose);
            };
        }
    }, [handleNativeClose]);


    const renderContent = () => {
        if (!isOpen) { // Only render content if the dialog is logically open
            return null;
        }

        console.log(content.src)

        if (content.type === 'image') {
            return (
                <dialog
                    ref={dialogRef}
                    className="custom-dialog"
                    onClick={handleBackdropClick}
                >

                    <div className="content-container">
                        <img
                            src={content.src}
                            alt={content.alt || ''}
                            style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', display: 'block' }}
                        />
                    </div></dialog>
            );
        } else if (content.type === 'video') {
            return (
                <dialog
                    ref={dialogRef}
                    className="custom-dialog"
                    onClick={handleBackdropClick}
                >

                    <div className="content-container">
                        <video
                            src={content.src}
                            controls={true}
                            autoPlay={false}
                            loop={false}
                            style={{ maxWidth: '100%', maxHeight: '100%', display: 'block' }}
                        >
                            Your browser does not support the video tag.
                        </video></div></dialog>
            );
        }
        return null;
    };

    return (
        <>
            {renderContent()}
        </>
    );
};

export default Dialog;