'use client';
import React, { useState, useRef, useEffect } from 'react';
import styles from './ResizablePanels.module.css'; // CSS modul importálása

const ResizablePanels = () => {
  const [leftPanelWidth, setLeftPanelWidth] = useState(200);
  const [topPanelHeight, setTopPanelHeight] = useState(150);
  const [activeSeparator, setActiveSeparator] = useState(null); // Az aktív szeparátor nyomon követése
  const containerRef = useRef(null);

  // Az egér mozgásának kezelése
  const handleDrag = (e) => {
    const container = containerRef.current;
    if (!container || !activeSeparator) return;

    const containerRect = container.getBoundingClientRect();
    if (activeSeparator === 'left') {
      const newWidth = e.clientX - containerRect.left;
      if (newWidth >= 100 && newWidth <= containerRect.width - 100) {
        setLeftPanelWidth(newWidth);
      }
    } else if (activeSeparator === 'top') {
      const newHeight = e.clientY - containerRect.top;
      if (newHeight >= 50 && newHeight <= containerRect.height - 50) {
        setTopPanelHeight(newHeight);
      }
    }
  };

  // Az egér gomb felengedésekor történő kezelés
  const handleMouseUp = () => {
    setActiveSeparator(null); // Kihúzás után eltávolítjuk az aktív állapotot
    document.removeEventListener('mousemove', handleDrag);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  useEffect(() => {
    if (activeSeparator) {
      document.addEventListener('mousemove', handleDrag);
      document.addEventListener('mouseup', handleMouseUp);
    }

    // Tisztítás az effect lezárásakor
    return () => {
      document.removeEventListener('mousemove', handleDrag);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [activeSeparator]);

  const startDragging = (panel) => (e) => {
    setActiveSeparator(panel); // Beállítjuk az aktív szeparátort
  };

  return (
    <div ref={containerRef} className={styles.container}>
      {/* Felső panelok */}
      <div className={styles.topPanel}>
        <div
          className={styles.leftPanel}
          style={{ width: leftPanelWidth, height: topPanelHeight }}
        >
          Left Panel
        </div>
        <div
          className={`${styles.resizableHandle} ${
            activeSeparator === 'left' ? styles.active : ''
          }`} // Az osztály hozzáadása kattintás alapján
          onMouseDown={startDragging('left')}
        />
        <div className={styles.rightPanel} style={{ height: topPanelHeight }}>
          Right Panel
        </div>
      </div>

      {/* Alsó panel és elválasztó */}
      <div className={styles.bottomSection}>
        <div
          className={`${styles.separator} ${
            activeSeparator === 'top' ? styles.active : ''
          }`} // Az osztály hozzáadása kattintás alapján
          onMouseDown={startDragging('top')}
        />
        <div
          className={styles.bottomPanel}
          style={{ height: `calc(600px - ${topPanelHeight}px)` }}
        >
          Bottom Panel
        </div>
      </div>
    </div>
  );
};

export default ResizablePanels;
