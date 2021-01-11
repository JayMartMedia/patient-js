import React, { useState } from 'react';
import { ReactTable } from './ReactTable';

function PatientTable() {
    const [selectedRows, setSelectedRows] = useState([]);

    const data = [
        {id: 1, firstName: 'Jay', lastName: 'Day', edit: "false"},
        {id: 2, firstName: 'kay', lastName: 'Day', edit: "true"},
        {id: 3, firstName: 'lay', lastName: 'Day', edit: "false"},
        {id: 4, firstName: 'Jmay', lastName: 'Day', edit: true},
        {id: 5, firstName: 'nay', lastName: 'Day', edit: false},
        {id: 6, firstName: '0oay', lastName: 'Day', edit: true},
        {id: 1, firstName: 'Jay', lastName: 'Day', edit: false},
        {id: 2, firstName: 'kay', lastName: 'Day', edit: true},
        {id: 3, firstName: 'lay', lastName: 'Day', edit: false},
        {id: 4, firstName: 'Jmay', lastName: 'Day', edit: true},
        {id: 5, firstName: 'nay', lastName: 'Day', edit: false},
        {id: 6, firstName: '0oay', lastName: 'Day', edit: true},
    ]

    const columns = [
        { Header: 'id', accessor: 'id'},
        { Header: '', accessor: 'selected'},
        { Header: 'First Name', accessor: 'firstName' },
        { Header: 'Last Name', accessor: 'lastName' },
        { Header: 'Edit', accessor: 'edit' }
    ];

    return (
        <div>
            <ReactTable 
                columns={columns}
                data={data}
            />
        </div>
    )
}

export default PatientTable
