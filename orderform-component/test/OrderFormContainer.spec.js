import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { spy } from 'sinon';
import { Provider } from 'react-redux';

import { OrderFormContainer, validateFields } from '../../../app/client/components/orderform/OrderFormContainer';
import configureStore from '../../../app/client/store';
import { BROCHURE, BROCHURE_FORM } from '../../../app/client/const';

describe('Shallow <OrderFormContainer item={BROCHURE} format={BROCHURE_FORM} />', () => {

  let wrapper, muiTheme, cbSpyReset, cbSpySet, store;

  beforeEach(() => {
    muiTheme = getMuiTheme();
    cbSpyReset = spy();
    cbSpySet = spy();
    store = configureStore('dev');

    wrapper = shallow(
        <OrderFormContainer
          item={BROCHURE}
          format={BROCHURE_FORM}
          quote={store.getState().quote}
          onFetchQuote={() => {}}
          onSetQuote={cbSpySet}
          onSetQuoteAndPrice={() => {}}
          onResetQuote={cbSpyReset}
          onAddToCart={() => {}}
        />, {
      context: {muiTheme},
      childContextTypes: {muiTheme: React.PropTypes.object},
    })
  });

  it('should create a <StandardOrderForm />', () => {
    expect(wrapper.find('StandardOrderForm')).to.be.length(1);
  });

  it('should not display <CustomOrderForm />', () => {
    expect(wrapper.find('CustomOrderForm')).to.be.length(0);
  });

  it('should display <CustomOrderForm /> if custom flag', () => {
    wrapper.setProps({
      quote: { ...wrapper.props().quote, custom: true },
    })
    expect(wrapper.find('CustomOrderForm')).to.be.length(1);
  });

  it('should call onAddToCart on handleAddToCart if quote valid', () => {
    const cbSpy = spy()

    wrapper.setProps({
      quote: { ...wrapper.props().quote, valid : true },
      onAddToCart: cbSpy,
    })
    wrapper.find('StandardOrderForm').props().handleAddToCart()
    expect(cbSpy.callCount).to.equal(1)
    expect(cbSpySet.callCount).to.equal(0)
  });

  it('should call onSetQuote on handleAddToCart click if quote not valid', () => {
    const cbSpy = spy()

    wrapper.setProps({
      quote: { ...wrapper.props().quote, valid : false },
      onAddToCart: cbSpy,
    })
    wrapper.find('StandardOrderForm').props().handleAddToCart()
    expect(cbSpy.callCount).to.equal(0)
    expect(cbSpySet.callCount).to.equal(1)
  });

  it('should call onResetQuote on handleCustomSubmit click if quote, email and freetext valid', () => {
    const cbSpy = spy()

    wrapper.setProps({
      quote: { ...wrapper.props().quote, valid: true, custom: true, freeText: 'value1', email: 'none@gmail.com'},
      onResetQuote: cbSpy,
    })
    wrapper.find('CustomOrderForm').props().handleCustomSubmit()
    expect(cbSpy.callCount).to.equal(1)
    expect(cbSpySet.callCount).to.equal(0)
  });

  it('should call onSetQuote on handleCustomSubmit if email invalid format', () => {
    const cbSpy = spy()

    wrapper.setProps({
      quote: { ...wrapper.props().quote, valid: true, custom: true, freeText: 'value1', email: 'nonegmail.com'},
      onResetQuote: cbSpy,
    })
    wrapper.find('CustomOrderForm').props().handleCustomSubmit()
    expect(cbSpy.callCount).to.equal(0)
    expect(cbSpySet.callCount).to.equal(1)
  });

  it('should call onSetQuote on #submit-custom-quote click if freeText empty', () => {
    const cbSpy = spy()

    wrapper.setProps({
      quote: { ...wrapper.props().quote, valid: true, custom: true, freeText: '', email: 'nonegmail.com'},
      onResetQuote: cbSpy,
    })
    wrapper.find('CustomOrderForm').props().handleCustomSubmit()
    expect(cbSpy.callCount).to.equal(0)
    expect(cbSpySet.callCount).to.equal(1)
  });

  it('should call onSetQuote on #submit-custom-quote click if quote not valid', () => {
    const cbSpy = spy()

    wrapper.setProps({
      quote: { ...wrapper.props().quote, valid: false, custom: true, freeText: 'value1', email: 'none@gmail.com'},
      onResetQuote: cbSpy,
    })
    wrapper.find('CustomOrderForm').props().handleCustomSubmit()
    expect(cbSpy.callCount).to.equal(0)
    expect(cbSpySet.callCount).to.equal(1)
  });

});

describe('Mount <OrderFormContainer item={BROCHURE} format={BROCHURE_FORM} />', () => {

  let wrapper, muiTheme, cbSpyReset, cbSpySet, store;

  beforeEach(() => {
    muiTheme = getMuiTheme();
    cbSpyReset = spy();
    cbSpySet = spy();
    store = configureStore('dev');

    wrapper = mount(
        <OrderFormContainer
          item={BROCHURE}
          format={BROCHURE_FORM}
          quote={store.getState().quote}
          onFetchQuote={() => {}}
          onSetQuote={cbSpySet}
          onSetQuoteAndPrice={() => {}}
          onResetQuote={cbSpyReset}
          onAddToCart={() => {}}
        />, {
      context: {muiTheme},
      childContextTypes: {muiTheme: React.PropTypes.object},
    })
  });

  it('on Mount, should have called onResetQuote(BROCHURE)', () => {
    expect(cbSpyReset.calledOnce).to.be.true;
    expect(cbSpyReset.calledWith(BROCHURE)).to.be.true;
  })
/*
  it('on UnMount should call setQuote', () => {
    wrapper.unmount();
    expect(cbSpySet.calledOnce).to.be.true;
  })
*/
})
