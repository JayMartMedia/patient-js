import React, { useState, useEffect } from 'react'
import PATIENT_CONSTANTS from '../../constants/patientConstants';
import { Rest } from '../../utility/rest';

import Button from '../buttons/Button';
import CreatePatient from '../CreatePatient';
import PatientTable from './PatientTable';

function PatientTableContainer() {

    const [addPatientIsVisible, setAddPatientIsVisible] = useState(false);
    const [data, setData] = useState([]);

    const addPatientHandler = () => {
        setAddPatientIsVisible(true);
    }

    useEffect( async () => {
        setData(await Rest.get(PATIENT_CONSTANTS.TYPE))
    })

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
            <PatientTable 
                data={data}
            />
        </div>
    )
}

export default PatientTableContainer
