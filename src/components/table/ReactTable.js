import React, { useEffect } from 'react';
import { useTable, usePagination, useRowSelect } from 'react-table';
import AuthUtil from '../../authentication/authenticationUtility';
import classes from './ReactTable.module.scss';
import buttonClasses from '../buttons/Button.module.scss';

import Button from '../buttons/Button';
import IndeterminateCheckbox from '../IndeterminateCheckbox';



export const ReactTable = ({ columns, data, setSelectedRows, setSelectedPatient, currentUser }) => {
    // Use the state and functions returned from useTable to build your UI
    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      prepareRow,
      page, // Instead of using 'rows', we'll use page,
      canPreviousPage,
      canNextPage,
      pageOptions,
      pageCount,
      gotoPage,
      nextPage,
      previousPage,
      setPageSize,
      selectedFlatRows,
      state: { pageIndex, pageSize, selectedRowIds },
    } = useTable(
      {
        columns,
        data,
        autoResetPage: false
      },
      usePagination,
      useRowSelect,
      hooks => {
        /** If the user has the "patient:write" permission, add the select and edit columns **/
        if(AuthUtil.isUserHasPermission(currentUser, "patient:write")){
          hooks.visibleColumns.push(columns => [
            // Let's make a column for selection
            {
              id: 'selection',
              // The header can use the table's getToggleAllRowsSelectedProps method
              // to render a checkbox
              Header: ({ getToggleAllPageRowsSelectedProps }) => (
                <div className={classes.checkboxCol}>
                  <IndeterminateCheckbox {...getToggleAllPageRowsSelectedProps()} />
                </div>
              ),
              // The cell can use the individual row's getToggleRowSelectedProps method
              // to the render a checkbox
              Cell: ({ row }) => (
                <div className={classes.checkboxCol}>
                  <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                </div>
              ),
            },
            ...columns,
            {
              id: 'edit',
              Header: ({ getToggleAllPageRowsSelectedProps }) => (
                <div>
                  <p>Edit</p>
                </div>
              ),
              Cell: ({ row }) => (
                <div>
                  <Button 
                    className={buttonClasses.button}
                    text={'Edit'}
                    onClick={() => {setSelectedPatient(row.original)}}
                  />
                </div>
              ),
            },
          ])
        }
      }
    )

    useEffect(() => {
      setSelectedRows(selectedFlatRows.map(row => row.original));
    }, [selectedRowIds]) // eslint-disable-line react-hooks/exhaustive-deps
  
    // Render the UI for the table
    return (
      <>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row)
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return <td {...cell.getCellProps()}><div>{cell.render('Cell')}</div></td>
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
        <div className={classes.pagination}>
          <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
            {'<<'}
          </button>{' '}
          <button onClick={() => previousPage()} disabled={!canPreviousPage}>
            {'<'}
          </button>{' '}
          <button onClick={() => nextPage()} disabled={!canNextPage}>
            {'>'}
          </button>{' '}
          <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
            {'>>'}
          </button>{' '}
          <span>
            Page{' '}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{' '}
          </span>
          <span>
            | Go to page:{' '}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={e => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                gotoPage(page)
              }}
              style={{ width: '100px' }}
            />
          </span>{' '}
          <select
            value={pageSize}
            onChange={e => {
              setPageSize(Number(e.target.value))
            }}
          >
            {[10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                Show {pageSize}
              </option>
            ))}
          </select>
        </div>
      </>
    )
}