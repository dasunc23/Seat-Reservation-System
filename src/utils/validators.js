export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validateOfficeEmail = (email) => {
  return email.endsWith('@office.com');
};

export const validatePassword = (password) => {
  // At least 8 characters, one letter, one number
  const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return re.test(password);
};

export const validateSeatNumber = (seatNumber) => {
  // Format: Letter-Number (e.g., A-101, B-202)
  const re = /^[A-Za-z]-\d{3}$/;
  return re.test(seatNumber);
};