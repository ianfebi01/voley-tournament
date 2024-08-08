import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { signIn } from './api-lib/controllers/user';

export const authOptions: NextAuthOptions = {
  // Secret for Next-auth, without this JWT encryption/decryption won't work
  secret : process.env.NEXTAUTH_SECRET,

  // Configure one or more authentication providers
  providers : [
    CredentialsProvider( {
      // The name to display on the sign in form (e.g. "Sign in with...")
      name        : "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials : {
        username : {},
        password : {},
      },
      async authorize( credentials ) {
        // Add logic here to look up the user from the credentials supplied

        try {
          
        } catch ( error ) {
          
        }
        const user = await signIn( String( credentials?.username ), String( credentials?.password ) )

        if ( user ) {
          // Any object returned will be saved in `user` property of the JWT
          if ( !user.data ) return null
          else
          
            return user.data
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null
          // throw new Error( "Login Failed" )
  
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    } )
  ],
  callbacks : {
    async redirect( { url, baseUrl } ) {
      // Allows relative callback URLs
      if ( url.startsWith( "/" ) ) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if ( new URL( url ).origin === baseUrl ) return url
			
      return baseUrl
    },
    async jwt( { token, account, trigger, session, user } ) {
      // Persist the OAuth access_token and or the user id to the token right after signin

      if ( account && trigger === 'signIn' ) {

        token = {
          ...user
        }
        // token.oauthAccessToken = account.access_token
        // token.accessToken = account.api_token.access_token
        // token.refreshToken = account.api_token.refresh_token
      }

      if ( trigger === 'update' ) {
        // token.oauthAccessToken = session.oauthAccessToken
        // token.accessToken = session.accessToken
        // token.refreshToken = session.refreshToken
        token ={
          ...token,
          ...session.user
        }
				
        return { ...token, ...session.user }
      }
			
      return token
    },
    async session( { session, token } ) {
      // Send properties to the client, like an access_token from a provider.

      // session.oauthAccessToken = token.oauthAccessToken as string
      // session.accessToken = token.accessToken as string
      // session.refreshToken = token.refreshToken as string
      session.user = token as any
			
      return session
    }
  },
  pages : {
    signIn  : "/sign-in",
    signOut : "/sign-out"
  }
  
};