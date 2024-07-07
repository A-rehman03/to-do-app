import React, { useState } from 'react';
import { addTask, updateTask } from '../api/tasks';
import './TaskForm.css';

const TaskForm = ({ task, onSave }) => {
  const [title, setTitle] = useState(task ? task.title : '');
  const [description, setDescription] = useState(task ? task.description : '');
  const [completed] = useState(task ? task.completed : false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = { title, description, completed };
    if (task) {
      await updateTask(task._id, newTask);
    } else {
      await addTask(newTask);
    }
    onSave();
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
     
      <button type="submit">{task ? 'Update Task' : 'Add Task'}</button>
    </form>
  );
};

export default TaskForm;
