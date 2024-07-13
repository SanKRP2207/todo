// src/App.js
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import { setTasks } from './redux/actions';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
      dispatch(setTasks(savedTasks));
    }
  }, [dispatch]);

  return (
    <div className="container">
      <h1 className="my-4">To-do</h1>
      <TaskInput />
      <TaskList />
    </div>
  );
};

export default App;
