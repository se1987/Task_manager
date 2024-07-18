import React from 'react';
import { Task } from '../src/types/task';

type TaskColumnProps = {
  title: string;
  tasks: Task[];
  onMove: (id: number, newStatus: string) => void;
  onDelete: (id: number) => void;
};

const TaskColumn: React.FC<TaskColumnProps> = ({ title, tasks, onMove, onDelete }) => {
  return (
    <div className="task-column">
      <h2>{title}</h2>
      {tasks.map(task => (
        <div key={task.task_id} className="task-card">
          <div><strong>Task:</strong> {task.task_name}</div>
          <div><strong>Category:</strong> {task.category}</div>
          <div><strong>User:</strong> {task.user_name}</div>
          <div><strong>Deadline:</strong> {task.deadline}</div>
          <div>
            <button onClick={() => onMove(task.task_id, 'not started')}>Not Started</button>
            <button onClick={() => onMove(task.task_id, 'in progress')}>In Progress</button>
            <button onClick={() => onMove(task.task_id, 'done')}>Done</button>
            <button onClick={() => onDelete(task.task_id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskColumn;