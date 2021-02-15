const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        firstName: String,
        lastName: String,
        streetAddress: String,
        city: String,
        state: String,
        zipCode: Number,
        phoneNumber: String,
        age: Number,
        type: String, // TODO change to enum user-type
        sports: Array,
        teams: Array,
        statistics: Object
    },
    {collection: "Users"}
);

module.exports = mongoose.model("UserSchema", UserSchema);
