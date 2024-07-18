'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Task } from '../types/task';

interface TaskDetailProps {
  taskId: number;
}

const TaskDetail: React.FC<TaskDetailProps> = ({ taskId }) => {
  const [task, setTask] = useState<Task | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetch(`http://localhost:8000/task/${taskId}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => setTask(data))
      .catch(error => console.error('Fetch error:', error));
  }, [taskId]);

  if (!task) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">{task.task_name}</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="font-semibold">User:</p>
          <p>{task.user_name}</p>
        </div>
        <div>
          <p className="font-semibold">Category:</p>
          <p>{task.category}</p>
        </div>
        <div>
          <p className="font-semibold">Status:</p>
          <p>{task.status}</p>
        </div>
        <div>
          <p className="font-semibold">Deadline:</p>
          <p>{task.deadline}</p>
        </div>
      </div>
      <div className="mt-4">
        <p className="font-semibold">Memo:</p>
        <p>{task.memo}</p>
      </div>
      <button
        className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={() => router.push('/')}
      >
        Back to Task List
      </button>
    </div>
  );
};

export default TaskDetail;