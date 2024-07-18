'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { Task } from '../../../types/task';

const TaskDetailPage: React.FC = () => {
  const [task, setTask] = useState<Task | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState<Task | null>(null);
  const router = useRouter();
  const { id } = useParams(); // 正しい方法でルートパラメータを取得

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`http://localhost:8000/task/${id}`);
        if (!response.ok) {
          throw new Error(`サーバーエラー: ${response.statusText}`);
        }
        const data = await response.json();
        setTask(data);
        setEditedTask(data);
      } catch (error) {
        console.error('フェッチエラー:', error);
      }
    };

    if (id) {
      fetchTask();
    }
  }, [id]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedTask(task); // 編集をキャンセルして元の状態に戻す
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTask(prevTask => ({
      ...prevTask!,
      [e.target.name]: e.target.value
    }));
  };

  const handleSave = async () => {
    if (!editedTask) return;

    try {
      const response = await fetch(`http://localhost:8000/task/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editedTask),
      });
      if (!response.ok) {
        throw new Error(`サーバーエラー: ${response.statusText}`);
      }
      const data = await response.json();
      setTask(data);
      setIsEditing(false);
    } catch (error) {
      console.error('フェッチエラー:', error);
    }
  };

  if (!task) {
    return <div>読み込み中...</div>;
  }

  return (
    <div>
      <h1>タスク詳細</h1>
      {isEditing ? (
        <div>
          <div>
            <label>
              Task:
              <input
                type="text"
                name="task"
                value={editedTask.task}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              Category:
              <input
                type="text"
                name="category"
                value={editedTask.category}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              User:
              <input
                type="text"
                name="user_id"
                value={editedTask.user_id}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              Dedline:
              <input
                type="text"
                name="deadline"
                value={editedTask.deadline}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <button onClick={handleSave}>保存</button>
            <button onClick={handleCancel}>cancel</button>
          </div>
        </div>
      ) : (
        <div>
          <div><strong>Task:</strong> {task.task}</div>
          <div><strong>Category:</strong> {task.category}</div>
          <div><strong>User:</strong> {task.user_id}</div>
          <div><strong>DeadLine:</strong> {task.deadline}</div>
          <div><strong>Status:</strong> {task.status}</div>
          <button onClick={() => router.push('/')}>back to Home</button>
          <button onClick={handleEdit}>編集</button>
        </div>
      )}
    </div>
  );
};

export default TaskDetailPage;