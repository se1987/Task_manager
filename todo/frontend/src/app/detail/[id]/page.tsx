// src/app/detail/[id]/page.tsx
import React from 'react';
import TaskDetail from '../../../../components/TaskDetail';

interface PageProps {
  params: {
    id: string;
  };
}

const TaskDetailPage: React.FC<PageProps> = ({ params }) => {
  const taskId = parseInt(params.id, 10);

  return (
    <div>
      <TaskDetail taskId={taskId} />
    </div>
  );
};

export default TaskDetailPage;