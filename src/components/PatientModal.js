import React, { useState, useEffect } from 'react';
import Popup from './popup/Popup';
import PATIENT_CONSTANTS from '../constants/patientConstants';
import Button from './buttons/Button';
import { Rest } from '../utility/rest';
import classes from './PatientModal.module.scss';

function PatientModal({isVisible, setIsVisible, currentPatient, setCurrentPatient}) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');

    const isCreating = !currentPatient.id;

    useEffect(() => {
        setFirstName(currentPatient[PATIENT_CONSTANTS.FIRST_NAME])
        setLastName(currentPatient[PATIENT_CONSTANTS.LAST_NAME])
        setDateOfBirth(currentPatient[PATIENT_CONSTANTS.DATE_OF_BIRTH])
    }, [currentPatient])

    const upsertPatient = async () => {
        const patient = {
            'firstName' : firstName,
            'lastName' : lastName,
            'dateOfBirth' : dateOfBirth
        };
        
        let response;
        if(isCreating){
            response = await Rest.post(PATIENT_CONSTANTS.TYPE, patient)
        }else{
            patient.id = currentPatient.id
            response = await Rest.put(PATIENT_CONSTANTS.TYPE, patient)
        }
        if(response.status === 200){
            closeModal();
        }
    }

    const closeModal = () => {
        setFirstName('');
        setLastName('');
        setDateOfBirth('');
        setCurrentPatient(
            {
                firstName: '',
                id: null,
                lastName: '',
                dateOfBirth: ''
            }
        )
        setIsVisible(false);
    }

    return (
        <Popup 
            isVisible={isVisible}
        >
            <dialog className={classes.container}>
                <h2 className={classes.h2}>{ isCreating ? 'Add' : 'Edit' } Patient</h2>
                <label className={classes.label}>
                    First Name:
                    <input 
                        className={classes.textInput}
                        type='text' 
                        onChange={e => setFirstName(e.target.value)} 
                        value={firstName} 
                    />
                </label>
                <label className={classes.label}>
                    Last Name:
                    <input 
                        className={classes.textInput}
                        type='text' 
                        onChange={e => setLastName(e.target.value)} 
                        value={lastName}
                    />
                </label>
                <label className={classes.label}>
                    Date of Birth:
                    <input 
                        className={classes.dateInput}
                        type='date' 
                        onChange={e => setDateOfBirth(e.target.value)} 
                        value={dateOfBirth}
                    />
                </label>
                <div>
                    <Button
                        className={classes.submitButton}
                        text="Submit"
                        onClick={upsertPatient}
                        disabled={!(firstName && lastName && dateOfBirth)}
                    />
                    <Button
                        className={classes.cancelButton}
                        text="Cancel"
                        onClick={closeModal}
                    />
                    <div className={classes.clearFloat} />
                </div>
            </dialog>
        </Popup>
    )
}

export default PatientModal
