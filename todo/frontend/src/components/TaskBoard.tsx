import React from 'react';
import TaskColumn from './TaskColumn';
import { Task } from '../types/task';

interface TaskBoardProps {
  tasks: Task[];
  onMove: (id: number, newStatus: string) => void;
  onDelete: (id: number) => void;
  onViewDetail: (id: number) => void;
}

const TaskBoard: React.FC<TaskBoardProps> = ({ tasks, onMove, onDelete, onViewDetail }) => {
  const notStartedTasks = tasks.filter(task => task.status === 'Not Started');
  const inProgressTasks = tasks.filter(task => task.status === 'In Progress');
  const doneTasks = tasks.filter(task => task.status === 'Done');

  return (
    <div className="task-board">
      <TaskColumn
        title="Not Started"
        tasks={notStartedTasks}
        onMove={onMove}
        onDelete={onDelete}
        onViewDetail={onViewDetail}
      />
      <TaskColumn
        title="In Progress"
        tasks={inProgressTasks}
        onMove={onMove}
        onDelete={onDelete}
        onViewDetail={onViewDetail}
      />
      <TaskColumn
        title="Done"
        tasks={doneTasks}
        onMove={onMove}
        onDelete={onDelete}
        onViewDetail={onViewDetail}
      />
    </div>
  );
};

export default TaskBoard;