'use client'

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Task } from '../../../types/task';

const TaskDetailPage: React.FC = () => {
  const [task, setTask] = useState<Task | null>(null);
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`http://localhost:8000/task/${id}`);
        if (!response.ok) {
          throw new Error(`サーバーエラー: ${response.statusText}`);
        }
        const data = await response.json();
        setTask(data);
      } catch (error) {
        console.error('フェッチエラー:', error);
      }
    };

    if (id) {
      fetchTask();
    }
  }, [id]);

  const handleEdit = () => {
    router.push(`/task/${id}/edit`);
  };

  const handleBackToHome = () => {
    router.push('/');
  };

  return (
    <div>
      <h1>Task Detail</h1>
      {task ? (
        <div>
          <div><strong>Task:</strong> {task.task}</div>
          <div><strong>Category:</strong> {task.category}</div>
          <div><strong>User:</strong> {task.user_id}</div>
          <div><strong>Deadline:</strong> {task.deadline}</div>
          <div><strong>Memo:</strong> {task.memo}</div>
          <button onClick={handleEdit}>Edit Task</button>
          <button onClick={handleBackToHome}>Back to Home</button>
        </div>
      ) : (
        <div>読み込み中...</div>
      )}
    </div>
  );
};

export default TaskDetailPage;