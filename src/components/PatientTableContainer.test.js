import { shallow } from 'enzyme';

import Button from './buttons/Button'
import PatientTableContainer from './PatientTableContainer';
import PatientTable from './PatientTable';

describe('PatientTableContainer', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<PatientTableContainer />)
    })

    it('renders the patient table component', () => {
        expect(wrapper.find(PatientTable)).toHaveLength(1);
    })

    it('renders the add button', () => {
        const addButton = wrapper.findWhere(element => {
            return element.is('Button') && element.props().text == "Add Patient"
        })
        expect(addButton).toHaveLength(1);
    })

    it('renders the delete button', () => {
        const deleteButton = wrapper.findWhere(element => {
            return element.is('Button') && element.props().text == "Delete Selected"
        })
        expect(deleteButton).toHaveLength(1);
    })
})