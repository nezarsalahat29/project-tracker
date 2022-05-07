import React from 'react';
import { useDroppable } from '@dnd-kit/core';

export default function Droppable({ id, children }) {
    const { isOver, setNodeRef } = useDroppable({
        id,
    });
    const style = {
        backgroundColor: isOver ? 'rgb(250, 250, 250)' : undefined,
        height: '100%',
    };

    return (
        <div ref={setNodeRef} style={style}>
            {children}
        </div>
    );
}
