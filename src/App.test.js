import { shallow } from 'enzyme';
import App from './App';
import PatientTableContainer from './components/table/PatientTableContainer';

describe('App', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  })

  test('renders landing page', () => {
    const landingPage = wrapper.find('LandingPage');
    expect(landingPage).toHaveLength(1);
  })

  test('renders button to display table', () => {
    const button = wrapper.find('Button');
    expect(button.props().text).toContain('View Patients');
  })

  test('table is hidden on initial render', () => {
    const patientTableContainer = wrapper.find(PatientTableContainer);
    expect(patientTableContainer).toHaveLength(0);
  })

  test('renders patient table after view patients is clicked', () => {
    const button = wrapper.find('Button');
    button.simulate('click');

    const patientTableContainer = wrapper.find(PatientTableContainer);
    expect(patientTableContainer).toHaveLength(1);
  })

  test('hides view patients button after it is clicked', () => {
    const button = wrapper.find('Button');
    button.simulate('click');

    expect(wrapper.find('Button')).toHaveLength(0);
  })
});