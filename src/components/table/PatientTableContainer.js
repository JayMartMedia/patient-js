import React, { useState, useEffect } from 'react'
import PATIENT_CONSTANTS from '../../constants/patientConstants';
import { Rest } from '../../utility/rest';
import classes from './PatientTableContainer.module.scss';
import buttonClasses from '../buttons/Button.module.scss';

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

    const deleteSelectedPatientsHandler = async () => {
        const rowIds = selectedRows.map(row => row.id)
        for( const rowId of rowIds ){
            await Rest.delete(PATIENT_CONSTANTS.TYPE, rowId);
        }

        refreshData()
    }

    const refreshData = async () => {
        setData(await Rest.get(PATIENT_CONSTANTS.TYPE) || [])
    }

    useEffect(() => {
        refreshData();
    }, [addPatientIsVisible, currentPatient])

    return (
        <div className={classes.container}>
            <h1>Patients</h1>
            <div>
                <Button 
                    className={buttonClasses.button}
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
                    className={buttonClasses.button}
                    text="Delete Selected"
                    onClick={deleteSelectedPatientsHandler}
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
