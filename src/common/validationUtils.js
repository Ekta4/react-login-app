export const required = value => (value ? undefined : 'Required');
export const maxLength = max => value => (value && value.length > max ? `Must be ${max} characters or less` : undefined);
export const maxLength30 = maxLength(30);
export const maxLength80 = maxLength(80);
export const email = value => (value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
  'Invalid email address' :
  undefined);
export const phoneNumber = value => (value && !/^(0|[1-9][0-9]{9})$/i.test(value) ?
  'Invalid phone number, must be 10 digits' :
  undefined);