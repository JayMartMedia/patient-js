import React, { useState, useEffect } from 'react'
import PATIENT_CONSTANTS from '../../constants/patientConstants';
import AuthUtil from '../../authentication/authenticationUtility';
import { Rest } from '../../utility/rest';
import classes from './PatientTableContainer.module.scss';
import buttonClasses from '../buttons/Button.module.scss';
import Button from '../buttons/Button';
import PatientModal from '../PatientModal';
import PatientTable from './PatientTable';

function PatientTableContainer({currentUser}) {
    const [data, setData] = useState([]);
    const [selectedRows, setSelectedRows] = useState([]);
    const [currentPatient, setCurrentPatient] = useState({
        firstName: '',
        id: null,
        lastName: '',
        dateOfBirth: ''
    });
    const [addPatientIsVisible, setAddPatientIsVisible] = useState(false);

    const onLogoutButtonClick = () => {
        window.location.href='/logout'
    }

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
        const data = await Rest.get(PATIENT_CONSTANTS.TYPE)
        data.sort((a,b) => {
            if (a.dateOfBirth === b.dateOfBirth) {
                return 0;
            }
            return a.dateOfBirth > b.dateOfBirth ? 1 : -1;
        })
        setData(data || [])
    }

    useEffect(() => {
        refreshData();
    }, [addPatientIsVisible, currentPatient])

    return (
        <div className={classes.container}>
            <div>
                <h1>Patients</h1>
                <span>Welcome {currentUser.principal.username}</span>
                <Button 
                    className={buttonClasses.button}
                    text="Logout"
                    onClick={onLogoutButtonClick}
                />
            </div>
            {
                /** If current logged in user has the "patient:write" permission then they can view the add/delete buttons **/
                AuthUtil.isUserHasPermission(currentUser, "patient:write") &&
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
            }
            <PatientTable 
                data={data}
                setSelectedRows={setSelectedRows}
                setSelectedPatient={setCurrentPatient}
                currentUser={currentUser}
            />
        </div>
    )
}

export default PatientTableContainer
