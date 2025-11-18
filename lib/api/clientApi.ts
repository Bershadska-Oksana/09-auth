"use client";

import axios from "axios";

export async function register(body: any) {
  return axios.post("/api/auth/register", body);
}

export async function login(body: any) {
  return axios.post("/api/auth/login", body);
}

export async function logout() {
  return axios.post("/api/auth/logout");
}

export async function checkSession() {
  return axios.get("/api/auth/session");
}

export async function getMe() {
  return axios.get("/api/users/me");
}

export async function getNotes(params?: any) {
  return axios.get("/api/notes", { params });
}

export async function getNoteById(id: string) {
  return axios.get(`/api/notes/${id}`);
}

export async function createNote(body: any) {
  return axios.post("/api/notes", body);
}

export async function updateNote(id: string, body: any) {
  return axios.put(`/api/notes/${id}`, body);
}

export async function deleteNote(id: string) {
  return axios.delete(`/api/notes/${id}`);
}
