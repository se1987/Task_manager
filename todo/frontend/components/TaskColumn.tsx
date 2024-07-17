import React from 'react';
import TaskItem from './TaskItem';

type Task = {
  id: number;
  title: string;
  status: string;
};

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
        <TaskItem key={task.id} {...task} onMove={onMove} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default TaskColumn;
