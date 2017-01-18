import React from 'react';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import StandardOrderForm from './StandardOrderForm';
import CustomOrderForm from './CustomOrderForm';
import validate from './FormValidate';
import { addToCart, fetchQuote, resetQuote, setQuote } from '../../actions';
import { FREETEXT, EMAIL } from '../../const';

export const validateFields = (quoteObj, format) => format.every((field) => 
  (validate(field[0], quoteObj[field[0]]) === null));

const mapStateToProps = state => ({ quote: state.quote });

const mapDispatchToProps = dispatch => ({
  onFetchQuote: (quoteObj) => {
    dispatch(fetchQuote(quoteObj));
  },
  onSetQuote: (quoteObj) => {
    dispatch(setQuote(quoteObj));
  },
  onSetQuoteAndPrice: (quoteObj, format) => {
    dispatch(fetchQuote(quoteObj));
  },
  onAddToCart: (cartObj) => {
    dispatch(addToCart(cartObj));
    dispatch(resetQuote(cartObj.product));
  },
  onResetQuote: (product) => {
    dispatch(resetQuote(product));
  },
});

export class OrderFormContainer extends React.Component {

  componentDidMount() {
    if (this.props.quote.product != this.props.item) {
      this.props.onResetQuote(this.props.item);
    }
  }

  componentWillUnMount() {
    this.props.onSetQuote({ submitAttempt: false});
  }

  updateTextField(field, event, value) {
    if (validateFields({ ...this.props.quote, [field]: value }, this.props.format)) {
      this.props.onSetQuoteAndPrice({ ...this.props.quote, [field]: value, id})
    } else {
      this.props.onSetQuote({ [field]: value, valid: false })
    }
  }

  updateSelectField(field, event, index, value) {
    this.updateTextField(field, event, value);
  }

  handleAddToCart() {
    if (this.props.quote.valid) {
      this.props.onAddToCart({ ...this.props.quote });
    } else {
      this.props.onSetQuote({ submitAttempt: true});
    }
  }

  handleCustomToggle() {
    this.props.onSetQuote({ custom: !this.props.quote.custom})
  }

  handleCustomSubmit() {
    if (this.props.quote.valid && validateFields(this.props.quote, [[EMAIL], [FREETEXT]])) {
      // TODO
      this.props.onResetQuote(this.props.item);
    } else {
      this.props.onSetQuote({ submitAttempt: true});
    }
  }

  render() {
    let customOrder;

    if (this.props.quote.custom) {
      customOrder = 
        <CustomOrderForm
          updateTextField={this.updateTextField.bind(this)}
          handleCustomSubmit={this.handleCustomSubmit.bind(this)}
          freeText={this.props.quote.freeText}
          email={this.props.quote.email}
          submitAttempt={this.props.quote.submitAttempt}
        />
    }

    return (
      <Paper>s
        <div class="order-form-border">
          <StandardOrderForm
            fields={this.props.format}
            updateTextField={this.updateTextField.bind(this)}
            updateSelectField={this.updateSelectField.bind(this)}
            values={this.props.quote} 
            handleAddToCart={this.handleAddToCart.bind(this)}
            handleCustomToggle={this.handleCustomToggle.bind(this)}
          />
          {customOrder}
        </div>
      </Paper>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
  )(OrderFormContainer);

OrderFormContainer.propTypes = {
  item: React.PropTypes.string.isRequired,
  format: React.PropTypes.array.isRequired,
}

