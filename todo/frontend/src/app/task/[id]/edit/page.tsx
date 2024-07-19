'use client'

import React, { useEffect, useState } from 'react';
import TaskForm from '../../../../components/TaskForm';
import { useRouter, useParams } from 'next/navigation';
import { Task } from '../../../../types/task';

const EditTaskPage: React.FC = () => {
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

  const handleUpdateTask = async (updatedTask: Task) => {
    try {
      const response = await fetch(`http://localhost:8000/task/${id}/`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: updatedTask.user_id,
          task: updatedTask.task_name,
          category: updatedTask.category,
          status: updatedTask.status,
          deadline: updatedTask.deadline,
          memo: updatedTask.memo,
        }),
      });
      if (!response.ok) {
        const errorText = await response.text();  // エラーメッセージを取得
        throw new Error(`サーバーエラー: ${response.statusText} - ${errorText}`);
      }
      router.push(`/task/${id}`); // 編集後に詳細ページに戻る
    } catch (error) {
      console.error('フェッチエラー:', error);
    }
  };

  return (
    <div>
      {task ? (
        <TaskForm task={task} onSubmit={handleUpdateTask} />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default EditTaskPage;