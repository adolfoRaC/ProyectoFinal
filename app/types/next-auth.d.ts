import "next-auth";
import { DefaultSession, DefaultUser } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";
declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      nombre: string;
      username: string;
      rol:string;
      token: string;
    };
  }  interface User extends DefaultUser {
    rol: string;
  }
}
declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    role: string,
  }
}