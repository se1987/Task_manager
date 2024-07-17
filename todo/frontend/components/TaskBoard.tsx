import React from 'react';
import TaskColumn from './TaskColumn';

type Task = {
  id: number;
  title: string;
  status: string;
};

type TaskBoardProps = {
  tasks: Task[];
  onMove: (id: number, newStatus: string) => void;
  onDelete: (id: number) => void;
};

const TaskBoard: React.FC<TaskBoardProps> = ({ tasks, onMove, onDelete }) => {
  const statuses = ['not started', 'in progress', 'done'];

  return (
    <div className="task-board">
      {statuses.map(status => (
        <div key={status} className={`task-column-wrapper ${status.replace(' ', '-')}`}>
          <TaskColumn
            key={status}
            title={status}
            tasks={tasks.filter(task => task.status === status)}
            onMove={onMove}
            onDelete={onDelete}
          />
        </div>
      ))}
    </div>
  );
};

export default TaskBoard;
