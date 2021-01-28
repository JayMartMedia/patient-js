import { mount } from 'enzyme';
import App from './App';

describe('App', () => {
  it('compiles successfully', async () => {
    const wrapper = await mount(<App />);
  })
});