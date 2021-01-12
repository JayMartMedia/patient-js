import React, { useState, useEffect } from 'react'
import PATIENT_CONSTANTS from '../../constants/patientConstants';
import { Rest } from '../../utility/rest';

import Button from '../buttons/Button';
import PatientModal from '../PatientModal';
import PatientTable from './PatientTable';

function PatientTableContainer() {
    const [data, setData] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);

    const [currentPatient, setCurrentPatient] = useState({
        firstName: '',
        id: null,
        lastName: '',
        dateOfBirth: ''
    });

    const [addPatientIsVisible, setAddPatientIsVisible] = useState(false);

    const addPatientHandler = () => {
        setAddPatientIsVisible(true);
    }

    useEffect( async () => {
        setData(await Rest.get(PATIENT_CONSTANTS.TYPE))
    }, [addPatientIsVisible, currentPatient])

    useEffect(() => {
        console.log(selectedRows)
    }, [selectedRows])

    return (
        <div>
            <div>
                <Button 
                    text="Add Patient"
                    onClick={addPatientHandler}
                />
                <PatientModal
                    isVisible={addPatientIsVisible || !!currentPatient.firstName}
                    setIsVisible={setAddPatientIsVisible}
                    currentPatient={currentPatient}
                    setCurrentPatient={setCurrentPatient}
                />
                <Button 
                    text="Delete Selected"
                />
            </div>
            <PatientTable 
                data={data}
                setSelectedRows={setSelectedRows}
                setSelectedPatient={setCurrentPatient}
            />
        </div>
    )
}

export default PatientTableContainer
