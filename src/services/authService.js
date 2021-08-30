import axios from "axios";
import http from "./httpServices";

const apiEndpoint = "/uac/rest/";
const logoutEndPoint = "/logout";
const selectOrgUrl = "/rest/uac/ws/usersetting/uacuser/setChartUser/";
const tokenKey = "token";

export async function login(username, password) {
  delete axios.defaults.headers.common["x-auth-token"];
  const header = { auth: { username, password } };
  return http.post(apiEndpoint, {}, header);
}
export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwt;
  } catch (error) {
    return null;
  }
}

export function selectOrgRequest(orgCode) {
  return http.get(apiEndpoint, {
    headers: {
      requestedurl: `${selectOrgUrl}${orgCode}`,
    },
  });
}
export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}
export function logout() {
  localStorage.removeItem(tokenKey);
  return http.get(logoutEndPoint);
}
export function getJwt() {
  return localStorage.getItem(tokenKey);
}
export default {
  login,
  loginWithJwt,
  getCurrentUser,
  logout,
  getJwt,
};
