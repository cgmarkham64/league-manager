const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LeagueSchema = new Schema(
    {
        name: String,
        commissioner: {type: Schema.Types.ObjectId, ref: "UserSchema"},
        sport: String,  //TODO change to sports enum
        teams: [{type: Schema.Types.ObjectId, ref: "TeamSchema"}],
    },
    {collection: "Leagues"}
);

// export the new Schema so we can modify it using Node.js
module.exports = mongoose.model("LeagueSchema", LeagueSchema);
