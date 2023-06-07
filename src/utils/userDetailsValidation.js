export const userDetailsValidation = {
  firstName: (value) =>
    value.trim() === "" ? "Please enter your first name" : null,
  lastName: (value) =>
    value.trim() === "" ? "Please enter your last name" : null,
  phoneNumber: (value) =>
    /^[0-9]{8}$/.test(value)
      ? null
      : "Please enter a valid 8-digit phone number",
  area: (value) => (value.trim() === "" ? "Please enter your area" : null),
  block: (value) => (value.trim() === "" ? "Please enter your block" : null),
  avenue: (value) => (value.trim() === "" ? "Please enter your avenue" : null),
  street: (value) => (value.trim() === "" ? "Please enter your street" : null),
  house: (value) => (value.trim() === "" ? "Please enter your house" : null),
};
