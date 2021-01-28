import { shallow } from 'enzyme';
import PatientTable from './PatientTable';
import { ReactTable } from './ReactTable';

describe('PatientTable', () => {
    let wrapper, reactTable;

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

    beforeEach(() => {
        wrapper = shallow(<PatientTable currentUser={currentUserTrainee}/>);
        reactTable = wrapper.find(ReactTable);
    });

    it('renders the table', () => {
        expect(reactTable).toHaveLength(1);
    });

    it('contains 3 columns', () => {
        expect(reactTable.props().columns).toHaveLength(3);
    });
});