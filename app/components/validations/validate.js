import validator from 'validator';
import isEmpty from './is-empty';

const validate = {
  checkRegistration: function(data) {
    let errors = [];

    data.fullName = isEmpty(data.fullName) ? '' : data.fullName;

    data.phone = isEmpty(data.phone) ? '' : data.phone;
    data.address = isEmpty(data.address) ? '' : data.address;

    if (validator.isEmpty(data.fullName)) {
      errors.push('Full Name is required');
    }

    if (validator.isEmpty(data.phone)) {
      errors.push('Mobile Number is required');
    }

    if (validator.isEmpty(data.address)) {
      errors.push('Address is required');
    }

    if (!isEmpty(data.fullName)) {
      if (!validator.isLength(data.fullName, {min: 5})) {
        errors.push('Full Name must be atleast 4 characters long');
      }
    }

    if (!isEmpty(data.address)) {
      if (!validator.isLength(data.address, {min: 10})) {
        errors.push('Address must be atleast 10 characters long');
      }
    }

    if (!isEmpty(data.phone)) {
      let inputNumer = data.phone;
      var phoneno = /^\d{10}$/;
      if (!inputNumer.match(phoneno)) {
        errors.push('Enter a valid mobile number');
      }
    }

    return {
      errors,
      isValid: isEmpty(errors),
    };
  },
  checkVehicleReg: function(data) {
    let errors = [];

    data.regNum = isEmpty(data.regNum) ? '' : data.regNum;

    if (validator.isEmpty(data.regNum)) {
      errors.push('Vehicle Registration number is required');
    }

    if (!isEmpty(data.regNum)) {
      let inputNumer = data.regNum;
      var regno = /^[A-Z]{2}[ -][0-9]{1,2}(?: [A-Z])?(?: [A-Z]*)? [0-9]{1,4}$/;
      if (!inputNumer.match(regno)) {
        errors.push('Enter a valid Registration Number');
      }
    }

    return {
      errors,
      isValid: isEmpty(errors),
    };
  },
};

export default validate;
