import "server-only";

import { db } from "./db";
import type { SignUpData, LoginData } from "./types";
import { users } from "./db/schema";
import { eq, exists } from "drizzle-orm";
import * as argon2 from "argon2";

async function login({ email, password }: LoginData) {
  const user = await db.query.users.findFirst({
    where: (model, { eq }) => eq(model.email, email),
  });

  if (!user) throw new Error("Email not valid");

  return { token: "1243" };
}

async function register({
  email,
  password,
  firstName,
  lastName,
  phoneNo,
}: SignUpData) {
  const query = db.select().from(users).where(eq(users.email, email));
  const emailInUse = await db.select().from(users).where(exists(query));

  if (emailInUse.length) throw new Error("Email already in use.");

  const hashedPassword = await argon2.hash(password);

  await db
    .insert(users)
    .values({ email, firstName, lastName, password: hashedPassword, phoneNo });

  return true;
}

export { login, register };
