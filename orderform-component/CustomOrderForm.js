import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import validate from './FormValidate';
import { EMAIL, FREETEXT } from '../../const';

export default class CustomOrderForm extends React.Component {

  render() {
    return (
      <div>
        <TextField
          id="custom-order-text"
          floatingLabelText="Describe Additional Requirements"
              value={this.props.freeText}
              multiLine={true}
              rows={2}
              onChange={this.props.updateTextField.bind(null,'freeText')}
              fullWidth={true}
              errorText={this.props.submitAttempt ? validate(FREETEXT, this.props.freeText) : null}
            />
            <TextField
              id="custom-order-email"
              floatingLabelText="Email"
              value={this.props.email}
              onChange={this.props.updateTextField.bind(null, 'email')}
              fullWidth={true}
              errorText={this.props.submitAttempt ? validate(EMAIL, this.props.email) : null}
            />
            <RaisedButton
              id="submit-custom-order"
              label="Sumbit Request"
              primary={true} 
              fullWidth={true} 
              onClick={this.props.handleCustomSubmit}
            />
      </div>
    ) 
  }
}

CustomOrderForm.propTypes = {
  updateTextField: React.PropTypes.func.isRequired,
  handleCustomSubmit: React.PropTypes.func.isRequired,
  freeText: React.PropTypes.string.isRequired,
  email: React.PropTypes.string.isRequired,
  submitAttempt: React.PropTypes.bool.isRequired,
}