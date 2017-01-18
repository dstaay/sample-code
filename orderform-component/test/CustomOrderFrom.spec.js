import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { spy } from 'sinon';

import CustomOrderForm from '../../../app/client/components/orderform/CustomOrderForm';


describe('<CustomOrderForm  />', () => {

  let wrapper, muiTheme, cbSpy;

  beforeEach(() => {
    muiTheme = getMuiTheme();
    cbSpy = spy();

    wrapper = shallow(
      <CustomOrderForm
        freeText=""
        email=""
        updateTextField={() => {}}
        handleCustomSubmit={() => {}}
        submitAttempt={false}
      />, {
        context: { muiTheme },
        childContextTypes: { muiTheme: React.PropTypes.object },
    });
  });

  it('should have two text fields', () => {
    expect(wrapper.find('TextField')).to.have.length(2);
  });

  it('should have one submit button', () => {
    expect(wrapper.find('RaisedButton')).to.have.length(1);
  });

  it('freeText should exist only if no value and failed submit attempt', () => {
    expect(wrapper.find('#custom-order-text').props().errorText).is.null;
    
    wrapper.setProps({ submitAttempt: true, freeText: 'something' });
    expect(wrapper.find('#custom-order-text').props().errorText).is.null;
    
    wrapper.setProps({ submitAttempt: false, freeText: 'something' });
    expect(wrapper.find('#custom-order-text').props().errorText).is.null;
    
    wrapper.setProps({ submitAttempt: true, freeText: '' });
    expect(wrapper.find('#custom-order-text').props().errorText).is.not.null;
  });

  it('email should exist only if no value and failed submit attempt', () => {
    expect(wrapper.find('#custom-order-email').props().errorText).is.null;
    
    wrapper.setProps({ submitAttempt: true, email: 'valid@email.com' });
    expect(wrapper.find('#custom-order-email').props().errorText).is.null;
    
    wrapper.setProps({ submitAttempt: false, email: 'invalid-Email' });
    expect(wrapper.find('#custom-order-text').props().errorText).is.null;
    
    wrapper.setProps({ submitAttempt: true, email: 'invalid-Email' });
    expect(wrapper.find('#custom-order-text').props().errorText).is.not.null;
  });

});
