import React, { useState, useEffect } from 'react';
import { getTasks } from '../api/tasks';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import './TaskList.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await getTasks();
    setTasks(response.data);
  };

  const handleSave = () => {
    setEditingTask(null);
    fetchTasks();
  };

  const handleComplete = () => {
    fetchTasks();
  };

  return (
    <div className="task-list">
      <TaskForm task={editingTask} onSave={handleSave} />
      {tasks.map((task) => (
        <TaskItem 
          key={task._id} 
          task={task} 
          onDelete={fetchTasks} 
          onComplete={handleComplete} 
        />
      ))}
    </div>
  );
};

export default TaskList;
