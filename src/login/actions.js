export const LOGIN_USER = 'LOGIN_USER';

export const loginUser = (values) => {
  const payload = values;
  return { type: 'LOGIN_USER', payload };

};