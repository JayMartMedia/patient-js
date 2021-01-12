import React, { useState } from 'react'

import Button from '../buttons/Button';
import CreatePatient from '../CreatePatient';
import PatientTable from './PatientTable';

function PatientTableContainer() {

    const [addPatientIsVisible, setAddPatientIsVisible] = useState(false);

    const addPatientHandler = () => {
        setAddPatientIsVisible(true);
    }

    return (
        <div>
            <div>
                <Button 
                    text="Add Patient"
                    onClick={addPatientHandler}
                />
                <CreatePatient
                    isVisible={addPatientIsVisible}
                    setIsVisible={setAddPatientIsVisible}
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
