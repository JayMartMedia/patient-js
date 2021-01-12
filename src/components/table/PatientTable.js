import React, { useState } from 'react';
import { ReactTable } from './ReactTable';

function PatientTable() {
    const [selectedRows, setSelectedRows] = useState([]);

    const data = [
        {id: 1, firstName: 'Jay', lastName: 'Day', },
        {id: 2, firstName: 'kay', lastName: 'Day', },
        {id: 3, firstName: 'lay', lastName: 'Day', },
        {id: 4, firstName: 'Jmay', lastName: 'Day', },
        {id: 5, firstName: 'nay', lastName: 'Day', },
        {id: 6, firstName: '0oay', lastName: 'Day', },
        {id: 1, firstName: 'Jay', lastName: 'Day', },
        {id: 2, firstName: 'kay', lastName: 'Day', },
        {id: 3, firstName: 'lay', lastName: 'Day', },
        {id: 4, firstName: 'Jmay', lastName: 'Day', },
        {id: 5, firstName: 'nay', lastName: 'Day', },
        {id: 6, firstName: '0oay', lastName: 'Day', },
    ]

    const columns = [
        { Header: 'id', accessor: 'id'},
        { Header: 'First Name', accessor: 'firstName' },
        { Header: 'Last Name', accessor: 'lastName' },
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
