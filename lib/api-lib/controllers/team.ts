import connectDB from "../connect-db";
import Team from "../models/Team";

export async function createTeam( name: string ) {
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

export async function getTeams( ) {
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