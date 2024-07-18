'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../styles.css';

const AddTaskForm: React.FC = () => {
  const [newTask, setNewTask] = useState({
    user_name: '',
    task_name: '',
    category: '',
    status: 'not started',
    deadline: '',
    memo: ''
  });

  const router = useRouter();

  //新しいタスクを追加する関数
  const handleAddTask = () => {
    if (newTask.task_name.trim()) {
      const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      const newTaskWithId = { ...newTask, task_id: storedTasks.length + 1 };
      storedTasks.push(newTaskWithId);
      localStorage.setItem('tasks', JSON.stringify(storedTasks));
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
          value={newTask.user_name}
          onChange={e => setNewTask({ ...newTask, user_name: e.target.value })}
          placeholder="User Name"
        />
      </div>
      <div className="form-group">
        <label>Task Name:</label>
        <input
          type="text"
          value={newTask.task_name}
          onChange={e => setNewTask({ ...newTask, task_name: e.target.value })}
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
