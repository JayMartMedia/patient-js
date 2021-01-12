import React, { useState } from 'react';
import Popup from './popup/Popup';
import PATIENT_CONSTANTS from '../constants/patientConstants';
import Button from './buttons/Button';
import { Rest } from '../utility/rest';

function CreatePatient({isVisible, setIsVisible}) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');

    const createPatient = async () => {
        const patient = {
            'firstName' : firstName,
            'lastName' : lastName,
            'dateOfBirth' : dateOfBirth
        };
        
        const response = await Rest.post(PATIENT_CONSTANTS.TYPE, patient)
        if(response.status == 200){
            setFirstName('');
            setLastName('');
            setDateOfBirth('');
            setIsVisible(false);
        }
    }

    const closeModal = () => {
        setIsVisible(false);
    }

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
