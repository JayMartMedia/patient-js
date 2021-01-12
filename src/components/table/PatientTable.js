import React, { useState } from 'react';
import { ReactTable } from './ReactTable';

function PatientTable({data}) {
    const [selectedRows, setSelectedRows] = useState([]);

    const columns = [
        { Header: 'First Name', accessor: 'firstName' },
        { Header: 'Last Name', accessor: 'lastName' },
        { Header: 'DOB', accessor: 'dateOfBirth'},
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
