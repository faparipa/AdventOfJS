'use client';
import { useState } from 'react';
import styles from './kanbanboard.module.css';

function KanbanBoardPage() {
  const initialKanbanData = {
    upNext: [
      {
        id: '1',
        text: 'Create a gift list for family and friends',
        done: false,
      },
      { id: '2', text: 'Decorate the tree', done: false },
      { id: '3', text: 'Plan Christmas Dinner', done: false },
      { id: '4', text: 'Replace burn out bulbs', done: false },
      { id: '5', text: 'Update Holiday Card List', done: false },
      { id: '6', text: 'Create Holiday Music Playlist', done: false },
    ],
    current: [{ id: '7', text: 'Plan Holiday Activities', done: false }],
    done: [
      { id: '8', text: 'Get All Wrapping Supplies', done: true },
      { id: '9', text: 'Deep Clean the House', done: true },
      { id: '10', text: 'Make cookies for Santa', done: true },
    ],
  };

  const [kanbanData, setKanbanData] = useState(initialKanbanData);

  const updateTaskStatus = (taskId, newStatus, newColumn) => {
    const newKanbanData = { ...kanbanData };
    const task = Object.values(newKanbanData)
      .flat()
      .find((task) => task.id === taskId);

    if (task) {
      task.done = newStatus;
      // Remove from all columns
      Object.keys(newKanbanData).forEach((column) => {
        newKanbanData[column] = newKanbanData[column].filter(
          (task) => task.id !== taskId
        );
      });

      // Add task to the new column
      newKanbanData[newColumn].push(task);
      setKanbanData(newKanbanData);
    }
  };

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData('taskId', taskId);
  };

  const handleDrop = (e, column) => {
    const taskId = e.dataTransfer.getData('taskId');
    updateTaskStatus(taskId, column === 'done', column);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleCheckboxChange = (e, taskId) => {
    const isChecked = e.target.checked;
    const column = isChecked
      ? 'done'
      : kanbanData.upNext.some((t) => t.id === taskId)
      ? 'upNext'
      : 'current';
    updateTaskStatus(taskId, isChecked, column);
  };

  const KanbanColumn = ({ columnName, tasks }) => (
    <div
      className={styles.card}
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, columnName)}
    >
      <h3>
        {columnName === 'upNext'
          ? 'UP Next'
          : columnName === 'current'
          ? 'Current'
          : 'Done'}
      </h3>
      <ul className={styles.todoContainer}>
        {tasks.map((task) => (
          <li
            key={task.id}
            draggable
            onDragStart={(e) => handleDragStart(e, task.id)}
          >
            <input
              type='checkbox'
              id={task.id}
              name={task.id}
              checked={task.done}
              onChange={(e) => handleCheckboxChange(e, task.id)}
            />
            <label htmlFor={task.id}>{task.text}</label>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div>
      <h2>Kanban Board</h2>
      <div className={styles.container}>
        {['upNext', 'current', 'done'].map((column, index) => (
          <KanbanColumn
            key={index}
            columnName={column}
            tasks={kanbanData[column]}
          />
        ))}
      </div>
    </div>
  );
}

export default KanbanBoardPage;
