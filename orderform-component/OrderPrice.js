import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

export default class OrderPrice extends React.Component {

  render() {

    const formatPrice = () => (
      <div>
        <br />
        <div id="total-price">
          <b>${this.props.price.toFixed(2)}</b>
          <br />
        </div>
        <div id="unit-price">
          {'$' + (this.props.price / this.props.quantity).toFixed(2) + '/unit'}
        </div>
      </div>
    )

    return (
      <div>
        {!this.props.loading ? formatPrice() : <CircularProgress />}
      </div>
    )
  }
}

OrderPrice.propTypes = {
  loading: React.PropTypes.bool.isRequired,
  price: React.PropTypes.any.isRequired,
  quantity: React.PropTypes.any.isRequired,
}