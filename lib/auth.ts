import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { signIn } from './api-lib/controllers/user'

export const authOptions: NextAuthOptions = {
  // Secret for Next-auth, without this JWT encryption/decryption won't work
  secret : process.env.NEXTAUTH_SECRET,

  // Configure one or more authentication providers
  providers : [
    CredentialsProvider( {
      name        : 'Credentials',
      credentials : {
        username : {},
        password : {},
      },
      async authorize( credentials ) {
        try {
        } catch ( error ) {}
        const user = await signIn(
          String( credentials?.username ),
          String( credentials?.password )
        )

        if ( user ) {
          if ( !user.data ) return null
          else return user.data
        } else {
          return null
        }
      },
    } ),
  ],
  callbacks : {
    // async redirect( { url, baseUrl } ) {
    //   // Allows relative callback URLs
    //   if ( url.startsWith( '/' ) ) {
    //     return `${baseUrl}${url}`
    //   } else if ( new URL( url ).origin === baseUrl ) {

    //     return url
    //   }

    //   return baseUrl
    // },
    async jwt( { token, account, trigger, session, user } ) {
      if ( account && trigger === 'signIn' ) {
        token = {
          ...user,
        }
      }

      if ( trigger === 'update' ) {
        token = {
          ...token,
          ...session.user,
        }

        return { ...token, ...session.user }
      }

      return token
    },
    async session( { session, token } ) {
      session.user = token as any

      return session
    },
  },
  pages : {
    signIn  : '/sign-in',
    signOut : '/sign-out',
  },
}
