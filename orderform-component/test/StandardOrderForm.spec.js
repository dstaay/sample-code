import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { spy } from 'sinon';

import StandardOrderForm from '../../../app/client/components/orderform/StandardOrderForm';

describe('<StandarOrderForm [mock values, fields and cbs]/>', () => {

  let wrapper, muiTheme, cbSpy;

  beforeEach(() => {
    muiTheme = getMuiTheme();
    cbSpy = spy();

    const values = {
      field1: 'value1',
      field2: 'value2',
      custom: false,
      loading: false,
      valid: true,
      price: 100,
      quantity: 1,
      product: 'product_value',
    }

    const fields = [
      ['field1', 'menu1', 'menu2'],
      ['field2', 'menu3', 'menu4'],
    ]

    wrapper = shallow(
      <StandardOrderForm
        fields={fields}
        updateTextField={() => {}}
        updateSelectField={() => {}}
        handleCustomToggle={() => {}}
        handleAddToCart={() => {}}
        values={values}
      />, {
        context: {muiTheme},
        childContextTypes: {muiTheme: React.PropTypes.object},
    });
  });

  it('should have 2 <StandardOrderField />', () => {
    expect(wrapper.find('StandardOrderField')).to.have.length(2);
  });

  it('The first <StandardOrderField /> should have expected menu items 1 and 2', () => {
    expect(wrapper.find('StandardOrderField').first().props().menuItems).to.eql(['menu1', 'menu2']);
  });

  it('The first <StandardOrderField /> should have field of "field1"', () => {
    expect(wrapper.find('StandardOrderField').first().props().field).to.equal('field1');
  });

  it('The first <StandardOrderField /> should have value of "value1"', () => {
    expect(wrapper.find('StandardOrderField').first().props().value).to.equal('value1');
  });


  it('should have <OrderPrice />', () => {
    expect(wrapper.find('OrderPrice')).to.have.length(1);
  });

  it('should have no <OrderPrice /> if price not valid', () => {
    wrapper.setProps({ values: { valid: false }});
    expect(wrapper.find('OrderPrice')).to.have.length(0);
  });

  it('should have no <OrderPrice /> if custom quote', () => {
    wrapper.setProps({ values: { custom: true }});
    expect(wrapper.find('OrderPrice')).to.have.length(0);
  });

  it('Add-To-Cart should be enabled', () => {
    expect(wrapper.find('#add-to-cart').props().disabled).to.equal(false);
  });

  it('Add-To-Cart should be disabled if custom quote', () => {
    wrapper.setProps({ values: { custom: true }});
    expect(wrapper.find('#add-to-cart').props().disabled).to.equal(true);
  });

  it('Add-To-Cart should call handleAddToCart on click', () => {
    wrapper.setProps({ handleAddToCart: cbSpy });
    wrapper.find('#add-to-cart').simulate('click');
    expect(cbSpy.calledOnce).to.equal(true);
  });

  it('Toggle-Custom-Quote should call handleCustomToggle on click', () => {
    wrapper.setProps({ handleCustomToggle: cbSpy });
    wrapper.find('#toggle-custom-quote').simulate('click');
    expect(cbSpy.calledOnce).to.equal(true);
  });
});