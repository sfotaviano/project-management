import type { IUser } from "../interfaces/user";
import api from "./api";

type LoginResponse = {
  token: string;
  user: IUser;
};

type RegisterData = {
  name: string;
  email: string;
  password: string;
};

export async function login(username: string, password: string) {
  const response = await api.post<LoginResponse>("/login", {
    email: username,
    password,
    device_name: "web",
  });
  return response.data;
}

export async function register(data: RegisterData) {
  const response = await api.post<IUser>("/register", data);
  return response.data;
}
