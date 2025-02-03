import React from 'react';
import styles from './GridPanel.module.css';

const GridPanel = ({
  rows,
  columns,
  columnFr,
  rowFr,
  tempColumnFr,
  tempRowFr,
  handleChangeColumnFr,
  handleBlurColumnFr,
  handleChangeRowFr,
  handleBlurRowFr,
  columnGap,
  rowGap,
}) => {
  let gridTemplateColumns = `repeat(${columns}, 1fr)`;
  if (columnFr.length === columns) {
    gridTemplateColumns = columnFr.join(' ');
  }

  let gridTemplateRows = `repeat(${rows}, 1fr)`;
  if (rowFr.length === rows) {
    gridTemplateRows = rowFr.join(' ');
  }

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns,
    gridTemplateRows,
    gap: `${rowGap}px ${columnGap}px`,
  };

  const columnTitleStyle = {
    display: 'grid',
    gridTemplateColumns,
    margin: '2rem',
  };

  const rowTitleStyle = {
    display: 'grid',
    gridTemplateRows,
    height: '90%',
  };

  return (
    <div className={styles.gridPanel}>
      <div className={styles.rowPanel}>
        <div style={rowTitleStyle}>
          {[...Array(rows)].map((_, i) => (
            <input
              className={styles.rowTitle}
              key={`row${i}`}
              type='text'
              value={tempRowFr[i] || ''}
              onChange={(e) => handleChangeRowFr(e, i)}
              onBlur={(e) => handleBlurRowFr(e, i)}
            />
          ))}
        </div>
      </div>
      <div>
        <div style={columnTitleStyle}>
          {[...Array(columns)].map((_, i) => (
            <input
              className={styles.columnTitle}
              key={`col${i}`}
              type='text'
              value={tempColumnFr[i] || ''}
              onChange={(e) => handleChangeColumnFr(e, i)}
              onBlur={(e) => handleBlurColumnFr(e, i)}
            />
          ))}
        </div>

        <div className={styles.gridContainer} style={gridStyle}>
          {[...Array(rows * columns)].map((_, idx) => (
            <div key={idx} className={styles.gridItem}></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GridPanel;
