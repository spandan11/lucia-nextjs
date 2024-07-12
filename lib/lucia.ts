import { cookies } from "next/headers";
import { cache } from "react";

import { Lucia } from "lucia";
import type { Session, User } from "lucia";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";

import { db } from "./db";

// IMPORTANT!
declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
  }
}

interface Data {
  user: ExtendedUser | null;
  session: Session | null;
}

interface ExtendedUser extends User {
  id: string;
  email: string;
  picture: string | null;
}

// interface User {
//   id: string;
//   email: string;
//   picture: string | null;
// }

const adapter = new PrismaAdapter(db.session, db.user);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    name: "lucia-session",
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
    // secure:process.env.NODE_ENV==="production",
    // path:"/",
    // maxAge:60*60*24*30,
  },
});

export const getUser = cache(async (): Promise<Data | null> => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value || null;
  if (!sessionId) return null;
  const { session, user } = await lucia.validateSession(sessionId);
  // console.log("user", user);
  // console.log("session", session);
  try {
    if (session && session.fresh) {
      const sessionCookie = await lucia.createSessionCookie(session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
    if (!session) {
      const sessionCookie = await lucia.createBlankSessionCookie();
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
  } catch (error) {
    return null;
  }

  const dbUser = await db.user.findUnique({
    where: {
      id: user?.id,
    },
    select: {
      id: true,
      email: true,
      picture: true,
    },
  });
  return {
    user: dbUser,
    session,
  };
});
