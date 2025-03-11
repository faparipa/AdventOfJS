// 'use client';
// import { useState } from 'react';
// import styles from './Table24.module.css';
// import Table24data from '@/lib/table24Data';

// const columnHeaders = [
//   { key: 'id', label: 'ID' },
//   { key: 'name', label: 'Name' },
//   { key: 'email', label: 'Email Address' },
//   { key: 'title', label: 'Job Title' },
// ];

// export default function Table24Page() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const [sortConfig, setSortConfig] = useState({
//     key: null,
//     direction: 'ascending',
//   });
//   const [data, setData] = useState(Table24data); // Store the table data in state
//   const [editableRow, setEditableRow] = useState(null); // Track which row is editable
//   const itemsPerPage = 10;

//   const totalPages = Math.ceil(data.length / itemsPerPage);

//   // Function to handle sorting
//   const sortData = (data) => {
//     if (!sortConfig.key) return data;

//     const sortedData = [...data].sort((a, b) => {
//       if (a[sortConfig.key] < b[sortConfig.key])
//         return sortConfig.direction === 'ascending' ? -1 : 1;
//       if (a[sortConfig.key] > b[sortConfig.key])
//         return sortConfig.direction === 'ascending' ? 1 : -1;
//       return 0;
//     });

//     return sortedData;
//   };

//   // Paginate the data after sorting
//   const sortedData = sortData(data);
//   const paginatedData = sortedData.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const handlePageChange = (newPage) => {
//     if (newPage >= 1 && newPage <= totalPages) {
//       setCurrentPage(newPage);
//     }
//   };

//   const handleSort = (key) => {
//     let direction = 'ascending';
//     if (sortConfig.key === key && sortConfig.direction === 'ascending') {
//       direction = 'descending';
//     }
//     setSortConfig({ key, direction });
//   };

//   const handleEdit = (rowId) => {
//     setEditableRow(rowId);
//   };

//   const handleUpdate = (rowId, updatedValues) => {
//     const updatedData = data.map((row) =>
//       row.id === rowId ? { ...row, ...updatedValues } : row
//     );
//     setData(updatedData);
//
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.wrapper}>
//         <table
//           className={styles.table}
//           cellPadding='0'
//           cellSpacing='0'
//           width='100%'
//         >
//           <thead>
//             <tr>
//               {columnHeaders.map(({ key, label }) => (
//                 <th key={key} className={styles.header__id}>
//                   {label}
//                   <button
//                     className={`${styles.sort} ${styles.ascending}`}
//                     onClick={() => handleSort(key)}
//                   >
//                     <svg
//                       width='17'
//                       height='21'
//                       viewBox='0 0 17 21'
//                       xmlns='http://www.w3.org/2000/svg'
//                     >
//                       <path
//                         className={` ${
//                           sortConfig.key === key &&
//                           sortConfig.direction === 'ascending'
//                             ? `${styles.ascending}`
//                             : `${styles.descending}`
//                         } `}
//                         d='M16.9706 8.48528L8.48529 0L9.29832e-06 8.48528H16.9706Z'
//                       />
//                       <path
//                         className={`${styles.sort} ${
//                           sortConfig.key === key &&
//                           sortConfig.direction === 'descending'
//                             ? `${styles.ascending}`
//                             : `${styles.descending}`
//                         } `}
//                         d='M1.00136e-05 12.4853L8.48529 20.9706L16.9706 12.4853L1.00136e-05 12.4853Z'
//                       />
//                     </svg>
//                   </button>
//                 </th>
//               ))}
//               <th></th>
//             </tr>
//           </thead>
//           <tbody className={styles.tbody}>
//             {paginatedData.map((row) => (
//               <tr key={row.id}>
//                 <td className={styles.td}>
//                   <input
//                     type='text'
//                     disabled={editableRow !== row.id}
//                     value={row.id}
//                     onChange={(e) =>
//                       editableRow === row.id &&
//                       handleUpdate(row.id, { id: e.target.value })
//                     }
//                   />
//                 </td>
//                 <td className={styles.td}>
//                   <input
//                     type='text'
//                     disabled={editableRow !== row.id}
//                     value={row.name}
//                     onChange={(e) =>
//                       editableRow === row.id &&
//                       handleUpdate(row.id, { name: e.target.value })
//                     }
//                   />
//                 </td>
//                 <td className={styles.title}>
//                   <input
//                     type='text'
//                     disabled={editableRow !== row.id}
//                     value={row.email}
//                     onChange={(e) =>
//                       editableRow === row.id &&
//                       handleUpdate(row.id, { email: e.target.value })
//                     }
//                   />
//                 </td>
//                 <td className={styles.title}>
//                   <input
//                     type='text'
//                     disabled={editableRow !== row.id}
//                     value={row.title}
//                     onChange={(e) =>
//                       editableRow === row.id &&
//                       handleUpdate(row.id, { title: e.target.value })
//                     }
//                   />
//                 </td>
//                 <td>
//                   {editableRow === row.id ? (
//                     <button
//                       className={styles.update}
//                       onClick={() => setEditableRow(null)} // Update button to save changes
//                     >
//                       <img src='/update.svg' alt='Update' />
//                     </button>
//                   ) : (
//                     <button
//                       className={styles.edit}
//                       onClick={() => handleEdit(row.id)} // Edit button to enable editing
//                     >
//                       <img src='/edit.svg' alt='Edit' />
//                     </button>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//           <tfoot className={styles.tfoot}>
//             <tr>
//               <td colSpan='2'>{data.length} Results</td>
//               <td colSpan='3'>
//                 <div className={`${styles.pagination} ${styles.edit}`}>
//                   <button
//                     className={styles.previous}
//                     onClick={() => handlePageChange(currentPage - 1)}
//                   >
//                     <img src='/chevron--left.svg' alt='Previous' />
//                   </button>

