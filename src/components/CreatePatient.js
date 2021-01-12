import React, { useState, useEffect } from 'react';
import Popup from './popup/Popup';
import PATIENT_CONSTANTS from '../constants/patientConstants';
import Button from './buttons/Button';
import { Rest } from '../utility/rest';

function CreatePatient({isVisible, setIsVisible, currentPatient, setCurrentPatient}) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');

    useEffect(() => {
        setFirstName(currentPatient[PATIENT_CONSTANTS.FIRST_NAME])
        setLastName(currentPatient[PATIENT_CONSTANTS.LAST_NAME])
        setDateOfBirth(currentPatient[PATIENT_CONSTANTS.DATE_OF_BIRTH])
    }, [currentPatient])

    const createPatient = async () => {
        const patient = {
            'firstName' : firstName,
            'lastName' : lastName,
            'dateOfBirth' : dateOfBirth
        };
        
        const response = await Rest.post(PATIENT_CONSTANTS.TYPE, patient)
        if(response.status == 200){
            closeModal();
        }
    }

    const closeModal = () => {
        setFirstName('');
        setLastName('');
        setDateOfBirth('');
        setCurrentPatient({})
        setIsVisible(false);
    }

    console.log('firstname: ', firstName);

    return (
        <Popup 
            isVisible={isVisible}
        >
            <h2>Add Patient</h2>
            <label>
                First Name:
                <input 
                    type='text' 
                    onChange={e => setFirstName(e.target.value)} 
                    value={firstName} 
                />
            </label>
            <label>
                Last Name:
                <input 
                    type='text' 
                    onChange={e => setLastName(e.target.value)} 
                    value={lastName}
                />
            </label>
            <label>
                Date of Birth:
                <input 
                    type='date' 
                    onChange={e => setDateOfBirth(e.target.value)} 
                    value={dateOfBirth}
                />
            </label>
            <Button
                text="Submit"
                onClick={createPatient}
                disabled={!(firstName && lastName && dateOfBirth)}
            />
            <Button
                text="Cancel"
                onClick={closeModal}
            />
        </Popup>
    )
}

export default CreatePatient
