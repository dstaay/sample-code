import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import OrderPrice from '../../../app/client/components/orderform/OrderPrice';

describe('<OrderPrice loading={false} price={10.00} quantity={3} />', () => {

  let wrapper, muiTheme;

  beforeEach(() => {
    muiTheme = getMuiTheme();

    wrapper = shallow(
      <OrderPrice
        loading={false}
        price={10.00}
        quantity={3}
      />, {
      context: { muiTheme },
      childContextTypes: { muiTheme: React.PropTypes.object },
      }
    );
  });

  it('should display price $10.00', () => {
    expect(wrapper.find('#total-price').text()).to.equal('$10.00');
  });

  it('should display unit price of $3.33/unit', () => {
    expect(wrapper.find('#unit-price').text()).to.equal('$3.33/unit');
  });

  it('should display should show CircularProgress on loading={true}', () => {
    wrapper.setProps({ loading: true});
    expect(wrapper.find('CircularProgress')).to.be.length(1);
    expect(wrapper.find('#total-price')).to.be.length(0);
    expect(wrapper.find('#unit-price')).to.be.length(0);
  });

})

