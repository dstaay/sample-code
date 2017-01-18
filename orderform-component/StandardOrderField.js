import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import { QUANTITY } from '../../const';
import validate from './FormValidate';



export default class StandardOrderField extends React.Component {

  render() {
      switch(this.props.field) {
        case QUANTITY:
          return (
            <TextField
              id={this.props.field}
              value={this.props.value}
              onChange={this.props.updateTextField.bind(null, this.props.field)}
              floatingLabelText={this.props.field}
              fullWidth={true}
              errorText={this.props.submitAttempt ? validate(this.props.field, this.props.value) : null}
            />
          )
        default:
          const menuItems = this.props.menuItems.map(item => <MenuItem key={item} value={item} primaryText={item} />)
          return (
            <SelectField
              id={this.props.field}
              floatingLabelText={this.props.field}
              value={this.props.value}
              onChange={this.props.updateSelectField.bind(null, this.props.field)}
              fullWidth={true}
              errorText={this.props.submitAttempt ? validate(this.props.field, this.props.value) : null}
            >
              {menuItems}
            </SelectField>
          );
      }
  }
}

StandardOrderField.propTypes = {
  submitAttempt: React.PropTypes.bool.isRequired,
  field: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
  updateTextField: React.PropTypes.func.isRequired,
  updateSelectField: React.PropTypes.func.isRequired,
  menuItems: React.PropTypes.array,
}
