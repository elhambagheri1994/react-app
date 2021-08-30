let data = {};
let value = 0;
let userStatus = {
  isConfirmer: false,
  isFinnancial: false,
};

export function setData(input) {
  data = input;
}
export function getData() {
  return data;
}

export function setValue(input) {
  value = input;
}
export function getValue() {
  return value;
}

export function setCartableUserStatus(input) {
  userStatus = input;
}
export function getCartableUserStatus() {
  return userStatus;
}
