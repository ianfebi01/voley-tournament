import mongoose from "mongoose";

const teamSchema = new mongoose.Schema( {
  name : {
    type     : String,
    required : true
  }
}, { timestamps : true } )

const Team = mongoose.models.Team || mongoose.model( 'Team', teamSchema )

export default Team