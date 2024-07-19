'use client'

import React, { useState } from 'react';
import { Task } from '../types/task';

interface TaskFormProps {
  task: Task;
  onSubmit: (task: Task) => Promise<void>;
}

const TaskForm: React.FC<TaskFormProps> = ({ task, onSubmit }) => {
  const [formTask, setFormTask] = useState<Task>(task);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormTask({ ...formTask, [name]: value });
  };

  const handleSubmit = () => {
    if (formTask.task_name.trim()) {
      onSubmit(formTask);
    }
  };

  return (
    <div>
      <h1>{task.task_id ? 'Edit Task' : 'Add Task'}</h1>
      <div>
        <label>
          Task Name:
          <input name="task_name" value={formTask.task_name} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          Category:
          <input name="category" value={formTask.category} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          Status:
          <input name="status" value={formTask.status} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          Deadline:
          <input type="date" name="deadline" value={formTask.deadline} onChange={handleChange} />
        </label>
      </div>
      <div>
        <label>
          Memo:
          <textarea name="memo" value={formTask.memo || ''} onChange={handleChange} />
        </label>
      </div>
      <button onClick={handleSubmit}>Save</button>
    </div>
  );
};

export default TaskForm;