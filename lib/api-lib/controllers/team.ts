import { ICreatePayload } from '@/types/api/team'
import connectDB from '../connect-db'
import Team from '../models/Team'

export async function create( name: string ) {
  try {
    await connectDB()

    const results = await Team.create( { name } )

    return {
      data : results,
    }
  } catch ( error ) {
    return { error }
  }
}

export async function getDatas() {
  try {
    await connectDB()

    const results = await Team.find()

    return {
      data      : results,
      itemCount : results?.length,
    }
  } catch ( error ) {
    return { error }
  }
}

export async function getData( id: string ) {
  try {
    await connectDB()

    const results = await Team.findOne( { _id : id } )

    return {
      data : results,
    }
  } catch ( error ) {
    return { error }
  }
}

export async function edit( id: string, body: ICreatePayload ) {
  try {
    await connectDB()

    const results = await Team.findOneAndUpdate(
      { _id : id },
      {
        ...body,
      },
      { new : true }
    )

    return {
      data : results,
    }
  } catch ( error ) {
    return { error }
  }
}

export async function deleteData( id: string ) {
  try {
    await connectDB()

    const results = await Team.findByIdAndDelete( id )

    return {
      data : results,
    }
  } catch ( error ) {
    return { error }
  }
}
