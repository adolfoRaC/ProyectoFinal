import CredentialsProvider from "next-auth/providers/credentials";

import NextAuth from "next-auth";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                user: { label: "Username", type: "text", placeholder: "jsmith" },
                pwd: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const res = await fetch(
                    `http://localhost:8080/api/usuarios/login`,
                    {
                        method: "POST",
                        body: JSON.stringify({
                            user: credentials?.user,
                            pwd: credentials?.pwd,
                        }),
                        headers: { "Content-Type": "application/json" },
                    }
                );
                const user = await res.json();
                console.log(user);
                if (user.error) {
                    throw user;
                }
                else {
                    return user;
                }
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) token.role = user.rol;
            return { ...token, ...user };
        },
        async session({ session, token }) {
            session.user = token as any;
            if (session.user) session.user.rol = token.role;
            return session;
        }
    },
    pages: {
        signIn: "/Login"
    }
})

export { handler as GET, handler as POST }