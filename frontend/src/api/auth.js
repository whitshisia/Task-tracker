import API from "./client";
import API from "./client";

export async function login(username, password) {
  const res = await API.post("/login", { username, password });
  localStorage.setItem("token", res.data.access_token);
  return res.data;
}

export async function getTasks() {
  const res = await API.get("/tasks");
  return res.data;
}
