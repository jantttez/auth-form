export const emailValid = (email: string) => {
  return email.includes('@') && email.trim().length > 5;
};

export const passwordValid = (password: string) => {
  return password.trim().length >= 6;
};
export const isEmpty = (str: string) => {
  return str.trim().length === 0;
};
