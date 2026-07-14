import crypto from "crypto";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { Role } from "@prisma/client";

const JWT_SECRET = process.env.JWT_SECRET || "bput-college-buddy-default-secret-key-987654321";

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  semester: number;
  college: string;
  branch: string;
  xp: number;
  level: number;
  studyStreak: number;
}

// Secure hashing using bcryptjs
export function hashPassword(password: string): string {
  return bcrypt.hashSync(password, 10);
}

export function comparePassword(password: string, hash: string): boolean {
  return bcrypt.compareSync(password, hash);
}

// Native JWT Sign/Verify using crypto
export function signToken(payload: Record<string, any>): string {
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const payloadStr = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", JWT_SECRET)
    .update(`${header}.${payloadStr}`)
    .digest("base64url");
  return `${header}.${payloadStr}.${signature}`;
}

export function verifyToken(token: string): Record<string, any> | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const [header, payload, signature] = parts;
    const expectedSignature = crypto
      .createHmac("sha256", JWT_SECRET)
      .update(`${header}.${payload}`)
      .digest("base64url");
    if (signature !== expectedSignature) return null;
    return JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
  } catch (e) {
    return null;
  }
}

// Get Session inside Server Components, Route Handlers, or Server Actions
export async function getSession(): Promise<SessionUser | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("session")?.value;
    if (!token) return null;
    
    const decoded = verifyToken(token);
    if (!decoded || !decoded.id) return null;
    
    return {
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
      role: decoded.role as Role,
      semester: decoded.semester || 1,
      college: decoded.college || "BPUT Student",
      branch: decoded.branch || "Computer Science & Engineering",
      xp: decoded.xp || 0,
      level: decoded.level || 1,
      studyStreak: decoded.studyStreak || 1,
    };
  } catch (e) {
    return null;
  }
}

// Set session cookie
export async function setSession(user: {
  id: string;
  name: string;
  email: string;
  role: Role;
  semester: number;
  college?: string | null;
  branch?: string | null;
  xp?: number;
  level?: number;
  studyStreak?: number;
}) {
  const token = signToken({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    semester: user.semester,
    college: user.college || "",
    branch: user.branch || "",
    xp: user.xp || 0,
    level: user.level || 1,
    studyStreak: user.studyStreak || 1,
  });

  const cookieStore = await cookies();
  cookieStore.set("session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 1 week
  });
}

// Clear session cookie
export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

// Assert session requirements
export async function requireSession(allowedRoles?: Role[]): Promise<SessionUser> {
  const session = await getSession();
  if (!session) {
    throw new Error("Unauthorized: Please log in.");
  }
  if (allowedRoles && !allowedRoles.includes(session.role)) {
    throw new Error("Forbidden: You do not have permission for this action.");
  }
  return session;
}
