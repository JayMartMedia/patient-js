import { shallow } from 'enzyme';
import App from './App';
import PatientTable from './components/PatientTable';

describe('', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  })

  test('renders title', () => {
    const h1 = wrapper.find('h1');
    expect(h1.text()).toContain('Demo Patient Tracker');
  });

  test('renders button to display table', () => {
    const button = wrapper.find('button');
    expect(button.text()).toContain('View Patients');
  })

  test('table is hidden on initial render', () => {
    const patientTable = wrapper.find(PatientTable);
    expect(patientTable).toHaveLength(0);
  })

  test('renders patient table after view patients is clicked', () => {
    const button = wrapper.find('button');
    button.simulate('click');

    const patientTable = wrapper.find(PatientTable);
    expect(patientTable).toHaveLength(1);
  })

  test('hides view patients button after it is clicked', () => {
    const button = wrapper.find('button');
    button.simulate('click');

    expect(wrapper.find('button')).toHaveLength(0);
  })
});