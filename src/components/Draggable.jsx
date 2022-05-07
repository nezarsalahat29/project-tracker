import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

export default function Draggable({ id, children }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id,
    });
    const style = { transform: CSS.Translate.toString(transform) };

    return (
        <div ref={setNodeRef} {...listeners} {...attributes}>
            {children}
        </div>
    );
}
