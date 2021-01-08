import { shallow, mount } from 'enzyme';
import PatientTable from './PatientTable';
import MaterialTable from 'material-table';
import RCTable from 'rc-table';

describe('PatientTable', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<PatientTable />);

    })

    it('renders the RCTable', () => {
        const rcTable = wrapper.find(RCTable);
        expect(rcTable).toHaveLength(1);
    });

    it('has the correct title', () => {
        const wrapperMount = mount(<PatientTable />);
        const rcTable = wrapperMount.find(RCTable);
        expect(rcTable.text()).toContain('Patients');
    })

    it('contains appropriate columns', () => {
        const wrapperMount = mount(<PatientTable />);
        const rcTable = wrapperMount.find(RCTable);

        expect(rcTable.text()).toContain('First Name');
        expect(rcTable.text()).toContain('Last Name');
    })
});