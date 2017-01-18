import { QUANTITY, EMAIL, MAX_QUANTITY } from '../../const';
import validator from 'validator';

export default function validate(field, value) {
  switch(field) {
    case QUANTITY:
      return validator.isEmpty(String(value)) ? 'required'
              : !validator.isInt(String(value), { min: 0, max: MAX_QUANTITY }) ? 'invalid quantity'
              : null;
    case EMAIL:
      return !validator.isEmail(String(value)) ? 'invalid format' : null;
    default:
      return validator.isEmpty(String(value)) ? 'required' : null;
  }
}