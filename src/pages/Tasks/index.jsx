import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import InstructorTasks from "./InstructorTasks";
import StudentTasks from "./StudentTasks";

function Tasks() {
  const { currentUser } = useAuth();
  const screen = currentUser.instructor ? (
    <InstructorTasks />
  ) : (
    <InstructorTasks />
  );
  return <div>{screen}</div>;
}

export default Tasks;
