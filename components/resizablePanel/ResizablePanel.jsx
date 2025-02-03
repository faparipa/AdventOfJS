'use client';
//import { useState, useCallback } from 'react';
import styles from './resizablePanel.module.css';

import React, { useState, useRef } from 'react';
// import styles from './resizablePanel.module.css';

const ResizablePanel = ({ initialSize, bgColor }) => {
  const [size, setSize] = useState(initialSize);
  const panelRef = useRef(null);
  const isResizing = useRef(false);
  const lastX = useRef(0);

  const startResizing = (e) => {
    isResizing.current = true;
    lastX.current = e.clientX;
    document.addEventListener('mousemove', resize);
    document.addEventListener('mouseup', stopResizing);
  };

  const resize = (e) => {
    if (isResizing.current) {
      const deltaX = e.clientX - lastX.current;
      setSize((prevSize) => ({
        width: Math.max(100, prevSize.width + deltaX), // Minimum width of 100px
        height: prevSize.height,
      }));
      lastX.current = e.clientX;
    }
  };

  const stopResizing = () => {
    isResizing.current = false;
    document.removeEventListener('mousemove', resize);
    document.removeEventListener('mouseup', stopResizing);
  };

  return (
    <div
      ref={panelRef}
      className={`${styles.panel} ${styles[bgColor]}`}
      style={{ width: `${size.width}px`, height: `${size.height}px` }}
    >
      <div className={styles.resizer} onMouseDown={startResizing} />
    </div>
  );
};

// export default function ResizablePanels() {
//   return (
//     <div className={styles.container}>
//       <div className={styles.container2}>
//         <ResizablePanel
//           initialSize={{ width: 300, height: 400 }}
//           bgColor='panel1'
//         />
//         <ResizablePanel
//           initialSize={{ width: 300, height: 400 }}
//           bgColor='panel2'
//         />
//       </div>
//       <div className={styles.container2}>
//         <ResizablePanel
//           initialSize={{ width: 600, height: 200 }}
//           bgColor='panel3'
//         />
//       </div>
//     </div>
//   );
// }
export default ResizablePanel;
