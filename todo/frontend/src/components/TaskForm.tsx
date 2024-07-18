'use client'

import React, { useState } from 'react';
import { Task } from '../types/task';

type TaskFormProps = {
  task?: Task; // taskはオプショナル
  onSubmit: (task: Task) => void;
};

const TaskForm: React.FC<TaskFormProps> = ({ task = { task_id: 0, task_name: '', category: '', status: 'not started', deadline: '', memo: '' }, onSubmit }) => {
  const [formTask, setFormTask] = useState<Task>(task);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormTask({ ...formTask, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // task_nameが空文字またはundefinedでないことを確認
    if (formTask.task_name && formTask.task_name.trim()) {
      onSubmit(formTask);
    } else {
      alert('Task Name is required');
    }
  };

  return (
    <div>
      <h1>{formTask.task_id ? 'Edit Task' : 'Add Task'}</h1>
      <div className="form-group">
        <label>Task Name:</label>
        <input
          type="text"
          name="task_name"
          value={formTask.task_name || ''}
          onChange={handleChange}
          placeholder="Task Name"
        />
      </div>
      <div className="form-group">
        <label>Category:</label>
        <input
          type="text"
          name="category"
          value={formTask.category || ''}
          onChange={handleChange}
          placeholder="Category"
        />
      </div>
      <div className="form-group">
        <label>Status:</label>
        <select
          name="status"
          value={formTask.status || 'not started'}
          onChange={handleChange}
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
          name="deadline"
          value={formTask.deadline || ''}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Memo:</label>
        <textarea
          name="memo"
          value={formTask.memo || ''}
          onChange={handleChange}
          placeholder="Memo"
        />
      </div>
      <button onClick={handleSubmit}>Save</button>
    </div>
  );
};

export default TaskForm;