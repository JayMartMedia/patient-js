import React from 'react';
import { shallow } from 'enzyme';

import Popup from './Popup';


describe('Popup', () => {
    it('returns null (hidden) when isVisible is false', () => {
        const wrapper = shallow(
            <Popup 
                isVisible={false}
            />
        )

        expect(wrapper.type()).toBeNull();
    })

    it('returns a popup div (not hidden) when isVisible is true', () => {
        const wrapper = shallow(
            <Popup
                isVisible={true}
            />
        )
        
        expect(wrapper.type()).toEqual('div');
    })

    it('returns the child elements that are passed in', () => {
        const wrapper = shallow(
            <Popup
                isVisible={true}
            >
                <p>Here is a paragraph</p>
            </Popup>
        )

        expect(wrapper.find('p')).toHaveLength(1);
    })
})