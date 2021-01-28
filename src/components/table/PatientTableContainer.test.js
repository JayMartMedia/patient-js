import { shallow } from 'enzyme';

import PatientTableContainer from './PatientTableContainer';
import PatientTable from './PatientTable';

describe('PatientTableContainer', () => {
    let wrapper;

    const currentUserTrainee = {
        "principal":{
            "username":"john",
            "authorities":[
                {"role":"ROLE_TRAINEE"},
                {"role":"patient:read"}
            ],
            "accountNonExpired":true,
            "accountNonLocked":true,
            "credentialsNonExpired":true,
            "enabled":true
        },
        "authorities":[
            {"role":"ROLE_TRAINEE"},
            {"role":"patient:read"}
        ],
        "details":{
            "remoteAddress":"127.0.0.1"
        },
        "authenticated":true
    }
    const currentUserAdministrator = {
        "principal":{
            "username":"jane",
            "authorities":[
                {"role":"ROLE_ADMINISTRATOR"},
                {"role":"patient:read"},
                {"role":"patient:write"}
            ],
            "accountNonExpired":true,
            "accountNonLocked":true,
            "credentialsNonExpired":true,
            "enabled":true
        },
        "authorities":[
            {"role":"ROLE_ADMINISTRATOR"},
            {"role":"patient:read"},
            {"role":"patient:write"}
        ],
        "details":{
            "remoteAddress":"127.0.0.1"
        },
        "authenticated":true
    }

    beforeEach(() => {
        wrapper = shallow(<PatientTableContainer currentUser={currentUserAdministrator}/>)
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

    it('hides the add patient modal by default', () => {
        expect(wrapper.find('PatientModal').props().isVisible).toEqual(false);
    })

    it('displays the create patient modal when add patient button is clicked', () => {
        const addButton = wrapper.findWhere(element => {
            return element.is('Button') && element.props().text == "Add Patient"
        })
        addButton.simulate('click')
        expect(wrapper.find('PatientModal').props().isVisible).toEqual(true);
    })
})