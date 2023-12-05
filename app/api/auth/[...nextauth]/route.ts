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
                if (user.error) {
                    throw user;
                }
                else {
                    console.log(user);
                    const token = user.token;
                    const updatedUser = {...user,token};
                    return updatedUser;
                }
            }
        })
    ],
    callbacks : {
        async jwt({token, user}){
            return {...token, ...user};
        },
        async session({session, token}){
            session.user = token as any;
            return session;
        }
    },
    pages:{
        signIn: "/Login"
    }
})

export { handler as GET, handler as POST }