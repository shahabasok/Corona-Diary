import validator from 'validator';
import isEmpty from './is-empty';

const validate = {
  checkRegistration: function(data) {
    let errors = [];

    data.firstName = isEmpty(data.firstName) ? '' : data.firstName;

    data.phone = isEmpty(data.phone) ? '' : data.phone;
    data.address = isEmpty(data.address) ? '' : data.address;

    if (validator.isEmpty(data.firstName)) {
      errors.push('Full Name is required');
    }

    if (!isEmpty(data.firstName)) {
      let inputNumer = data.firstName;
      var phoneno = /^[a-zA-Z ]+$/;
      if (!inputNumer.match(phoneno)) {
        errors.push('Enter a valid first name');
      }
    }

    if (validator.isEmpty(data.phone)) {
      errors.push('Mobile Number is required');
    }

    if (validator.isEmpty(data.address)) {
      errors.push('Address is required');
    }

    if (!isEmpty(data.firstName)) {
      if (!validator.isLength(data.firstName, {min: 5})) {
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
  checkLocationData: function(data) {
    let errors = [];

    data.address = isEmpty(data.address) ? '' : data.address;

    data.date = isEmpty(data.date) ? '' : data.date;

    data.time = isEmpty(data.time) ? '' : data.time;

    if (validator.isEmpty(data.address)) {
      errors.push('Address is required');
    }

    if (validator.isEmpty(data.date)) {
      errors.push('Please select a date');
    }

    if (validator.isEmpty(data.time)) {
      errors.push('Please select time');
    }

    if (!isEmpty(data.address)) {
      if (!validator.isLength(data.address, {min: 10})) {
        errors.push('Address must be atleast 10 characters long');
      }
    }

    return {
      errors,
      isValid: isEmpty(errors),
    };
  },
};

export default validate;
