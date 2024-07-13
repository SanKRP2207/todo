// src/components/TaskList.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask, editTask, toggleTask } from '../redux/actions';

const TaskList = () => {
    const tasks = useSelector((state) => state.tasks);
    const dispatch = useDispatch();
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editingTaskText, setEditingTaskText] = useState('');

    const handleDeleteTask = (id) => {
        dispatch(deleteTask(id));
    };

    const handleEditTask = (id, text) => {
        setEditingTaskId(id);
        setEditingTaskText(text);
    };

    const handleSaveTask = (id) => {
        if (editingTaskText.trim()) {
            dispatch(editTask(id, editingTaskText));
            setEditingTaskId(null);
            setEditingTaskText('');
        }
    };

    const handleToggleTask = (id) => {
        dispatch(toggleTask(id));
    };

    return (
        <ul className="list-group">
            {tasks.map((task) => (
                <li
                    key={task.id}
                    className={`list-group-item d-flex justify-content-between align-items-center ${task.completed ? 'completed' : ''}`}
                >
                    <div className="task-content">
                        {editingTaskId === task.id ? (
                            <input
                                type="text"
                                className="form-control"
                                value={editingTaskText}
                                onChange={(e) => setEditingTaskText(e.target.value)}
                            />
                        ) : (
                            <span className="task-text" style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                                {task.text}
                            </span>
                        )}
                    </div>
                    <div className="task-actions">
                        {editingTaskId === task.id ? (
                            <button className="btn btn-success btn-sm me-2" onClick={() => handleSaveTask(task.id)}>
                                Save
                            </button>
                        ) : (
                            <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditTask(task.id, task.text)}>
                                Edit
                            </button>
                        )}
                        <button className="btn btn-success btn-sm me-2" onClick={() => handleToggleTask(task.id)}>
                            {task.completed ? 'Undo' : 'Mark as Done'}
                        </button>
                        <button className="btn btn-danger btn-sm me-2" onClick={() => handleDeleteTask(task.id)}>
                            Delete
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default TaskList;
