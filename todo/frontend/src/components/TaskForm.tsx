import React from 'react';
import { Task } from '../types/task';

type TaskColumnProps = {
  title: string;
  tasks: Task[];
  onMove: (id: number, newStatus: string) => void;
  onDelete: (id: number) => void;
  onViewDetail: (id: number) => void;
};

const TaskColumn: React.FC<TaskColumnProps> = ({ title, tasks, onMove, onDelete, onViewDetail }) => {
  const handleMove = (id: number, newStatus: string) => {
    onMove(id, newStatus);
  };

  return (
    <div className="task-column">
      <h2>{title}</h2>
      {tasks.map(task => (
        <div key={task.task_id} className="task-card">
          <div><strong>Task:</strong> {task.task_name}</div>
          <div><strong>Category:</strong> {task.category}</div>
          <div><strong>User:</strong> {task.user_id}</div>
          <div><strong>Deadline:</strong> {task.deadline}</div>
          <div>
            <button onClick={() => handleMove(task.task_id, 'not started')}>Not Started</button>
            <button onClick={() => handleMove(task.task_id, 'in progress')}>In Progress</button>
            <button onClick={() => handleMove(task.task_id, 'done')}>Done</button>
            <button onClick={() => onDelete(task.task_id)}>Delete</button>
            <button onClick={() => onViewDetail(task.task_id)}>View Detail</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskColumn;