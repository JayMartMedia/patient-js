import React from 'react';
import { shallow } from 'enzyme';

import PATIENT_CONSTANTS from '../constants/patientConstants'
import { Rest } from '../utility/rest';

import CreatePatient from './CreatePatient';
import Popup from './popup/Popup';

describe('CreatePatient', () => {
    let wrapper;

    const setIsVisible = jest.fn();

    beforeEach(() => {
        wrapper = shallow(
            <CreatePatient 
                isVisible={false}
                setIsVisible={setIsVisible}
                currentPatient={{}}
                setCurrentPatient={() => {}}
            />
        )
    })

    it('passes isVisible prop to Popup', () => {
        expect(wrapper.find(Popup).props().isVisible).toEqual(false);
    })

    it('has the title', () => {
        expect(wrapper.find('h2').text()).toEqual('Add Patient');
    })

    it('has labels and input fields for first name', () => {
        const firstNameLabel = wrapper.findWhere(element => element.type('label') && element.text() == 'First Name:');
        expect(firstNameLabel).toHaveLength(1);
        expect(firstNameLabel.find('input')).toHaveLength(1);
    })

    it('has labels and input fields for last name', () => {
        const lastNameLabel = wrapper.findWhere(element => element.type('label') && element.text() == 'Last Name:');
        expect(lastNameLabel).toHaveLength(1);
        expect(lastNameLabel.find('input')).toHaveLength(1);
    })

    it('has labels and input fields for date of birth', () => {
        const dateOfBirthLabel = wrapper.findWhere(element => element.type('label') && element.text() == 'Date of Birth:');
        expect(dateOfBirthLabel).toHaveLength(1);
        expect(dateOfBirthLabel.find('input')).toHaveLength(1);
    })

    it('has a button that is disabled when fields are blank', () => {
        const button = wrapper.findWhere(element => element.is('Button') && element.props().text == 'Submit')
        expect(button.props().disabled).toBeTruthy();
    })

    it('has a button that is enabled when fields are filled', () => {
        fillAllFields(wrapper);
        const button = wrapper.findWhere(element => element.is('Button') && element.props().text == 'Submit')
        expect(button.props().disabled).toBeFalsy();
    })

    it('calls the Rest.post method when submit button clicked', () => {
        fillAllFields(wrapper);
        
        const watcher = jest.spyOn(Rest, 'post').mockReturnValueOnce(
            Promise.resolve({status: 200})
        );

        const button = wrapper.findWhere(element => element.is('Button') && element.props().text == 'Submit')
        button.simulate('click');
        expect(watcher).toHaveBeenCalledTimes(1);
    })

    it('closes the modal when the cancel button is clicked', () => {
        const button = wrapper.findWhere(element => element.is('Button') && element.props().text == 'Cancel')
        button.simulate('click');
        expect(setIsVisible).toHaveBeenCalledTimes(1);
    })

    it('opens in edit mode when passes a patient with an id', () => {
        const wrapper = shallow(
            <CreatePatient 
                isVisible={false}
                setIsVisible={setIsVisible}
                currentPatient={{
                    firstName: 'John',
                    id: '123abc-456def',
                    lastName: 'Doe',
                    dateOfBirth: '2000-01-01'
                }}
                setCurrentPatient={() => {}}
            />
        )
        expect(wrapper.find('h2').text()).toEqual('Edit Patient')
    })

    it('calls the Rest.put method when submit button is clicked on edit', () => {
        const wrapper = shallow(
            <CreatePatient 
                isVisible={false}
                setIsVisible={setIsVisible}
                currentPatient={{
                    firstName: 'John',
                    id: '123abc-456def',
                    lastName: 'Doe',
                    dateOfBirth: '2000-01-01'
                }}
                setCurrentPatient={() => {}}
            />
        )
        const watcher = jest.spyOn(Rest, 'put').mockReturnValueOnce(
            Promise.resolve({status: 200})
        );
        const button = wrapper.findWhere(element => element.is('Button') && element.props().text == 'Submit')
        button.simulate('click');
        expect(watcher).toHaveBeenCalledTimes(1);
    })
})

/** Helper functions **/

const fillAllFields = (wrapper) => {
    const firstName = 'fname';
    const lastName = 'lname';
    const dateOfBirth = '2020-01-01';

    const firstNameInput = wrapper.findWhere(element => element.type('label') && element.text() == 'First Name:').find('input');
    firstNameInput.simulate('change', {target: {value: firstName}})

    const lastNameInput = wrapper.findWhere(element => element.type('label') && element.text() == 'Last Name:').find('input');
    lastNameInput.simulate('change', {target: {value: lastName}})

    const dateOfBirthInput = wrapper.findWhere(element => element.type('label') && element.text() == 'Date of Birth:').find('input');
    dateOfBirthInput.simulate('change', {target: {value: dateOfBirth}})
}