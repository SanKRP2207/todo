// src/redux/reducers.js
import { ADD_TASK, DELETE_TASK, EDIT_TASK, TOGGLE_TASK, SET_TASKS } from './actions';

const initialState = {
  tasks: JSON.parse(localStorage.getItem('tasks')) || [],
};

const rootReducer = (state = initialState, action) => {
  let updatedTasks;
  switch (action.type) {
    case ADD_TASK:
      updatedTasks = [...state.tasks, action.payload];
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      return { ...state, tasks: updatedTasks };
    case DELETE_TASK:
      updatedTasks = state.tasks.filter((task) => task.id !== action.payload);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      return { ...state, tasks: updatedTasks };
    case EDIT_TASK:
      updatedTasks = state.tasks.map((task) =>
        task.id === action.payload.id ? { ...task, text: action.payload.newText } : task
      );
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      return { ...state, tasks: updatedTasks };
    case TOGGLE_TASK:
      updatedTasks = state.tasks.map((task) =>
        task.id === action.payload ? { ...task, completed: !task.completed } : task
      );
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      return { ...state, tasks: updatedTasks };
    case SET_TASKS:
      return { ...state, tasks: action.payload };
    default:
      return state;
  }
};

export default rootReducer;
