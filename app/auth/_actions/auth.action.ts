"use server";

import * as z from "zod";
import { Argon2id } from "oslo/password";
import { AuthSchema } from "../../../schemas/form";
import { db } from "../../../lib/db";
import { lucia } from "../../../lib/lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { generateCodeVerifier, generateState } from "arctic";
import { googleOAuthClient } from "@/lib/googleOauth";

export const SignUp = async (values: z.infer<typeof AuthSchema>) => {
  try {
    //if user already exists, return error
    const existingUser = await db.user.findUnique({
      where: {
        email: values.email,
      },
    });

    if (existingUser) {
      return {
        error: "User already exists 🚫",
        success: false,
      };
    }

    const hashedPassword = await new Argon2id().hash(values.password);

    const user = await db.user.create({
      data: {
        email: values.email.toLowerCase(),
        password: hashedPassword,
      },
    });
    const session = await lucia.createSession(user.id, {});
    const sessionCookie = await lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    return { success: true };
  } catch (error) {
    return { error: "Something went wrong 🚫", success: false };
  }
};

export const SignIn = async (values: z.infer<typeof AuthSchema>) => {
  try {
    const user = await db.user.findUnique({
      where: {
        email: values.email,
      },
    });

    if (!user || !user.password) {
      return {
        error: "Invaid Credentials 🚫",
        success: false,
      };
    }

    const validPassword = await new Argon2id().verify(
      user.password,
      values.password
    );

    if (!validPassword) {
      return {
        error: "Invalid Credentials 🚫",
        success: false,
      };
    }

    //SuccessFully checked credentials
    const session = await lucia.createSession(user.id, {});
    const sessionCookie = await lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    );
    return { success: true };
  } catch (error) {
    return { error: "Something went wrong 🧑‍💻", success: false };
  }
};

export const SignOut = async () => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value || null;
  if (!sessionId) return null;
  await lucia.createBlankSessionCookie();
  cookies().delete(lucia.sessionCookieName);
  return redirect("/auth/login");
};

export const getGoogleOauthConsentUrl = async () => {
  try {
    const state = generateState();
    const codeVerifier = generateCodeVerifier();

    cookies().set("codeVerifier", codeVerifier),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      };
    cookies().set("state", state),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      };

    const authUrl = await googleOAuthClient.createAuthorizationURL(
      state,
      codeVerifier,
      {
        scopes: ["profile", "email"],
      }
    );
    return { success: true, url: authUrl.toString() };
  } catch (error) {
    return { error: "Something went wrong 🚫", success: false };
  }
};
