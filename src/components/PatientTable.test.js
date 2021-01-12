import { shallow } from 'enzyme';
import PatientTable from './PatientTable';
import { ReactTable } from './ReactTable';
import Button from './buttons/Button';

describe('PatientTable', () => {
    let wrapper, reactTable;

    beforeEach(() => {
        wrapper = shallow(<PatientTable />);
        reactTable = wrapper.find(ReactTable);
    });

    it('renders the table', () => {
        expect(reactTable).toHaveLength(1);
    });

    it('contains appropriate amount of columns', () => {
        expect(reactTable.props().columns).toHaveLength(3);
    });
});