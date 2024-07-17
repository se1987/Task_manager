import React from 'react';

type TaskProps = {
  id: number;
  title: string;
  onMove: (id: number, newStatus: string) => void;
  onDelete: (id: number) => void;
  status: string;
};

const TaskItem: React.FC<TaskProps> = ({ id, title, onMove, onDelete, status }) => {
  return (
    <div className="task-item">
      <span>{title}</span>
      <div>
        {status !== 'not started' && <button onClick={() => onMove(id, 'not started')}>Not Started</button>}
        {status !== 'in progress' && <button onClick={() => onMove(id, 'in progress')}>In Progress</button>}
        {status !== 'done' && <button onClick={() => onMove(id, 'done')}>Done</button>}
        <button onClick={() => onDelete(id)}>Delete</button>
      </div>
    </div>
  );
};

export default TaskItem;
