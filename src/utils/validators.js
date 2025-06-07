// function to validate individual form fields 
export const validateField = (name, value) => {
  switch (name) {
    case 'First Name':
    case 'Last Name':
    case 'username':
      return value.trim() ? '' : 'This field is required.';
    case 'email':
      return /^\S+@\S+\.\S+$/.test(value) ? '' : 'Invalid email address.';
    case 'password':
      return value.length >= 6 ? '' : 'Minimum 6 characters required.';
    case 'phoneNumber':
      return /^\d{10}$/.test(value) ? '' : 'Enter 10 digit number.';
    case 'pancard number':
      return /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(value) ? '' : 'Invalid PAN.';
    case 'aadhar number':
      return /^\d{12}$/.test(value) ? '' : '12 digit Aadhar required.';
    case 'country':
    case 'city':
      return value ? '' : 'Select a valid option.';
    default:
      return '';
  }
}
