
import { generateToken } from '@/lib/token';
import connectDB from '../connect-db'
import User from '../models/User'
import bcrypt from 'bcrypt';
import Token from '../models/Token';

export async function create( username: string, password: string ) {
  try {
    await connectDB()

    const cryptedPasswords = await bcrypt.hash( password, 12 )
    const results = await User.create( { username, password : cryptedPasswords } )

    return {
      data : results,
    }
  } catch ( error ) {
    return { error }
  }
}

export async function signIn( username: string, password: string ) {
  try {
    await connectDB()
    const user = await User.findOne( { username } )
    const check = await bcrypt.compare( password, user.password )
    if ( check ){
      const token = generateToken( { id : user._id }, "5m" )
      const refreshToken = generateToken( { id : user._id }, "1d" )

      await Token.findOneAndDelete( { user : user._id } )

      const createToken = await Token.create( {
        user : user._id,
        token,
        refreshToken
      } )
      
      return {
        data : {
          id           : user._id,
          username     : user.username,
          token        : createToken.token,
          refreshToken : createToken.refreshToken
        },
      }
    }else{
      return false
    }

  } catch ( error ) {
    return { error }
  }
}
