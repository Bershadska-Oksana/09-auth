import { api } from "./api";

export const createNote = async (data: {
  title: string;
  content: string;
  tag?: string;
}) => {
  try {
    const res = await api.post("/notes", data);
    return res.data;
  } catch (error) {
    console.error("Failed to create note:", error);
    throw error;
  }
};
