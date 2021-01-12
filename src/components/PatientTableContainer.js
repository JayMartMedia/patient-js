import React from 'react'

import Button from './buttons/Button';
import PatientTable from './PatientTable';

function PatientTableContainer() {
    return (
        <div>
            <div>
                <Button 
                    text="Add Patient"
                />
                <Button 
                    text="Delete Selected"
                />
            </div>
            <PatientTable />
        </div>
    )
}

export default PatientTableContainer
