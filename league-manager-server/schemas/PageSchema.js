const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// this will be our data base's data structure
const PageContentSchema = new Schema(
    {
        title: String,
        description: String,
        buttonText: String,
        buttonType: String,
        imageRef: Array,
        page: String,
        position: String
    },
    {collection: "PageContent"}
);

// export the new Schema so we can modify it using Node.js
module.exports = mongoose.model("PageContent", PageContentSchema);
