import api from "../../axios";
import { baseUrl, signIn, signUp, csrf, signOut, authUser } from "../routes";

export const signInRequest = async (payload) => {
  await csrfRequest();
  const response = await api.post(signIn, payload);

  return response;
};

export const signUpRequest = async (payload) => {
  await csrfRequest();

  const response = await api.post(signUp, payload);

  return response;
};

export const getAuthenticatedUserRequest = async () => {
  await csrfRequest();

  const response = await api.get(authUser);

  return response;
};

export const signOutRequest = async () => {
  await csrfRequest();

  const response = await api.post(signOut);

  return response;
};

export const csrfRequest = async () => {
  const response = await api.get(baseUrl + csrf);

  return response;
};
