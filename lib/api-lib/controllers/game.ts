import { ICreate } from "@/types/backend/game";
import connectDB from "../connect-db";
import Game from "../models/Game";

export async function create( params: ICreate ) {
  try {
    await connectDB();

    const results = await Game.create( { ...params } );

    return {
      results,
    };
  } catch ( error ) {
    return { error };
  }
}

export async function getDatas( ) {
  try {
    await connectDB();
  
    const results = await Game.find()
  
    return {
      data      : results,
      itemCount : results?.length,
    };
  } catch ( error ) {
    return { error };
  }
}