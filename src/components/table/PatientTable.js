import React from 'react';
import { ReactTable } from './ReactTable';

function PatientTable({data, setSelectedRows}) {

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
                setSelectedRows={setSelectedRows}
            />
        </div>
    )
}

export default PatientTable