//                   <input
//                     type='text'
//                     name='currentPage'
//                     value={currentPage}
//                     onChange={(e) => setCurrentPage(Number(e.target.value))}
//                     id='currentPage'
//                     min={1}
//                     max={totalPages}
//                   />

//                   <span>&nbsp;of&nbsp;</span>
//                   <span>{totalPages}</span>

//                   <button
//                     className={styles.next}
//                     onClick={() => handlePageChange(currentPage + 1)}
//                   >
//                     <img src='/chevron--right.svg' alt='Next' />
//                   </button>
//                 </div>
//               </td>
//             </tr>
//           </tfoot>
//         </table>
//       </div>
//     </div>
//   );
// }
//with API
'use client';
import { useState, useEffect } from 'react';
import styles from './Table24.module.css';

const columnHeaders = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email Address' },
  { key: 'title', label: 'Job Title' },
];

export default function Table24Page() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending',
  });
  const [data, setData] = useState([]); // Data from backend
  const [editableRow, setEditableRow] = useState(null); // Track which row is editable
  const [searchQuery, setSearchQuery] = useState(''); // Search query
  const itemsPerPage = 10;

  const totalPages = Math.ceil(data.length / itemsPerPage);

  // Fetch the data from the backend on page load
  useEffect(() => {
    async function fetchData() {
      const response = await fetch('/api/data');
      const result = await response.json();
      setData(result); // Update state with fetched data
    }
    fetchData();
  }, []);

  // Function to handle sorting
  const sortData = (data) => {
    if (!sortConfig.key) return data;

    const sortedData = [...data].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key])
        return sortConfig.direction === 'ascending' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key])
        return sortConfig.direction === 'ascending' ? 1 : -1;
      return 0;
    });

    return sortedData;
  };

  // Filtered data based on the search query
  const filteredData = data.filter((row) => {
    return (
      row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const sortedData = sortData(filteredData);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleEdit = (rowId) => {
    setEditableRow(rowId);
  };

  const handleUpdate = async (rowId, updatedValues) => {
    // Update the local state first
    const updatedData = data.map((row) =>
      row.id === rowId ? { ...row, ...updatedValues } : row
    );
    setData(updatedData);

    // Now send the updated data to the backend
    const response = await fetch('/api/data', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: rowId, updatedValues }),
    });

    if (response.ok) {
      const updatedRow = await response.json();
      console.log('Row updated:', updatedRow);
    } else {
      console.error('Failed to update row');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        {/* Search Input */}
        <div className={styles.searchContainer}>
          <input
            type='text'
            placeholder='Search...'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <table
          className={styles.table}
          cellPadding='0'
          cellSpacing='0'
          width='100%'
        >
          <thead>
            <tr>
              {columnHeaders.map(({ key, label }) => (
                <th key={key} className={styles.header__id}>
                  {label}
                  <button
                    className={`${styles.sort} ${styles.ascending}`}
                    onClick={() => handleSort(key)}
                  >
                    <svg
                      width='17'
                      height='21'
                      viewBox='0 0 17 21'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        className={` ${
                          sortConfig.key === key &&
                          sortConfig.direction === 'ascending'
                            ? `${styles.ascending}`
                            : `${styles.descending}`
                        } `}
                        d='M16.9706 8.48528L8.48529 0L9.29832e-06 8.48528H16.9706Z'
                      />
                      <path
                        className={`${styles.sort} ${
                          sortConfig.key === key &&
                          sortConfig.direction === 'descending'
                            ? `${styles.ascending}`
                            : `${styles.descending}`
                        } `}
                        d='M1.00136e-05 12.4853L8.48529 20.9706L16.9706 12.4853L1.00136e-05 12.4853Z'
                      />
                    </svg>
                  </button>
                </th>
              ))}
              <th></th>
            </tr>
          </thead>
          <tbody className={styles.tbody}>
            {paginatedData.map((row) => (
              <tr key={row.id}>
                <td className={styles.td}>
                  <input type='text' disabled={true} defaultValue={row.id} />
                </td>
                <td className={styles.td}>
                  <input
                    type='text'
                    disabled={editableRow !== row.id}
                    value={row.name}
                    onChange={(e) =>
                      editableRow === row.id &&
                      handleUpdate(row.id, { name: e.target.value })
                    }
                  />
                </td>
                <td className={styles.title}>
                  <input
                    type='text'
                    disabled={editableRow !== row.id}
                    value={row.email}
                    onChange={(e) =>
                      editableRow === row.id &&
                      handleUpdate(row.id, { email: e.target.value })
                    }
                  />
                </td>
                <td className={styles.title}>
                  <input
                    type='text'
                    disabled={editableRow !== row.id}
                    value={row.title}
                    onChange={(e) =>
                      editableRow === row.id &&
                      handleUpdate(row.id, { title: e.target.value })
                    }
                  />
                </td>
                <td>
                  {editableRow === row.id ? (
                    <button
                      className={styles.update}
                      onClick={() => setEditableRow(null)}
                    >
                      <img src='/update.svg' alt='Update' />
                    </button>
                  ) : (
                    <button
                      className={styles.edit}
                      onClick={() => handleEdit(row.id)}
                    >
                      <img src='/edit.svg' alt='Edit' />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className={styles.tfoot}>
            <tr>
              <td colSpan='2'>{data.length} Results</td>
              <td colSpan='3'>
                <div className={`${styles.pagination} ${styles.edit}`}>
                  <button
                    className={styles.previous}
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    <img src='/chevron--left.svg' alt='Previous' />
                  </button>

                  <input
                    type='text'
                    name='currentPage'
                    value={currentPage}
                    onChange={(e) => setCurrentPage(Number(e.target.value))}
                    id='currentPage'
                    min={1}
                    max={totalPages}
                  />

                  <span>&nbsp;of&nbsp;</span>
                  <span>{totalPages}</span>

                  <button
                    className={styles.next}
                    onClick={() => handlePageChange(currentPage + 1)}
                  >
                    <img src='/chevron--right.svg' alt='Next' />
                  </button>
                </div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
