import { AuthService } from "../../../infrastructure/services/auth.service";
import NextAuth, { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

interface AuthToken {
    id?: string;
    token?: string;
}

interface AuthUser {
    email: string;
    id: string;
    token: string;
}

export interface CustomSession extends Session {
    user: {
        id?: string;
        token?: string;
        email?: string | null;
    };
}

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Correo Electrónico", type: "text" },
                password: { label: "Contraseña", type: "password" },
            },
            authorize: async (credentials) => {
                if (!credentials?.password || !credentials?.email) {
                    console.error("Credenciales inválidas");
                    return null;
                }

                const loginRequest: ILoginRequest = {
                    email: credentials.email,
                    password: credentials.password,
                }

                try {
                    const authService = new AuthService();
                    const response = await authService.login(loginRequest);

                    const idString: string = response.data.user.id.toString();

                    return {
                        email: response.data.user.email,
                        id: idString,
                        token: response.data.access_token,
                    } as AuthUser;
                } catch (error) {
                    console.log(error)
                    return Promise.reject(new Error(JSON.stringify(error)))
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
        maxAge: 10 * 60,
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                const authUser = user as AuthUser;
                token.id = authUser.id;
                token.token = authUser.token;
            }
            return token;
        },
        async session({ session, token }) {
            const customSession = session as CustomSession;
            customSession.user.id = (token as AuthToken).id;
            customSession.user.token = (token as AuthToken).token;
            return customSession;
        },
    },
    pages: {
        signIn: '/login',
    }
};

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);