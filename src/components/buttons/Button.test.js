import { shallow } from 'enzyme';

import Button from './Button';

describe('Button', () => {

    let wrapper;

    const textValue = 'text value';
    const classNameValue = 'classNameValue';
    const onClick = jest.fn();

    beforeEach(() => {
        wrapper = shallow(
            <Button
                text={textValue}
                className={classNameValue}
                onClick={onClick}
            />
        );
    })

    it('renders a button element', () => {
        expect(wrapper.find('button')).toHaveLength(1);
    })

    it('is not disabled by default', () => {
        expect(wrapper.find('button').prop('disabled')).toBeFalsy();
    })

    it('is disabled when disabled is set to true', () => {
        wrapper = shallow(
            <Button
                text={textValue}
                className={classNameValue}
                onClick={onClick}
                disabled={true}
            />
        )

        expect(wrapper.find('button').prop('disabled')).toBeTruthy();
    })

    it('renders the correct value for the text', () => {
        expect(wrapper.find('button').text()).toEqual(textValue);
    })

    it('has the correct className', () => {
        expect(wrapper.find('button').props().className).toEqual(classNameValue);
    })

    it('runs the onClick function when clicked', () => {
        const button = wrapper.find('button');
        button.simulate('click')
        expect(onClick).toHaveBeenCalledTimes(1);
    })
})