import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const tokenSchema = new mongoose.Schema( {
  user : {
    type     : ObjectId,
    required : false,
    ref      : "User",
    index    : true
  },
  token : {
    type     : String,
    required : true
  },
  refreshToken : {
    type     : String,
    required : true
  }
}, { timestamps : true } )

const Token = mongoose.models.Token || mongoose.model( 'Token', tokenSchema )

export default Token