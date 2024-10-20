import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import getConfig from 'next/config';
import NextAuth from 'next-auth/next';
// import { repositoryContainer } from '@/services/configuration/inversify.conf';
// import { TYPES } from '@/services/configuration/types';
// import { AuthRepository } from '@/services/repositories/auth/auth.repository';
import {
  format, fromUnixTime
} from 'date-fns';

import jwt from 'jsonwebtoken';
import axiosInstance from 'src/config/axios/axios';
export const authOptions = {
  secret: process.env.AUTH_SECRET,
  pages: {signIn: '/auth/login'},
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        try {
          // Hacemos la solicitud a la API para autenticación
          const { data } = await axiosInstance.post('/auth/login', {
            email: credentials.email,
            password: credentials.password,
          });

          // Decodificamos el JWT para extraer la información del usuario
          const user = jwt.decode(data.data.access_token);
          console.log(user, 'sss')
          if (user) {
            // Devolver el objeto `user` si la autenticación es correcta'
            return { ...user, token: data.access_token };
          } else {
            // Si el token no contiene información del usuario, fallamos la autenticación
            return null;
          }
        } catch (error) {
          console.log('Error en la autenticación', error);
          return null; // Si hay un error en la autenticación, devolvemos null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Cuando el usuario se autentica exitosamente, incluimos el JWT en el token de sesión
      if (user) {
        token.accessToken = user.token;
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      // Pasamos el token y la información del usuario a la sesión
      session.accessToken = token.accessToken;
      session.user = token.user;
      return session;
    },
  },
  session: {
    strategy: 'jwt', // Usamos JWT para gestionar las sesiones
  },
  secret: 'secrexddxdxdxd'
  // callbacks: {
  //   async jwt(jwtData) {
  //     const {
  //       token, user, account
  //     } = jwtData;

  //     if (account && user) {
  //       const {
  //         accessToken, refreshToken, ...userData
  //       } = user;

  //       return {
  //         accessToken,
  //         refreshToken,
  //         expiresToken: token.exp,
  //         user: userData
  //       };
  //     }

  //     return token;
  //   },
  //   async session(seesionData) {
  //     const {
  //       session, token: tokenUser
  //     } = seesionData;

  //     const dateExp = tokenUser.user ? fromUnixTime(tokenUser.user.exp) : null;

  //     return {
  //       ...session,
  //       user: tokenUser.user,
  //       accessToken: tokenUser.accessToken,
  //       expires: dateExp ? format(dateExp, 'yyyy-MM-dd HH:mm:ss') : null,
  //       error: tokenUser.error
  //     };
  //   }
  // }
};

export default NextAuth(authOptions);

