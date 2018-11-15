import React from 'react';
import { shallow } from 'enzyme';
import ManagerFellowSortInput from '.';


describe('SelectInput', () => {
    const onChange = jest.fn()
   
    const component = shallow(<ManagerFellowSortInput
                        onChange={onChange}/>);

    it('should render input field', () => { 
        expect(component.find('select').length).toEqual(1)    
    });
    it('should handles change of input', () => {
        component
            .find('select')
            .simulate('change');

        expect(onChange).toHaveBeenCalled();
    })
});
