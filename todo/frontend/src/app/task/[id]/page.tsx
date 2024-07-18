'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { Task } from '../../../types/task';

const TaskDetailPage: React.FC = () => {
  const [task, setTask] = useState<Task | null>(null);
  const router = useRouter();
  const { id } = useParams(); // Correct way to get route parameters in App Router

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`http://localhost:8000/task/${id}`);
        if (!response.ok) {
          throw new Error(`Server error: ${response.statusText}`);
        }
        const data = await response.json();
        setTask(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    if (id) {
      fetchTask();
    }
  }, [id]);

  if (!task) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Task Detail</h1>
      <div><strong>Task:</strong> {task.task}</div>
      <div><strong>Category:</strong> {task.category}</div>
      <div><strong>User:</strong> {task.user_id}</div>
      <div><strong>Deadline:</strong> {task.deadline}</div>
      <div><strong>Status:</strong> {task.status}</div>
      <button onClick={() => router.push('/')}>Back to Home</button>
    </div>
  );
};

export default TaskDetailPage;