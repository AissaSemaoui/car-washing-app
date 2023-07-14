export const userDetailsValidation = {
  firstName: (value) =>
    value.trim() === "" ? "Please enter your first name" : null,
  lastName: (value) =>
    value.trim() === "" ? "Please enter your last name" : null,
  phoneNumber: (value) =>
    /^(\+)?\d{1,3}\d{7,14}$/.test(value)
      ? null
      : "Please write a vaild Phone number and add your country code.",
  area: (value) => (value.trim() === "" ? "Please enter your area" : null),
  block: (value) => (value.trim() === "" ? "Please enter your block" : null),
  avenue: (value) => (value.trim() === "" ? "Please enter your avenue" : null),
  street: (value) => (value.trim() === "" ? "Please enter your street" : null),
  house: (value) => (value.trim() === "" ? "Please enter your house" : null),
};
