import React from 'react';
import { ReactTable } from './ReactTable';
import classes from './PatientTable.module.scss';

function PatientTable({data, setSelectedRows, setSelectedPatient, currentUser}) {

    const columns = [
        { Header: 'First Name', accessor: 'firstName' },
        { Header: 'Last Name', accessor: 'lastName' },
        { Header: 'DOB', accessor: 'dateOfBirth'},
    ];

    return (
        <div className={classes.table}>
            <ReactTable 
                columns={columns}
                data={data}
                setSelectedRows={setSelectedRows}
                setSelectedPatient={setSelectedPatient}
                currentUser={currentUser}
            />
        </div>
    )
}

export default PatientTable
