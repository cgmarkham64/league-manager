const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeamSchema = new Schema(
    {
        name: String,
        players: [{type: Schema.Types.ObjectId, ref: "UserSchema"}],
        coach: {type: Schema.Types.ObjectId, ref: "UserSchema"},
        sport: String, //TODO change to sports enum
        statistics: Object
    },
    {collection: "Teams"}
);

module.exports = mongoose.model("TeamSchema", TeamSchema);
