import connectDB from "../connect-db";
import Team from "../models/Team";

export async function create( name: string ) {
  try {
    await connectDB();

    const results = await Team.create( { name } );

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

    const results = await Team.find()

    return {
      data      : results,
      itemCount : results?.length,
    };
  } catch ( error ) {
    return { error };
  }
}