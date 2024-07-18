'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../styles.css';

// 開発環境のみconsole.logを出力する設定。.envも要参照。
const isDebugMode = process.env.NODE_ENV !== 'production';

type Task = {
  task_id: number;
  user_id: string;
  task: string;
  category: string;
  status: string;
  deadline: string;
  memo: string;
};

const AddTaskForm: React.FC = () => {
  const [newTask, setNewTask] = useState({
    user_id: '',
    task: '',
    category: '',
    status: 'not started',
    deadline: '',
    memo: ''
  });
  const [tasks, setTasks] = useState<Task[]>([]);
  const router = useRouter();

  const handleAddTask = () => {
    //新しいタスクを追加する関数
    const addTask = (newTask: Omit<Task, 'task_id'>) => {
      // log
      if (isDebugMode) {
        console.log('新しいタスクを追加しています:', newTask);
      }

      fetch('http://localhost:8000/task/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      })
      .then(response => {
        // log
        if (isDebugMode) {
          console.log('タスク追加後のレスポンスを受信しました:', response);
        }
        // 処理
        return response.json();
      })
      .then(data => {
        // log
        if (isDebugMode) {
          console.log('追加されたタスク:', data);
        }
        // 処理
        setTasks(prevTasks => [...prevTasks, data]);
      })
      .catch(error => {
        // log
        if (isDebugMode) {
          console.error('タスクの追加中にエラーが発生しました:', error);
        }
      });
    };

    if (newTask.task.trim()) {
      const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      const newTaskWithId = { ...newTask, task_id: storedTasks.length + 1 };
      storedTasks.push(newTaskWithId);
      localStorage.setItem('tasks', JSON.stringify(storedTasks));
      addTask(newTaskWithId); // 修正: addTask 関数を呼び出し
      router.push('/');
    }
  };

  return (
    <div>
      <h1>Add Task</h1>
      <div className="form-group">
        <label>User Name:</label>
        <input
          type="text"
          value={newTask.user_id}
          onChange={e => setNewTask({ ...newTask, user_id: e.target.value })}
          placeholder="User Name"
        />
      </div>
      <div className="form-group">
        <label>Task Name:</label>
        <input
          type="text"
          value={newTask.task}
          onChange={e => setNewTask({ ...newTask, task: e.target.value })}
          placeholder="Task Name"
        />
      </div>
      <div className="form-group">
        <label>Category:</label>
        <input
          type="text"
          value={newTask.category}
          onChange={e => setNewTask({ ...newTask, category: e.target.value })}
          placeholder="Category"
        />
      </div>
      <div className="form-group">
        <label>Status:</label>
        <select
          value={newTask.status}
          onChange={e => setNewTask({ ...newTask, status: e.target.value })}
        >
          <option value="not started">Not Started</option>
          <option value="in progress">In Progress</option>
          <option value="done">Done</option>
        </select>
      </div>
      <div className="form-group">
        <label>Deadline:</label>
        <input
          type="date"
          value={newTask.deadline}
          onChange={e => setNewTask({ ...newTask, deadline: e.target.value })}
        />
      </div>
      <div className="form-group">
        <label>Memo:</label>
        <textarea
          value={newTask.memo}
          onChange={e => setNewTask({ ...newTask, memo: e.target.value })}
          placeholder="Memo"
        />
      </div>
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

export default AddTaskForm;
