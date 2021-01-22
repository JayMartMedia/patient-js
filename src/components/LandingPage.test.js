import { shallow } from 'enzyme';
import LandingPage from './LandingPage';

describe('LandingPage', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<LandingPage />);
    })

    it('displays the title', () => {
        const h1 = wrapper.find('h1');
        expect(h1.text()).toEqual('Demo Patient Tracker Application');
    });

    it('renders children', () =>{
        wrapper = shallow(
            <LandingPage>
                <h5>Testing children</h5>
            </LandingPage>
        )
        const h5 = wrapper.find('h5');
        expect(h5.text()).toEqual('Testing children');
    })
})