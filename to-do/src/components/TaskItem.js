import React, { useState } from 'react';
import { deleteTask, updateTask } from '../api/tasks';
import './TaskItem.css';

const TaskItem = ({ task, onDelete, onComplete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = async () => {
    setIsDeleted(true);
    await deleteTask(task._id);
    setTimeout(() => {
      onDelete();
    }, 500); // Adjust timing to match animation duration
  };

  const handleComplete = async () => {
    const updatedTask = { ...task, completed: !task.completed };
    await updateTask(task._id, updatedTask);
    onComplete();
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    const updatedTask = { ...task, title, description };
    await updateTask(task._id, updatedTask);
    setIsEditing(false);
    onComplete();
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''} ${isDeleted ? 'delete-animation' : 'insert-animation'}`}>
      {isEditing ? (
        <div>
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
          <button className="save" onClick={handleSave}>Save</button>
          <button className="cancel" onClick={() => setIsEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <h3>{task.title}</h3>
          <p>{task.description}</p>
          <button className="edit" onClick={handleEdit}>Edit</button>
          <button className="delete" onClick={handleDelete}>Delete</button>
          <button className="complete" onClick={handleComplete}>
            {task.completed ? 'Undo' : 'Complete'}
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
