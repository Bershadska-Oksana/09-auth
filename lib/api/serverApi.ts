import { api } from "./api";
import { isAxiosError } from "axios";
import { User } from "@/types/user";
import { cookies, type RequestCookies } from "next/headers";

export const serverRequest = (cookieHeader?: string) =>
  api.create({
    headers: {
      Cookie: cookieHeader ?? "",
    },
  });

export const serverGetMe = async (
  cookieStore?: RequestCookies
): Promise<User | null> => {
  try {
    const cookieHeader = cookieStore
      ? cookieStore
          .getAll()
          .map((c) => `${c.name}=${c.value}`)
          .join("; ")
      : "";

    const res = await api.get("/users/me", {
      headers: {
        Cookie: cookieHeader,
      },
    });

    return res.data as User;
  } catch (err) {
    if (isAxiosError(err) && err.response?.status === 401) return null;
    console.error(
      "ServerGetMe error:",
      isAxiosError(err)
        ? (err.response?.data ?? err.message)
        : (err as Error).message
    );
    return null;
  }
};

export const serverCheckSession = async (cookieStore?: RequestCookies) => {
  try {
    const cookieHeader = cookieStore
      ? cookieStore
          .getAll()
          .map((c) => `${c.name}=${c.value}`)
          .join("; ")
      : "";

    const res = await api.get("/users/me", {
      headers: { Cookie: cookieHeader },
    });

    return res;
  } catch (err) {
    console.error("serverCheckSession error:", err);
    return null;
  }
};
