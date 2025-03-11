'use client';

import { useState, useEffect } from 'react';
import styles from './gridgenerator.module.css';

import GridForm from '@/components/gridGenerator/GridForm';
import GridPanel from '@/components/gridGenerator/GridPanel';
import CodePanel from '@/components/gridGenerator/CodePanel';

function GridGeneratorPage() {
  const [columns, setColumns] = useState(3);
  const [rows, setRows] = useState(3);
  const [columnGap, setColumnGap] = useState(0);
  const [rowGap, setRowGap] = useState(0);
  const [columnFr, setColumnFr] = useState(Array(3).fill('1fr'));
  const [rowFr, setRowFr] = useState(Array(3).fill('1fr'));
  const [tempRowFr, setTempRowFr] = useState([...rowFr]);
  const [tempColumnFr, setTempColumnFr] = useState([...columnFr]);
  const [isCode, setIsCode] = useState(false);
  // Update columnFr and rowFr whenever columns or rows change
  const updateFrArray = (prev, length) => {
    if (prev.length !== length) {
      return Array(length).fill('1fr');
    }
    return prev;
  };

  useEffect(() => {
    setTempColumnFr((prev) => updateFrArray(prev, columns));
    setColumnFr((prev) => updateFrArray(prev, columns));
    setTempRowFr((prev) => updateFrArray(prev, rows));
    setRowFr((prev) => updateFrArray(prev, rows));
  }, [columns, rows]);

  const handleChange = (setter) => (e) => setter(Number(e.target.value) || 0);

  const handleChangeRowFr = (e, index) => {
    const newTempRowFr = [...tempRowFr];
    newTempRowFr[index] = e.target.value;
    setTempRowFr(newTempRowFr);
  };

  const handleBlurRowFr = (e, index) => {
    const newRowFr = [...rowFr];
    newRowFr[index] = e.target.value;
    setRowFr(newRowFr);
  };

  const handleChangeColumnFr = (e, index) => {
    const newTempColumnFr = [...tempColumnFr];
    newTempColumnFr[index] = e.target.value;
    setTempColumnFr(newTempColumnFr);
  };

  const handleBlurColumnFr = (e, index) => {
    const newColumnFr = [...columnFr];
    newColumnFr[index] = e.target.value;
    setColumnFr(newColumnFr);
  };

  const getCode = (e) => {
    e.preventDefault();
    setIsCode(true);
  };

  return (
    <div className={styles.container}>
      <GridForm
        columns={columns}
        setColumns={setColumns}
        rows={rows}
        setRows={setRows}
        columnGap={columnGap}
        setColumnGap={setColumnGap}
        rowGap={rowGap}
        setRowGap={setRowGap}
        handleChange={handleChange}
        isCode={isCode}
        setIsCode={setIsCode}
        getCode={getCode}
      />

      {!isCode ? (
        <GridPanel
          rows={rows}
          columns={columns}
          columnFr={columnFr}
          rowFr={rowFr}
          tempColumnFr={tempColumnFr}
          tempRowFr={tempRowFr}
          handleChangeColumnFr={handleChangeColumnFr}
          handleBlurColumnFr={handleBlurColumnFr}
          handleChangeRowFr={handleChangeRowFr}
          handleBlurRowFr={handleBlurRowFr}
          columnGap={columnGap}
          rowGap={rowGap}
        />
      ) : (
        <CodePanel
          setIsCode={setIsCode}
          columnFr={columnFr}
          rowFr={rowFr}
          columnGap={columnGap}
          rowGap={rowGap}
          setColumns={setColumns}
          setRows={setRows}
          setColumnGap={setColumnGap}
          setRowGap={setRowGap}
        />
      )}
    </div>
  );
}

export default GridGeneratorPage;
