import React from 'react';
import TaskColumn from './TaskColumn';

type Task = {
  task_id: number;
  user_name: string;
  task_name: string;
  category: string;
  status: string;
  deadline: string;
  memo: string;
};

type TaskBoardProps = {
  tasks: Task[];
  onMove: (id: number, newStatus: string) => void;
  onDelete: (id: number) => void;
};

const TaskBoard: React.FC<TaskBoardProps> = ({ tasks, onMove, onDelete }) => {
  const statuses = [
    { status: 'not started', title: 'Not Started' },
    { status: 'in progress', title: 'In Progress' },
    { status: 'done', title: 'Done' },
  ];

  return (
    <div className="task-board">
      {statuses.map(({ status, title }) => (
        <TaskColumn
          key={status}
          title={title}
          tasks={tasks.filter(task => task.status === status)}
          onMove={onMove}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TaskBoard;
