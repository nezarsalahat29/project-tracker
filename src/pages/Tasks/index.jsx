import React, { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import InstructorTasks from './InstructorTasks';
import StudentTasks from './StudentTasks';

function Tasks() {
    const { currentUser } = useAuth();

    useEffect(() => {
        window.scroll(0, 0);
    }, []);

    const screen = currentUser.instructor ? (
        <InstructorTasks />
    ) : (
        <StudentTasks />
    );
    return <div>{screen}</div>;
}

export default Tasks;
