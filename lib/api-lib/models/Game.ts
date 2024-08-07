import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const gameSchema = new mongoose.Schema( {
  name : {
    type     : String,
    required : true
  },
  date : {
    type     : Date,
    required : true
  },
  nextGame : {
    type     : ObjectId,
    required : false
  },
  gameCode : {
    type     : String,
    required : true,
    enum     : ["quarter-final", 'semi-final', "final"],
  },
  type : {
    type     : String,
    required : true,
    enum     : ["women", 'man'],
  },
  participants : [
    {
      team : {
        type     : ObjectId,
        ref      : "Team",
        required : true,
      },
      isWinner : {
        type     : Boolean,
        required : true,
        default  : false
      },
    },
  ]
}, { timestamps : true } )

const Game = mongoose.models.Game || mongoose.model( 'Game', gameSchema )

export default Game