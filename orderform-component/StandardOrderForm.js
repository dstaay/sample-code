import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import StandardOrderField from './StandardOrderField';
import OrderPrice from './OrderPrice';


export default class StandardOrderForm extends React.Component {
  render() {

    let orderprice;

    if (!this.props.values.custom && this.props.values.valid) {
      orderprice =
      <OrderPrice
        price={this.props.values.price}
        quantity={this.props.values.quantity}
        loading={this.props.values.loading}
      />
    }

    return (
      <div>
        <h3>{this.props.values.product}</h3>
        <div class="row">
          {this.props.fields.map(( field ) =>
            <StandardOrderField
              id='standard-order-form'
              field={field[0]}
              menuItems={field.slice(1)}
              submitAttempt={this.props.values.submitAttempt}
              updateTextField={this.props.updateTextField}
              updateSelectField={this.props.updateSelectField}
              value={this.props.values[field[0]]}
            />
          )}
        </div>
        <div class="row">
          <div class="one-third column value">
            {orderprice}
            &nbsp;
          </div>
          <div class="two-thirds column value">
            <div class="order-form-button">
              <RaisedButton
                id="add-to-cart"
                label="Add to Cart"
                onClick={this.props.handleAddToCart}
                primary={true}
                disabled={this.props.values.custom}
                fullWidth={true}
              />
            </div>
            <div class="order-form-button">
              <RaisedButton
                id="toggle-custom-quote"
                label="Custom Quote"
                onClick={this.props.handleCustomToggle}
                fullWidth={true}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

StandardOrderForm.propTypes = {
  fields: React.PropTypes.array.isRequired,
  updateTextField: React.PropTypes.func.isRequired,
  updateSelectField: React.PropTypes.func.isRequired,
  handleCustomToggle: React.PropTypes.func.isRequired,
  handleAddToCart: React.PropTypes.func.isRequired,
  values: React.PropTypes.object.isRequired,
}
