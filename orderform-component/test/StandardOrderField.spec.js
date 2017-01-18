import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { spy } from 'sinon';

import StandardOrderField from '../../../app/client/components/orderform/StandardOrderField';
import { QUANTITY } from '../../../app/client/const';

describe('<StandardOrderField field={QUANTITY} value="some_value" submitAttempt={true} />', () => {

  let wrapper, muiTheme, cbSpy;

  beforeEach(() => {
    muiTheme = getMuiTheme();
    cbSpy = spy();

    wrapper = shallow(
      <StandardOrderField
        field={QUANTITY}
        value="some_value"
        updateTextField={cbSpy}
        updateSelectField={() => {}}
        submitAttempt={true}
      />, {
        context: {muiTheme},
        childContextTypes: {muiTheme: React.PropTypes.object},
    })
  });

  it('should create a single TextField', () => {
    expect(wrapper.find('TextField')).to.have.length(1);
    expect(wrapper.find('SelectField')).to.have.length(0);
  });

  it('Texfield should have value "some_value"', () => {
    expect(wrapper.find('TextField').props().value).to.equal('some_value');
  });

  it('On value change, updateTextField should be called', () => {
    wrapper.find('TextField').simulate('change', { target: { value: 'new_value' }});
    expect(cbSpy.calledOnce).to.equal(true);
  });

  it('If value is non-Int string, expect ErrorText to be displayed', () => {
    expect(wrapper.find('TextField').props().errorText).to.equal('invalid quantity');
  });

  it('If value is Int string, expect no ErrorText to be displayed', () => {
    wrapper.setProps({ value: '1234'});
    expect(wrapper.find('TextField').props().errorText).to.be.null;
  });

});

describe('<StandardOrderField field="SelectBox" value="some_value" submitAttempt={true} />', () => {

  let wrapper, muiTheme, cbSpy;

  beforeEach(() => {
    muiTheme = getMuiTheme();
    cbSpy = spy();

    wrapper = shallow(
      <StandardOrderField
        field="SelectBox"
        value=""
        menuItems={[1, 2, 3]}
        updateTextField={() => {}}
        updateSelectField={cbSpy}
        submitAttempt={true}
      />, {
        context: {muiTheme},
        childContextTypes: {muiTheme: React.PropTypes.object},
    })
  });

  it('should create a single SelectField', () => {
    expect(wrapper.find('TextField')).to.have.length(0);
    expect(wrapper.find('SelectField')).to.have.length(1);
  });

  it('SelectField should have no inital value', () => {
    expect(wrapper.find('SelectField').props().value).to.equal("");
  });

  it('On value change, updateSelectField should be called', () => {
    wrapper.find('SelectField').simulate('change', { target: { value: 2 }});
    expect(cbSpy.calledOnce).to.equal(true);
  });

  it('Expect 3 menuItems to exist', () => {
    expect(wrapper.find('MenuItem')).to.be.length(3);
  });

  it('If value is empty, expect ErrorText to be displayed', () => {
    expect(wrapper.find('SelectField').props().errorText).to.equal('required');
  });

  it('If value exists, expect no ErrorText to be displayed', () => {
    wrapper.setProps({ value: 1});
    expect(wrapper.find('SelectField').props().errorText).to.be.null;
  });

});