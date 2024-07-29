import { ICreate } from "@/types/backend/game";
import connectDB from "../connect-db";
import Game from "../models/Game";
import Team from "../models/Team";

export async function create( params: ICreate ) {
  try {
    await connectDB();

    const results = await Game.create( { ...params } );

    return {
      data : results,
    };
  } catch ( error ) {
    return { error };
  }
}

export async function getDatas( ) {
  try {
    await connectDB();
  
    const results = await Game.find().populate( { path : 'participants.team', select : 'name', model : Team } )
  
    return {
      data      : results,
      itemCount : results?.length,
    };
  } catch ( error ) {
    return { error };
  }
}

export async function getData( id: string ) {
  try {
    await connectDB()

    const results = await Game.findOne( { _id : id } )

    return {
      data : results,
    }
  } catch ( error ) {
    return { error }
  }
}

export async function edit( id: string, body: ICreate ) {
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